module.exports = app => {
    const users = require("../controllers/users.controller");
  
    var router = require("express").Router();
  
    // Create a new product
    router.post("/", users.create);


    //user login
    router.post("/login", users.login);
  
    // Retrieve all products
    router.get("/", users.findAll);

    // Retrieve a single product with id
    router.get("/:id", users.findOne);

    // router.get("/category/:category", products.findByCategory);
  
    // Update a product with id
    router.put("/:id", users.update);
  
    // Delete a product with id
    router.delete("/:id", users.delete);
  
    // Delete all products
    router.delete("/", users.deleteAll);

    app.use('/api/users', router);
  };
  