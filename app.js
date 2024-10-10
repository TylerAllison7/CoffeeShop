import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDbConnection, setupDatabase } from './database.js'; // Import the setupDatabase function
const app = express();
const port = 3000;

// Define __dirname correctly
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');

setupDatabase();
// Route for the homepage
app.get('/', async (req, res) => {
    try {
        const db = await getDbConnection();
        const products = await db.all('SELECT * FROM product'); // Query all products from the database
        res.render('pages/index', { data: products, item: "Java Joe's Coffee Shoppe", title: "Welcome to Java Joe's Coffee Shoppe" });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/about', (req, res) => {
    res.render('pages/about', { title: "Gather Round with a Cup of Joe" });
});

app.get('/products', async (req, res) => {
    try {
        const db = await getDbConnection();
        const products = await db.all('SELECT * FROM product'); // Query all products from the database
        res.render('pages/products', { data: products, item: "Settle Your Cravings", title: "Our Products" });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`App listening at port ${port}`);
});