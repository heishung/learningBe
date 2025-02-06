const accountModel = require("../models/accountModel");

class AccountController {

    static async createAccount(req, res) {
        accountModel.createAccount(req.body)
            .then((data) => {
                if (data) {
                    res.json({message: 'create account success'})
                }
            })
            .catch(err => {
                if (err.code === 'ER_DUP_ENTRY') {
                    const match = err.sqlMessage.match(/for key '(.+?)'/);
                    if (match) {
                        const duplicateField = match[1]; // Trường bị trùng
                        const fieldName = duplicateField.split(".")[1];
                        res.status(400).json({error: `${fieldName} already exists`});
                    }
                } else {
                    res.status(500).json({error: err.sqlMessage});
                }
            })

    }

    static async login(req, res) {
        const {email, password} = req.body;
        const account = await accountModel.login(email, password);
        console.log('account', account)
        if (account) {
            res.json(account);
        } else {
            res.status(404).json({error: 'Account not found'});
        }
    }

    static async updatePassword(req, res) {
        const id = req.params.id;
        const account = req.body;
        const accountById = await accountModel.getAccountById(id);
        if (!accountById) {
            return res.status(404).json({error: 'Account not found'});
        }
        const result = await accountModel.updateAccount(id, {password: account.newPassword});
        if (result) {
            res.json({message: 'Account updated successfully'});
        } else {
            res.status(500).json({error: 'Internal server error'});
        }
    }

    static async deleteAccount(req, res) {
        const id = req.params.id;
        const result = await accountModel.deleteAccount(id);
        if (result) {
            res.json({message: 'Account deleted successfully'});
        } else {
            res.status(400).json({error: 'account not found'});
        }
    }

    static async getAccountById(req, res) {
        const id = req.params.id;
        const account = await accountModel.getAccountById(id);
        if (account) {
            res.json(account);
        } else {
            res.status(404).json({error: 'Account not found'});
        }
    }
}

module.exports = AccountController;


