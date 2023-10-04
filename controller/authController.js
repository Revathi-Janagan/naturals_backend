const connection = require("../helper/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  registerUser: (req, res) => {
    console.log("Inside Register User");
    const data = req.body;
    console.log(data);

    // Hash the password before storing it in the database
    bcrypt.hash(data.password, saltRounds, (hashErr, hash) => {
      if (hashErr) {
        console.log(hashErr);
        return res.status(500).send({
          message: "Error while hashing password",
          error: hashErr,
        });
      }

      connection.query(
        "INSERT INTO authtable (name, email, password, city, phone_number) VALUES (?, ?, ?, ?, ?)",
        [data.name, data.email, hash, data.city, data.phone_number],
        (err, results) => {
          if (err) {
            console.log(err);
            return res.status(400).send({
              message: "Error while adding user",
              error: err,
            });
          }
          return res.status(200).send({ message: "Successfully Added", data: results });
        }
      );
    });
  },

  loginUser: (req, res) => {
    const data = req.body;
    console.log(data);

    connection.query(
      "SELECT * FROM authtable WHERE email = ?",
      [data.email],
      (queryErr, queryResults) => {
        if (queryErr) {
          console.log(queryErr);
          return res.status(500).send({
            message: "Error while logging in",
            error: queryErr,
          });
        }

        if (queryResults.length === 0) {
          return res.status(400).send({
            message: "Email does not exist",
          });
        }

        const user = queryResults[0];

        // Compare the provided password with the hashed password in the database
        bcrypt.compare(data.password, user.password, (compareErr, isMatch) => {
          if (compareErr) {
            console.log(compareErr);
            return res.status(500).send({
              message: "Error while comparing passwords",
              error: compareErr,
            });
          }

          if (!isMatch) {
            return res.status(400).send({
              message: "Incorrect password",
            });
          }

          return res.status(200).send({ message: "Login Successful", user });
        });
      }
    );
  },
};
