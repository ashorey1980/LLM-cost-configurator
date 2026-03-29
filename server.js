const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the main LLM Proxies listing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'llm-proxy-list.html'));
});

// Route for LLM Proxy details page
app.get('/details', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'llm-proxy-details.html'));
});

// Route for LLM Proxy costs configuration page
app.get('/costs', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'llm-proxy-costs.html'));
});

// Route for Try Out page
app.get('/tryout', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'llm-proxy-tryout.html'));
});

// Health check endpoint for Heroku
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`LLM Proxy UI server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
