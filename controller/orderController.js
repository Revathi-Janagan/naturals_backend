const connection = require("../helper/db");

module.exports = {
  getOrderList: (req, res) => {
    connection.query("SELECT * FROM orderproduct", function (err, results) {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .send({ message: "Error While Getting Data", data: err });
      }
      return res.send({
        message: "Successfully Retrieved the Order",
        data: results,
      });
    });
  },
  addNewOrder: (req, res) => {
    console.log("Inside Add Order", req.body);
    const data = req.body;
    const insertQuery = `INSERT INTO orderproduct (status, order_number, customer_name, billing_address, date_created, payment_method, total) 
VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      data.status,
      data.order_number,
      data.customer_name,
      data.billing_address,
      data.date_created,
      data.payment_method,
      data.total,
    ];
    connection.query(insertQuery, values, (err, results) => {
      if (err) {
        console.error("Error while executing the INSERT query:", err);
        res
          .status(500)
          .send({ error: "Error while inserting data into the database." });
      } else {
        console.log("Data inserted successfully!");
        res
          .status(200)
          .send({ message: "Data inserted successfully!", data: results });
      }
    });
  },
  editOrder: (req, res) => {
    console.log("Inside Edit Order", req.params); 
    const orderId = req.params.id; 
    const data = req.body;

    const updateQuery = `UPDATE orderproduct
                         SET status = ?, order_number = ?, customer_name = ?, billing_address = ?, date_created = ?, payment_method = ?, total = ?
                         WHERE order_id = ?`;

    const values = [
      data.status,
      data.order_number,
      data.customer_name,
      data.billing_address,
      data.date_created,
      data.payment_method,
      data.total,
      orderId, // Use the extracted orderId here
    ];

    connection.query(updateQuery, values, (err, results) => {
      if (err) {
        console.error("Error while executing the UPDATE query:", err);
        res.status(500).send({ error: "Error while updating data in the database." });
      } else {
        if (results.affectedRows === 0) {
          res.status(404).send({ message: "Order not found." });
        } else {
          console.log("Data updated successfully!");
          res.status(200).send({ message: "Data updated successfully!", data: results });
        }
      }
    });
  },

  deleteOrder: (req, res) => {
    console.log("Inside Delete Order", req.params); // Log the request parameters
    const orderId = req.params.id; // Extract orderId from the URL parameters

    const deleteQuery = `DELETE FROM orderproduct WHERE order_id = ?`;

    connection.query(deleteQuery, [orderId], (err, results) => {
      if (err) {
        console.error("Error while executing the DELETE query:", err);
        res
          .status(500)
          .send({ error: "Error while deleting data from the database." });
      } else {
        if (results.affectedRows === 0) {
          res.status(404).send({ message: "Order not found." });
        } else {
          console.log("Data deleted successfully!");
          res.status(200).send({ message: "Data deleted successfully!" });
        }
      }
    });
  },
};
