const sql = require("../models/db");
const axios = require("axios");
const products = require("../controllers/products.controller");


const dropTableThenInit = (table) => {
    sql.query(`DROP TABLE ${table};`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return
        }
        console.log(`Dropped ${table} table`);
        initTable(table) // after dropping the table it recreates the table
    }
    )
}

const initTable = (table) => {
    sql.query(`CREATE TABLE ${table} (
        id int NOT NULL AUTO_INCREMENT,
        title varchar(100) NOT NULL,
        price decimal(10,2) NOT NULL,
        description varchar(1000) NOT NULL,
        image varchar(255) NOT NULL,
        category varchar(45) NOT NULL,
        rate decimal(10,2) NOT NULL,
        count int NOT NULL,
        creationDate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updationDate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return
        }
        console.log(`Created ${table} table`);
    }
    )
}

const isTableEmpty = () => {
    sql.query(`SELECT * FROM products;`, (err, row, res) => {

        if (err) {
            return console.log('Error1');
        } else if (!row.length) {
            console.log('Table is empty returning true');
            return true;
        }

        console.log('Table is not empty returning false');
        return false;
    }
    )
}

const fetchStoreApi = async () => {
    const url = "https://fakestoreapi.com/products"
    try {
        const response = await axios.get(url);
        // console.log(response.data)
        insertFetchData(response.data); //after successful fetch insert products into database
    } catch (err) {
        console.error(err)
    }
    
}

const insertFetchData = (products) => {
    console.log("Reinitialising products table content with data from API..");
    products.map(product => 
        sql.query("INSERT INTO products SET title=?, price=?, description=?, image=?, category=?, rate=?, count=?",
        [product.title, product.price, product.description, product.image, product.category, product.rating.rate, product.rating.count], (err,res) => {
            if (err) {
                return console.log("error: ", err);
            }
            //console.log("Added object: ", { id: res.insertId, ...product });
        })
    )
    console.log("Products table ready");
}




module.exports = { dropTableThenInit, isTableEmpty, fetchStoreApi };