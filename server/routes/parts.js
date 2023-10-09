//Imports
const express = require('express');
const partsSchema = require('../models/parts');
const router = express();


//Create
router.post('/api/part', async (req, res) => {
    try {
        const data = req.body;

        const newParts = new partsSchema({
            name: data.name,
            make: data.make,
            model: data.model,
            chasisNumber: data.chasisNumber,
            year: data.year
        });

        const savedPart = await newParts.save();
        res.json(savedPart);
    } catch (error) {
        res.status(400).json({ error: "There is an error", details: error.message });
    }
});

// Export the router
module.exports = router;