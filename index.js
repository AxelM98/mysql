import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

// By default we can't send any data to our express server.
// That why we have to write this express server middleware
app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Emil2115",
  database: "test",
});

// ALTER USER 'root'@'loclahost' IDENTIFIED WITH mysql_native_password BY 'Emil2115'

app.get("/", (req, res) => {
  res.json("HELLO FROM BACKEND");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(data);
  });
});

/* app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`,`desc`,`cover`) VALUES (?, ?, ?)";
  const values = [
    "title2",
    "desc2",
    "cover2",
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json("BOOK HAS BEEN CREATED");
  });
}); */

app.post("/books", (req, res) => {
  const q =
    "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?, ?, ?, ?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json("BOOK HAS BEEN CREATED");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, bookId, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json("BOOK HAS BEEN DELETED");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json("BOOK HAS BEEN UPDATED");
  });
});

app.listen(8888, () => {
  console.log("CONNECTED TO BACKEND");
});
