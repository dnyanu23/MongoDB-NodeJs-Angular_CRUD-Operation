console.log("This is product file");
const cors = require('cors'); // Add this line
const dbConnect = require('./dbscript');
const router = require('./Route/route');
const express = require('express');
const app = express();
const port = 3000;

app.use(cors()); // Add this line before your routes

dbConnect();

app.use(express.json());
app.use('/api', router);
console.log("Fetching all products from the database:");
// Endpoint to log all products to the console
// app.get('/products', async (req, res) => {

//     const Product = require('./models/product');
//     try {

//         const products = await Product.find();
//         console.log(products);
//         res.json({ message: 'Products logged to console', count: products.length });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});