const express = require("express");
const path = require("path");
const fs = require("fs");
const { randomUUID } = require("crypto");

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// route to home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/public/index.html"));
// });

// route to notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// // get route for the get request in the getNotes() function in index.js
// app.get("/api/notes", (req, res) => {
//   console.log(`${req.method} request received`);
//   //TODO: should read the db.json file and return all saved notes as JSON
// });

// post route for the post request in the saveNote() function in index.js
app.post("/api/notes", (req, res) => {
  console.log(`${req.method} request received`);
  //TODO: should return the new note to the client ??
  noteObj = req.body;
  const { title, text } = noteObj;
  const newNote = {
    title,
    text,
    note_id: 8, // TODO: come back to this with uuid()
  };
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const noteArray = JSON.parse(data);
      noteArray.push(newNote);
      fs.writeFile("./db/db.json", JSON.stringify(noteArray), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Added new note.");
        }
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
