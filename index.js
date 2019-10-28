// implement your API here
const express = require("express");

const db = require("./data/db.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello World");
});

server.get("/api/users", (req, res) => {
  db.find()
    .then(db => {
      res.status(200).json(db);
    })
    .catch(error => {
      res.status(500).json({ message: "unable to get users" });
    });
});

server.get("/api/users/:id", (req, res) => {
  let id = req.params.id;
  db.findById(id)
    .then(db => {
      res.status(200).json(db);
    })
    .catch(error => {
      res.status(500).json({ message: "unable to get user with that ID" });
    });
});

server.post("/api/users", (req, res) => {
  if (req.body.bio != null && req.body.name != null) {
    db.insert(req.body)
      .then(db => {
        res.status(201).json(db);
      })
      .catch(error => {
        res.status(500).json({ message: "unable to add user" });
      });
  } else {
    res.status(400).json({ message: "user needs a name and bio" });
  }
});

server.delete("/api/users/:id", (req, res) => {
  let id = req.params.id;
  db.remove(id)
    .then(db => {
      res.status(200).json(db);
    })
    .catch(error => {
      res.status(500).json({ message: "unable to delete user" });
      res.status(404).json({ message: "User with given ID not found" });
    });
});

server.put("/api/users/:id", (req, res) => {
  let id = req.params.id;
  if (req.body.bio != null && req.body.name != null) {
    db.update(id, req.body)
      .then(db => {
        res.status(201).json(db);
      })
      .catch(error => {
        res.status(500).json({ message: "unable to edit" });
        res.status(404).json({ message: "User with given ID not found" });
      });
  } else {
    res.status(400).json({ message: "user needs a name and bio" });
  }
});

server.listen(8000, () => console.log("API running on port 8000"));
