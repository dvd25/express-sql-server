module.exports = app => {
    const products = require("../controllers/products.controller");
  
    var router = require("express").Router();
  
    // Create a new product
    router.post("/", products.create);
  
    // Retrieve all products
    router.get("/", products.findAll);

    // Retrieve a single product with id
    router.get("/:id", products.findOne);

    router.get("/category/:category", products.findByCategory);
  
    // Update a product with id
    router.put("/:id", products.update);
  
    // Delete a product with id
    router.delete("/:id", products.delete);
  
    // Truncates all products 
    router.delete("/", products.deleteAll);

    app.use('/api/products', router);
  };
  