const sql = require("./db.js")

// constructor
const User = function (user) {
    this.username = user.username;
    this.password = user.password;
    this.admin = user.admin;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

User.findById = (id, result) => {
    sql.query(`SELECT * FROM users WHERE id = ?`,id, (err, res) => {
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

User.getAll = (result) => {
    sql.query(`SELECT * FROM users`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log(`Found ${res.length} products`);
            result(err, res);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};



User.updateById = (id, user, result) => {
    sql.query(
        "UPDATE users SET username = ?, password = ? WHERE id = ?",
        [user.username, user.password, id],
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

            console.log("updated user: ", { id: id, ...user });
            result(null, { id: id, ...user });
        }
    );
};

User.deleteById = (id, result) => {
    sql.query(`DELETE FROM users WHERE id = ${id}`, (err, res) => {
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


User.truncateUsers = (result) => {
    sql.query(`TRUNCATE TABLE users`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        // if (res.affectedRows == 0) {
        //     // Nothing was deleted should mean there was no entries in the table to delete
        //     result({ kind: "not_found" }, null);
        //     return;
        // }
        console.log("Deleted all users sucessfully ");
        result(null, null);
    }
    )
}


User.findByName = (req, result) => {
    sql.query(`SELECT * FROM users WHERE username = ?`,req.body.username, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Found users: ", res.length);
            console.log("password", res[0].password)
            if (req.body.password === res[0].password){
                result(err, {isAuthenticated: true, message: "Successfully signed in"});
            } else {
                return result({ kind: "not_found" }, {isAuthenticated: false, message: "Incorrect username and/or password"});
            }
            return;
        } 
        result({ kind: "not_found" }, null);
    });
};



module.exports = User;