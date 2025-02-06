require('dotenv').config();

const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
    },
});
// Test connection
const testConnection = async () => {
    try {
        // Execute a simple query to test the connection
        await knex.raw('SELECT 1');
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};


testConnection();

module.exports = knex;
