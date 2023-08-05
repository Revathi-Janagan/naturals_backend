const connection = require("../helper/db");

module.exports = {
  getCustomerList: (req, res) => {
    connection.query("SELECT * FROM customer", function (err, results) {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .send({ message: "Error While Getting Data", data: err });
      }
      return res.send({
        message: "Successfully Retrieved the Customer",
        data: results,
      });
    });
  },
  addNewCustomer: (req, res) => {
    console.log("Inside Add Customer", req.body);
    const data = req.body;
    const insertQuery = `INSERT INTO customer (status, first_name, last_name, email, billing_address, payment_method, date_created) 
VALUES (?, ?, ?, ?, ?, ?, ?)`;

const values = [
  data.status,
  data.first_name,
  data.last_name,
  data.email,
  data.billing_address,
  data.payment_method,
  data.date_created,
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
  editCustomer: (req, res) => {
    console.log("Inside Edit Customer", req.params); // Log the request parameters
    const customerId = req.params.id; // Extract customerId from the URL parameters
    const data = req.body;
  
    const updateQuery = `UPDATE customer
                         SET status = ?, first_name = ?, last_name = ?, email = ?, billing_address = ?,payment_method = ?, date_created = ?
                         WHERE customer_id = ?`;
  
    const values = [
      data.status,
      data.first_name,
      data.last_name,
      data.email,
      data.billing_address,
      data.payment_method,
      data.date_created,
      customerId, // Use the extracted customerId here
    ];
  
    connection.query(updateQuery, values, (err, results) => {
      if (err) {
        console.error("Error while executing the UPDATE query:", err);
        res.status(500).send({ error: "Error while updating data in the database." });
      } else {
        if (results.affectedRows === 0) {
          res.status(404).send({ message: "Customer not found." });
        } else {
          console.log("Data updated successfully!");
          res.status(200).send({ message: "Data updated successfully!", data: results });
        }
      }
    });
  },
  

  deleteCustomer: (req, res) => {
    console.log("Inside Delete Customer", req.params); 
    const customerId = req.params.id; 
  
    const deleteQuery = `DELETE FROM customer WHERE customer_id = ?`;
  
    connection.query(deleteQuery, [customerId], (err, results) => {
      if (err) {
        console.error("Error while executing the DELETE query:", err);
        res.status(500).send({ error: "Error while deleting data from the database." });
      } else {
        if (results.affectedRows === 0) {
          res.status(404).send({ message: "Customer not found." });
        } else {
          console.log("Data deleted successfully!");
          res.status(200).send({ message: "Data deleted successfully!" });
        }
      }
    });
},
};
