const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const xmlParser = require('./utils/xmlParser');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.text({ type: 'text/xml' }));
app.use(bodyParser.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'PLM Costing API is running',
    timestamp: new Date().toISOString()
  });
});

// Main endpoint to receive XML and extract ModuleId
app.post('/api/costing/process', async (req, res) => {
  try {
    const xmlData = req.body;
    
    if (!xmlData) {
      return res.status(400).json({ 
        error: 'No XML data received',
        message: 'Request body is empty'
      });
    }

    // Parse XML and extract ModuleId
    const moduleId = await xmlParser.extractModuleId(xmlData);
    
    if (!moduleId) {
      return res.status(404).json({ 
        error: 'ModuleId not found',
        message: 'ModuleId property not found in the XML'
      });
    }

    // Return JSON response with ModuleId
    res.json({
      success: true,
      moduleId: moduleId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error processing XML:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not found',
    message: 'The requested endpoint does not exist'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 PLM Costing API Server is running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 Process endpoint: http://localhost:${PORT}/api/costing/process`);
});

module.exports = app;

