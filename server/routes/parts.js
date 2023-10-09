//Imports
const express = require('express');
const partsSchema = require('../models/parts');
const router = express();

//Create
// router.post('/api/newProduct', (req, res) => {
//     const newParts = new partsSchema({
//         productName: req.body.productName,
//         productPrice: req.body.productPrice,
//         description: req.body.description,
//         disclaimer: req.body.disclaimer,
//         size: req.body.size,
//         quantity: req.body.quantity,
//     })

//     newParts.save()
//     .then(item => {
//         res.json(item);
//     })
//     .catch(err => {
//         res.status(400).json({msg: "There is an error", err});
//     })
// });

// Create new Question
router.post('/api/newQuestion', async (req, res) => {
    try {
        const data = req.body;

        const newParts = new partsSchema({
            name: data.name,
            make: data.title,
            model: data.question,
            chasisNumber: data.question,
            year: data.question
        });

        const savedPart = await newParts.save();
        res.json(savedPart);
    } catch (error) {
        res.status(400).json({ error: "There is an error", details: error.message });
    }
});
