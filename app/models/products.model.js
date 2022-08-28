const sql = require("./db.js")

// constructor
const Product = function (product) {
    this.title = product.title;
    this.price = product.price;
    this.description = product.description;
    this.image = product.image;
    this.category = product.category;
    this.rate = product.rate;
    this.count = product.count
};

Product.create = (newProduct, result) => {
    sql.query("INSERT INTO products SET ?", newProduct, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created user: ", { id: res.insertId, ...newProduct });
        result(null, { id: res.insertId, ...newProduct });
    });
};

Product.findById = (id, result) => {
    sql.query(`SELECT * FROM products WHERE id = ?`,id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Found user: ", res[0]);
            result(null, res[0]);
            return;
        }
        // Could not find the product with supplied id
        result({ kind: "not_found" }, null);
    });
};

Product.getAll = (result) => {
    sql.query(`SELECT * FROM products`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Found product: ", res[0]);
            result(err, res);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};



Product.updateById = (id, product, result) => {
    sql.query(
        "UPDATE products SET title = ?, price = ?, description = ?, image = ?, category = ?, rate=?, count=? WHERE id = ?",
        [product.title, product.price, product.description, product.image, product.category, product.rate, product.count,id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // If no rows affected then there was nothing found
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated user: ", { id: id, ...product });
            result(null, { id: id, ...product });
        }
    );
};

Product.deleteById = (id, result) => {
    sql.query(`DELETE FROM products WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // cannot find any affectrows so theres no entry with these params
            result({ kind: "not_found" }, null);
            return;
        }
        console.log(`Deleted user successfully with id = ${id}`);
        result(null, null);
    }
    )
}


Product.truncateProducts = (result) => {
    sql.query(`TRUNCATE TABLE products`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // Nothing was deleted should mean there was no entries in the table to delete
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Deleted all users sucessfully ");
        result(null, null);
    }
    )
}


Product.getByCategory = (category, result) => {
    sql.query(`SELECT * FROM products WHERE category = ?`,category, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Found product: ", res[0]);
            result(err, res);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};



module.exports = Product;