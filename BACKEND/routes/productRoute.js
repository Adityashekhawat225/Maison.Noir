import express from 'express';
const router = express.Router();

import Product from '../models/productModel.js';

// All Products----------------------------------------------------------------------------------------------------------------
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default router;