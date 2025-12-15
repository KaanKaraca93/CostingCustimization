const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const tokenRoutes = require('./routes/token.routes');
const costingRoutes = require('./routes/costing.routes');
const workflowRoutes = require('./routes/workflow.routes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.text({ type: ['text/xml', 'application/xml'] }));
app.use(bodyParser.json());

// Routes
app.use('/api', tokenRoutes);
app.use('/api/costing', costingRoutes);
app.use('/api/workflow', workflowRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'PLM Costing API is running',
    timestamp: new Date().toISOString()
  });
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

