import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, './public/database/products.db');

// Function to set up the database
export const setupDatabase = async () => {
    try {
        const db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });

        await db.exec(`
            DROP TABLE IF EXISTS product
        `);


        await db.exec(`
            CREATE TABLE IF NOT EXISTS product (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                item TEXT,
                availability BOOLEAN,
                price REAL,
                imgSrc TEXT
            )
        `);

        await db.run(`
            INSERT INTO product (item, availability, price, imgSrc)
    VALUES
            ('Cappuccino', 1, 8.99, '/images/cappucino.jfif'),
            ('Espresso', 1, 7.99, '/images/espresso.jfif'),
            ('Coffee', 0, 4.99, '/images/black coffee.jfif'),
            ('Bagel', 1, 4.49, '/images/bagel.jfif'),
            ('Muffin', 1, 6.99, '/images/muffin.jfif'),
            ('Bacon Egg Cheese Sandwich', 0, 8.99, '/images/bacon egg and cheese.jfif'),
            ('Sausage Egg Cheese Biscuit', 1, 8.99, '/images/sausage mcbiscuit.jfif'),
            ('Hash Brown', 0, 1.99, '/images/Potatoes.jfif'),
            ('French Toast', 1, 7.99, '/images/French Toast.jfif');
        `);

        console.log('Database setup complete.');
    } catch (error) {
        console.error('Error setting up the database:', error);
    }
};

// Function to get a database connection
export const getDbConnection = async () => {
    try {
        return await open({
            filename: dbPath,
            driver: sqlite3.Database
        });
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};
