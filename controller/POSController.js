const connection = require("../helper/db");

module.exports = {
  getPOS: (req, res) => {
    connection.query("SELECT * FROM POS", function (err, results) {
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
  addNewPOS: (req, res) => {
    console.log("Inside Add POS ", req.body);
    const data = req.body;
    const insertQuery = `INSERT INTO POS (pos_product, pos_price) 
                         VALUES (?, ?)`;
    const values = [
      data.pos_product,
      data.pos_price,
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
  
  editPOS: (req, res) => {
    console.log("Inside Edit POS", req.params); // Log the request parameters
    const POSId = req.params.id; // Extract customerId from the URL parameters
    const data = req.body;
  
    const updateQuery = `UPDATE POS
                         SET pos_product = ?, pos_price = ?
                         WHERE pos_id = ?`;
  
    const values = [
      data.pos_product,
      data.pos_price,
     
      POSId, // Use the extracted customerId here
    ];
  
    connection.query(updateQuery, values, (err, results) => {
      if (err) {
        console.error("Error while executing the UPDATE query:", err);
        res.status(500).send({ error: "Error while updating data in the database." });
      } else {
        if (results.affectedRows === 0) {
          res.status(404).send({ message: "POS Details not found." });
        } else {
          console.log("Data updated successfully!");
          res.status(200).send({ message: "Data updated successfully!", data: results });
        }
      }
    });
  },
  

  deletePOS: (req, res) => {
    console.log("Inside Delete POS", req.params); // Log the request parameters
    const POSId = req.params.id; 
  
    const deleteQuery = `DELETE FROM POS WHERE pos_id = ?`;
  
    connection.query(deleteQuery, [POSId], (err, results) => {
      if (err) {
        console.error("Error while executing the DELETE query:", err);
        res.status(500).send({ error: "Error while deleting data from the database." });
      } else {
        if (results.affectedRows === 0) {
          res.status(404).send({ message: "POS Details not found." });
        } else {
          console.log("Data deleted successfully!");
          res.status(200).send({ message: "Data deleted successfully!" });
        }
      }
    });
},
};
