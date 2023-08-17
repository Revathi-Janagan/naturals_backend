const connection = require("../helper/db");
const upload = require("../middleware/multerConfig");

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

  addNewProducts: [
    upload.single("product_image"),
    (req, res) => {
      console.log("Inside Add Products", req.body);
      const data = req.body;

      console.log("Data received from client:", data);
      if (!req.file) {
        return res.status(400).send("Please upload a valid image");
      }
      const insertQuery = `
        INSERT INTO products (product_image, product_name, stock, categories, price, regular_price, sale_price)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const relativeImagePath = req.file.path;

      const values = [
        relativeImagePath,
        data.product_name,
        data.stock,
        data.categories,
        data.price,
        data.regular_price,
        data.sale_price,
      ];
      console.log("Inside Add Products", JSON.parse(JSON.stringify(req.body))); // Log the received data
      console.log(
        "Data received from client:",
        JSON.parse(JSON.stringify(data))
      );

      connection.query(insertQuery, values, (err, results) => {
        if (err) {
          console.error("Error executing the INSERT query:", err);
          res
            .status(500)
            .send({ error: "Error inserting data into the database." });
        } else {
          console.log("Data inserted successfully!");
          const insertedId = results.insertId;
          const insertedProduct = {
            id: insertedId,
            product_image: `http://localhost:3000/${relativeImagePath.replace(/\\/g, "/")}`,

            product_name: req.body.product_name,
            stock: req.body.stock,
            categories: req.body.categories,
            price: req.body.price,
            regular_price: req.body.regular_price,
            sale_price: req.body.sale_price,
          };
          res.status(200).send({
            message: "Data inserted successfully!",
            data: insertedProduct,
          });
        }
      });
    },
  ],

  editProducts: [
    upload.single("product_image"),
    (req, res) => {
      console.log("Inside Editing", req.body);
      const data = req.body;
      const productImage = req.file ? req.file.path : data.product_image;
      const updateQuery = `UPDATE products SET product_image = ?, product_name = ?, stock = ?, categories = ?, price = ?, regular_price = ?, sale_price = ? WHERE id = ?`;
      const values = [
        productImage,
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
          res
            .status(500)
            .send({ error: "Error updating data in the database." });
        } else {
          console.log("Data updated successfully!");
          res
            .status(200)
            .send({ message: "Data updated successfully!", data: results });
        }
      });
    },
  ],

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
