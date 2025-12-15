const express = require('express');
const router = express.Router();
const xmlParser = require('../utils/xmlParser');
const plmService = require('../services/plmService');
const costingCalculationService = require('../services/costingCalculationService');
const plmPatchService = require('../services/plmPatchService');

/**
 * Main workflow processor endpoint
 * Receives XML, determines workflow type, and routes accordingly
 * POST /api/workflow/process
 */
router.post('/process', async (req, res) => {
  try {
    const xmlData = req.body;
    
    if (!xmlData) {
      return res.status(400).json({ 
        error: 'No XML data received',
        message: 'Request body is empty'
      });
    }

    console.log('\n🔄 ====== New Workflow Request ======');

    // Extract workflow data from XML
    const workflowData = await xmlParser.extractWorkflowData(xmlData);
    
    if (!workflowData.moduleId) {
      return res.status(404).json({ 
        error: 'ModuleId not found',
        message: 'ModuleId property not found in the XML'
      });
    }

    if (!workflowData.workflowDefinitionCode) {
      return res.status(404).json({ 
        error: 'WorkflowDefinitionCode not found',
        message: 'WorkflowDefinitionCode not found in the XML'
      });
    }

    console.log(`📋 ModuleId: ${workflowData.moduleId}`);
    console.log(`📋 WorkflowDefinitionCode: ${workflowData.workflowDefinitionCode}`);

    // Route based on WorkflowDefinitionCode
    switch (workflowData.workflowDefinitionCode) {
      case 'UPDATED_STYLE_OVERVIEW':
        return await handleOverviewToCosting(workflowData.moduleId, res);
      
      default:
        console.log(`⚠️  Unknown workflow type: ${workflowData.workflowDefinitionCode}`);
        return res.status(200).json({
          success: true,
          message: 'Workflow received but route not found',
          workflowType: workflowData.workflowDefinitionCode,
          moduleId: workflowData.moduleId,
          timestamp: new Date().toISOString()
        });
    }

  } catch (error) {
    console.error('❌ Error processing workflow:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

/**
 * Handle UPDATED_STYLE_OVERVIEW workflow
 * @param {string} moduleId - Style ID from XML
 * @param {Object} res - Express response object
 */
async function handleOverviewToCosting(moduleId, res) {
  try {
    console.log('\n🎯 Route: OVERVIEW_TO_COSTING');
    console.log(`📥 Fetching style data for StyleId: ${moduleId}`);

    // 1. Get style costing data from PLM
    const rawStyleData = await plmService.getStyleCosting(moduleId);
    
    if (!rawStyleData) {
      return res.status(404).json({
        error: 'Style not found',
        message: `No style data found for StyleId: ${moduleId}`
      });
    }

    console.log('✅ Style data retrieved from PLM');

    // Parse style data to camelCase format
    const styleData = plmService.parseStyleCostingData(rawStyleData);

    // 2. Process costing calculations
    console.log('🔢 Processing costing calculations...');
    const calculatedData = costingCalculationService.processStyleToSegmentPSF(styleData);
    
    console.log('✅ Costing calculations completed');

    // 3. PATCH data back to PLM
    console.log('💾 PATCH data back to PLM...');
    const patchResults = await plmPatchService.patchCostingData(calculatedData);
    
    console.log('✅ PATCH operations completed');

    // Return result
    return res.json({
      success: true,
      workflow: 'OVERVIEW_TO_COSTING',
      styleId: moduleId,
      calculatedData: calculatedData,
      patchResults: patchResults,
      message: 'Costing calculation and PATCH completed successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error in handleOverviewToCosting:', error);
    throw error;
  }
}

module.exports = router;

