const User = require("../models/users.model.js");
const bcrypt = require('bcrypt')

// Create and Save a new user
exports.create = async (req, res) => {
    // Validate request  
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    try {
        // const salt = await bcrypt.genSalt()
        // const hashedPassword = await bcrypt.hash(req.body.password, salt)
        // console.log(salt)
        // console.log(hashedPassword)
        // Create a new product 
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            admin: req.body.admin ? req.body.admin : 0
        });

        // Save product in the database  
        User.create(user, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred during creation."
                });
            else res.send(data);
        });



    } catch (error) { res.status(500).send("Error") }


};

// Retrieve all users from database.
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "There are no entries in the Users Table."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    const id = Number(req.params.id);
    User.findById(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Couldn't find product with id ${req.params.id}.`
                })
            } else
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieval"
                })
        } else res.send(data);
    });
}

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    User.updateById(
        req.params.id,
        new User(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Couldn't find user with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating user with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    //deletes one by one

    User.deleteById(req.params.id,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Could not find user with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Could not find user with id " + req.params.id
                    });
                }
            } else res.send({ message: "successfully deleted" });
        }
    );
};

exports.deleteAll = (req, res) => {
    //truncate tables it also reinitializes the auto increment primary key back to one
    User.truncateUsers(
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Nothing to delete.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error deleting all"
                    });
                }
            } else res.send({ message: "successfully deleted all users" });
        }
    );
};



exports.login = (req, res) => {
    //gets all users by a condition

    User.findByName(req,
        (err, data) => {
            if (err) {

                if (err.kind === "not_found") {
                    res.status(404).send({
                        isAuthenticated: false, message: `Username not found.`
                    });
                } else {
                    res.status(500).send({
                        isAuthenticated: false,
                        message:
                            err.message || `There is no user with the name ${req.body.username}.`, err
                    })
                }

            } else res.send(data);
        }
    );
};



