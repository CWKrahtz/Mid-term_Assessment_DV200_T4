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
            year: data.year,
            image: data.image
        });

        const savedPart = await newParts.save();
        res.json(savedPart);
    } catch (error) {
        res.status(400).json({ error: "There is an error", details: error.message });
    }
});

//update
router.patch('/api/updatePart/:id', async (req, res) => {
    try {
        const data = req.body;


        const updatePart = await partsSchema.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    name: data.name,
                    make: data.make,
                    model: data.model,
                    chasisNumber: data.chasisNumber,
                    year: data.year,
                    image: data.image
                }
            },
            { new: true } // Set new: true to return the updated document
        );

        if (!updatePart) {
            return res.status(404).json({ error: "Part not found" });
        }

        res.json(updatePart);
    } catch (error) {
        res.status(400).json({ error: "There is an error", details: error.message });
    }
});

//Delete 
router.delete('/api/deletePart/:id', async (req, res) =>{
    await partsSchema.findByIdAndDelete(req.params.id)
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error))
})

//Read
router.get('/api/allParts', async (req, res) => {
    try {
        const findParts = await partsSchema.find();
        res.json(findParts);
    } catch (error) {
        res.status(500).json({ error: "There was an error", details: error.message });
    }
});

// Export the router
module.exports = router;