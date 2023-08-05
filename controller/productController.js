const connection = require("../helper/db");

module.exports = {
  getProductList: (req, res) => {
    connection.query("SELECT * FROM products", function (err, results) {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .send({ message: "Error While Getting Data", data: err });
      }
      return res.send({
        message: "Successfully Retrieved the Products",
        data: results,
      });
    });
  },

  addNewProducts: (req, res) => {
    console.log("Inside Add Products", req.body);
    const data = req.body;

    const insertQuery = `INSERT INTO products (product_name, stock, categories, price, regular_price, sale_price)
    VALUES (?, ?, ?, ?, ?, ?)`;

    const values = [
      data.product_name,
      data.stock,
      data.categories,
      data.price,
      data.regular_price,
      data.sale_price,
    ];

    connection.query(insertQuery, values, (err, results) => {
      if (err) {
        console.error("Error executing the INSERT query:", err);
        res
          .status(500)
          .send({ error: "Error inserting data into the database." });
      } else {
        console.log("Data inserted successfully!");
        res
          .status(200)
          .send({ message: "Data inserted successfully!", data: results });
      }
    });
  },
  editProducts: (req, res) => {
    console.log("Inside Editing", req.body);
    const data = req.body;

    const updateQuery = `UPDATE products SET product_name = ?,stock = ?,categories = ?,price = ?,regular_price = ?,sale_price = ? WHERE id = ?`;
    const values = [
      data.product_name,
      data.stock,
      data.categories,
      data.price,
      data.regular_price,
      data.sale_price,
      data.id,
    ];

    connection.query(updateQuery, values, (err, results) => {
      if (err) {
        console.error("Error executing the UPDATE query:", err);
        res.status(500).send({ error: "Error updating data in the database." });
      } else {
        console.log("Data updated successfully!");
        res
          .status(200)
          .send({ message: "Data updated successfully!", data: results });
      }
    });
  },
  deleteProducts: (req, res) => {
    console.log("Inside Delete Products", req.body);
    const productId = req.params.id;

    const deleteQuery = `DELETE FROM products WHERE id = ?`;

    connection.query(deleteQuery, [productId], (err, results) => {
      if (err) {
        console.error("Error executing the DELETE query:", err);
        res
          .status(500)
          .send({ error: "Error deleting data from the database." });
      } else {
        if (results.affectedRows === 0) {
          res.status(404).send({ message: "Product not found." });
        } else {
          console.log("Data deleted successfully!");
          res.status(200).send({ message: "Data deleted successfully!" });
        }
      }
    });
  },
};
