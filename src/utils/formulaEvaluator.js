/**
 * Formula Evaluator for PLM Cost Element Calculations
 * Evaluates formulas like: [KPRC]*[KKUR]*[KSARF]
 */

/**
 * Evaluate a formula using cost element values
 * @param {string} formula - Formula string (e.g., "[KPRC]*[KKUR]*[KSARF]")
 * @param {Map<string, number>} valueMap - Map of code -> value
 * @returns {number} Calculated result
 */
function evaluateFormula(formula, valueMap) {
  if (!formula) {
    return 0;
  }

  try {
    // Replace [CODE] with actual values
    let expression = formula;
    
    // Find all [CODE] patterns
    const codePattern = /\[([A-Z0-9]+)\]/g;
    const matches = [...formula.matchAll(codePattern)];
    
    // Replace each [CODE] with its value
    for (const match of matches) {
      const code = match[1];
      const value = valueMap.get(code) || 0;
      
      // Replace [CODE] with the numeric value
      expression = expression.replace(`[${code}]`, value);
    }
    
    // Evaluate the mathematical expression
    // Using Function constructor for safety (better than eval)
    const result = Function(`"use strict"; return (${expression})`)();
    
    // Handle NaN, Infinity, etc.
    if (!isFinite(result) || isNaN(result)) {
      return 0;
    }
    
    return result;
    
  } catch (error) {
    console.error(`❌ Error evaluating formula: ${formula}`, error.message);
    return 0;
  }
}

/**
 * Build a value map from cost elements
 * @param {Array} costElements - Array of cost elements with code and value
 * @returns {Map<string, number>} Map of code -> value
 */
function buildValueMap(costElements) {
  const valueMap = new Map();
  
  for (const element of costElements) {
    // For calculated elements, use 0 initially (will be calculated)
    // For input elements, use their actual value
    const value = element.type === 3 ? 0 : (element.value || 0);
    valueMap.set(element.code, value);
  }
  
  return valueMap;
}

/**
 * Calculate all Type=3 (calculated) cost elements
 * Uses topological sort to handle dependencies
 * @param {Array} costElements - Array of all cost elements
 * @param {Map<string, number>} overrideValues - Optional map of code -> value to override element.value
 * @returns {Map<string, number>} Map of calculated values (code -> value)
 */
function calculateAllFormulas(costElements, overrideValues = null) {
  const valueMap = buildValueMap(costElements);
  
  // Apply override values if provided
  if (overrideValues) {
    for (const [code, value] of overrideValues.entries()) {
      valueMap.set(code, value);
    }
  }
  const calculatedElements = costElements.filter(e => e.type === 3 && e.formula);
  
  // Keep track of which elements have been calculated
  const calculated = new Set();
  let maxIterations = 100; // Prevent infinite loops
  let iteration = 0;
  
  // Iterate until all calculated elements are done
  while (calculated.size < calculatedElements.length && iteration < maxIterations) {
    let progressMade = false;
    
    for (const element of calculatedElements) {
      if (calculated.has(element.code)) {
        continue; // Already calculated
      }
      
      // Check if all dependencies are available
      const dependencies = extractDependencies(element.formula);
      const allDepsAvailable = dependencies.every(dep => {
        const depElement = costElements.find(e => e.code === dep);
        // Dependency is available if it's Type=1 or already calculated
        return !depElement || depElement.type !== 3 || calculated.has(dep);
      });
      
      if (allDepsAvailable) {
        // Calculate this element
        const value = evaluateFormula(element.formula, valueMap);
        valueMap.set(element.code, value);
        calculated.add(element.code);
        progressMade = true;
        
        console.log(`   ✅ Calculated ${element.code}: ${value.toFixed(2)} (${element.name})`);
      }
    }
    
    if (!progressMade) {
      // No progress made, might have circular dependencies
      console.warn(`⚠️  Could not calculate all formulas. Calculated ${calculated.size}/${calculatedElements.length}`);
      break;
    }
    
    iteration++;
  }
  
  return valueMap;
}

/**
 * Extract dependency codes from a formula
 * @param {string} formula - Formula string
 * @returns {Array<string>} Array of dependency codes
 */
function extractDependencies(formula) {
  if (!formula) return [];
  
  const codePattern = /\[([A-Z0-9]+)\]/g;
  const matches = [...formula.matchAll(codePattern)];
  return matches.map(m => m[1]);
}

module.exports = {
  evaluateFormula,
  buildValueMap,
  calculateAllFormulas,
  extractDependencies
};

