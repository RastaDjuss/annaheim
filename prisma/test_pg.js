import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config(); // Load environment variables from the .env file

const { Client } = pkg;

// Create a PostgreSQL client using the database URL from .env
const client = new Client({
    connectionString: process.env.ANARCRYPT_DATABASE_URL,
});

(async () => {
    try {
        // Attempt to connect to the database
        await client.connect();
        console.log('✅ Connected to PostgreSQL database: anarcrypt');

        // Perform a test query to verify connection
        const res = await client.query('SELECT current_database();');
        console.log('ℹ️ Current Database:', res.rows[0].current_database);
    } catch (err) {
        // Handle connection errors
        console.error('❌ Database connection error:', err.message);
    } finally {
        // Always close the database connection
        await client.end();
    }
})();