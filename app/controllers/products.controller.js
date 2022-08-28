const Product = require("../models/products.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request  
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a new product 
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category,
        rate: req.body.rate,
        count: req.body.count
    });
    // Save product in the database  
    Product.create(product, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred during creation."
            });
        else res.send(data);
    });
};

// Retrieve all products from database.
exports.findAll = (req, res) => {
    Product.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "There are no entries in the Products Table."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    const id = Number(req.params.id); 
    Product.findById(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Couldn't find product with id ${req.params.id}.`
            })} else
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieval"
            })} else res.send(data);
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

    Product.updateById(
        req.params.id,
        new Product(req.body),
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

    Product.deleteById(req.params.id,
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
    Product.truncateProducts(
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
            } else res.send({ message: "successfully deleted all products" });
        }
    );
};

exports.findByCategory = (req, res) => {
    //gets all products by a condition

    Product.getByCategory(req.params.category,
        (err, data) => {
            if (err)
            res.status(500).send({
                message:
                    err.message || `There is no ${req.params.category} category.`
            });
        else res.send(data);
        }
    );
};

