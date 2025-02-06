const knex = require("../config/db");

class AccountModel {
    static async findAccountByEmail(email) {
        console.log('email', email)
        try {
            const [rows] = await knex('users').where('email', email);
            return rows[0];
        } catch (error) {
            return error;
        }
    }

    static async login(email, password) {
        try {
            const rows = await knex('users').where('email', email).andWhere('password', password);
            return rows[0];
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    static async createAccount(account) {
        try {
            const [rows] = await knex('users').insert(account);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async updateAccount(id, account) {
        try {
            return await knex('users').where('id', id).update(account); // This will return the number of rows affected
        } catch (error) {
            throw error;
        }
    }

    static async getAccountById(id) {
        try {
            const [rows] = await knex('users').where('id', id);
            return rows;
        } catch (error) {
            throw error;
        }
    }

   static async deleteAccount(id) {
        try {
            const rows = await knex('users').where('id', id).del();
            console.log('rows', rows)
            return rows;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}

module.exports = AccountModel;
