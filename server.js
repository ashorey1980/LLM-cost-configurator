const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

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

// Route for Pricing Admin page
app.get('/pricing-admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pricing-admin.html'));
});

// Health check endpoint for Heroku
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// API endpoint to get all pricing data
app.get('/api/pricing', (req, res) => {
    const pricingFilePath = path.join(__dirname, 'pricing-data.json');

    fs.readFile(pricingFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading pricing data:', err);
            return res.status(500).json({ error: 'Failed to load pricing data' });
        }

        try {
            const pricingData = JSON.parse(data);
            res.json(pricingData);
        } catch (parseErr) {
            console.error('Error parsing pricing data:', parseErr);
            res.status(500).json({ error: 'Invalid pricing data format' });
        }
    });
});

// API endpoint to get pricing for a specific model
app.get('/api/pricing/:provider/:model', (req, res) => {
    const { provider, model } = req.params;
    const pricingFilePath = path.join(__dirname, 'pricing-data.json');

    fs.readFile(pricingFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading pricing data:', err);
            return res.status(500).json({ error: 'Failed to load pricing data' });
        }

        try {
            const pricingData = JSON.parse(data);

            if (pricingData.models[provider] && pricingData.models[provider][model]) {
                res.json({
                    provider,
                    model,
                    pricing: pricingData.models[provider][model]
                });
            } else {
                res.status(404).json({
                    error: 'Pricing not found',
                    message: `No pricing data available for ${model} from ${provider}`
                });
            }
        } catch (parseErr) {
            console.error('Error parsing pricing data:', parseErr);
            res.status(500).json({ error: 'Invalid pricing data format' });
        }
    });
});

// API endpoint to update pricing data (for admin use)
app.put('/api/pricing', (req, res) => {
    const pricingFilePath = path.join(__dirname, 'pricing-data.json');
    const newPricingData = req.body;

    // Add lastUpdated timestamp
    newPricingData.lastUpdated = new Date().toISOString();

    fs.writeFile(pricingFilePath, JSON.stringify(newPricingData, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Error writing pricing data:', err);
            return res.status(500).json({ error: 'Failed to save pricing data' });
        }

        res.json({
            success: true,
            message: 'Pricing data updated successfully',
            lastUpdated: newPricingData.lastUpdated
        });
    });
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
