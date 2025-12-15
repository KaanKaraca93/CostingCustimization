const xml2js = require('xml2js');

/**
 * Extract ModuleId from ProcessWorkflow XML
 * @param {string} xmlString - XML string to parse
 * @returns {Promise<string|null>} - ModuleId or null if not found
 */
async function extractModuleId(xmlString) {
  try {
    const parser = new xml2js.Parser({
      explicitArray: false,
      ignoreAttrs: false,
      mergeAttrs: false
    });

    const result = await parser.parseStringPromise(xmlString);
    
    // Navigate through the XML structure
    // ProcessWorkflow -> DataArea -> Workflow -> Property[]
    const workflow = result?.ProcessWorkflow?.DataArea?.Workflow;
    
    if (!workflow || !workflow.Property) {
      return null;
    }

    // Property can be an array or a single object
    const properties = Array.isArray(workflow.Property) 
      ? workflow.Property 
      : [workflow.Property];

    // Find the Property with NameValue.$.name === 'ModuleId'
    for (const property of properties) {
      const nameValue = property.NameValue;
      
      if (nameValue && nameValue.$ && nameValue.$.name === 'ModuleId') {
        // Return the text content of NameValue
        return nameValue._ || null;
      }
    }

    return null;

  } catch (error) {
    console.error('Error parsing XML:', error);
    throw new Error(`XML parsing failed: ${error.message}`);
  }
}

/**
 * Extract WorkflowDefinitionCode from ProcessWorkflow XML
 * @param {string} xmlString - XML string to parse
 * @returns {Promise<string|null>} - WorkflowDefinitionCode or null if not found
 */
async function extractWorkflowDefinitionCode(xmlString) {
  try {
    const parser = new xml2js.Parser({
      explicitArray: false,
      ignoreAttrs: false,
      mergeAttrs: false
    });

    const result = await parser.parseStringPromise(xmlString);
    const workflow = result?.ProcessWorkflow?.DataArea?.Workflow;
    
    if (!workflow) {
      return null;
    }

    return workflow.WorkflowDefinitionCode || null;

  } catch (error) {
    console.error('Error parsing WorkflowDefinitionCode:', error);
    throw new Error(`XML parsing failed: ${error.message}`);
  }
}

/**
 * Extract complete workflow data from XML
 * @param {string} xmlString - XML string to parse
 * @returns {Promise<Object>} - Workflow data object
 */
async function extractWorkflowData(xmlString) {
  try {
    const [moduleId, workflowCode] = await Promise.all([
      extractModuleId(xmlString),
      extractWorkflowDefinitionCode(xmlString)
    ]);

    return {
      moduleId,
      workflowDefinitionCode: workflowCode
    };

  } catch (error) {
    console.error('Error extracting workflow data:', error);
    throw new Error(`Workflow data extraction failed: ${error.message}`);
  }
}

/**
 * Extract multiple properties from XML
 * @param {string} xmlString - XML string to parse
 * @param {string[]} propertyNames - Array of property names to extract
 * @returns {Promise<Object>} - Object with property names as keys
 */
async function extractProperties(xmlString, propertyNames) {
  try {
    const parser = new xml2js.Parser({
      explicitArray: false,
      ignoreAttrs: false,
      mergeAttrs: false
    });

    const result = await parser.parseStringPromise(xmlString);
    const workflow = result?.ProcessWorkflow?.DataArea?.Workflow;
    
    if (!workflow || !workflow.Property) {
      return {};
    }

    const properties = Array.isArray(workflow.Property) 
      ? workflow.Property 
      : [workflow.Property];

    const extractedData = {};

    for (const property of properties) {
      const nameValue = property.NameValue;
      
      if (nameValue && nameValue.$ && propertyNames.includes(nameValue.$.name)) {
        extractedData[nameValue.$.name] = nameValue._ || null;
      }
    }

    return extractedData;

  } catch (error) {
    console.error('Error parsing XML:', error);
    throw new Error(`XML parsing failed: ${error.message}`);
  }
}

module.exports = {
  extractModuleId,
  extractWorkflowDefinitionCode,
  extractWorkflowData,
  extractProperties
};

