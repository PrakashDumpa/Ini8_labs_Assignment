import express from "express";
import SqliteDb from "./SqliteDb.js";
import cors from "cors";
const app = express();

const initializeServer = async () => {
  try {
    app.listen(4000, () => {
      console.log("Server Running at http://localhost:4000/");
    });
  } catch (e) {
    console.log(`SqliteDb Error: ${e.message}`);
    process.exit(1);
  }
};

initializeServer();

app.use(express.json());
app.use(cors());

// Insert Users API
app.post("/addUser", async (req, res) => {
  const { name, email, date_of_birth } = req.body || {};

  // Insert new user into the database
  let createUserQuery = `INSERT INTO Registration (name,email,date_of_birth) VALUES (?,?,?)`;
  SqliteDb.run(createUserQuery, [name, email, date_of_birth], function (err) {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    // console.log("Successfully inserted", this.lastID);
    res.status(200).send({ creationId: this.lastID });
  });
});
// Get Users API
app.get("/getUsers", (req, res) => {
  SqliteDb.all("SELECT * FROM Registration", (err, rows) => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    // console.log("Successfully retrieved", rows);
    res.status(200).send(rows);
  });
});

// update user Api
app.put("/updateUser/:id", (req, res) => {
  // console.log("request body", req.body);
  const { name, email, date_of_birth } = req.body || {};
  // console.log(req.params.id);
  const id = req.params.id;
  let updateUserQuery = `UPDATE Registration SET name=? ,email=?,date_of_birth=? WHERE id=?`;
  SqliteDb.run(updateUserQuery, [name, email, date_of_birth, id], (err) => {
    if (err) {
      // console.error(err.message);
      return res.status(500).send({ error: "Failed to Update user" });
    }
    res
      .status(200)
      .send({ message: `User with id ${id} updated successfully` });
  });
});

// Delete User Api
app.delete("/deleteUser/:id", async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  SqliteDb.run(`DELETE FROM Registration WHERE id=?`, id, (err) => {
    if (err) {
      return res.status(500).send({ error: "Failed to delete user" });
    }
    res
      .status(200)
      .send({ message: `User with id ${id} deleted successfully` });
  });
});
