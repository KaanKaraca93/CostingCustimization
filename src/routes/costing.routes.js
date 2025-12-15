const express = require('express');
const router = express.Router();
const plmService = require('../services/plmService');

/**
 * Get style costing by StyleId
 * GET /api/costing/style/:styleId
 */
router.get('/style/:styleId', async (req, res) => {
  try {
    const { styleId } = req.params;
    
    console.log(`\n📊 Getting style costing for StyleId: ${styleId}`);
    
    const costingData = await plmService.getAndParseStyleCosting(styleId);
    
    if (!costingData) {
      return res.status(404).json({
        error: 'Style not found',
        message: `No style data found for StyleId: ${styleId}`
      });
    }
    
    res.json({
      success: true,
      styleId: styleId,
      data: costingData,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error in style costing endpoint:', error);
    res.status(500).json({
      error: 'Failed to fetch style costing',
      message: error.message
    });
  }
});

/**
 * Get raw style costing data (unparsed)
 * GET /api/costing/style/:styleId/raw
 */
router.get('/style/:styleId/raw', async (req, res) => {
  try {
    const { styleId } = req.params;
    
    console.log(`\n📊 Getting raw style costing for StyleId: ${styleId}`);
    
    const rawData = await plmService.getStyleCosting(styleId);
    
    if (!rawData) {
      return res.status(404).json({
        error: 'Style not found',
        message: `No style data found for StyleId: ${styleId}`
      });
    }
    
    res.json({
      success: true,
      styleId: styleId,
      data: rawData,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error in raw style costing endpoint:', error);
    res.status(500).json({
      error: 'Failed to fetch raw style costing',
      message: error.message
    });
  }
});

module.exports = router;

