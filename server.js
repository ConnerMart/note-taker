const express = require("express");
const path = require("path");
const fs = require("fs");
const notesDb = require("./db/db.json");

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

rand_id = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

// route to home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// route to notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// get route for the get request in the getNotes() function in index.js
app.get("/api/notes", (req, res) => {
  res.json(notesDb);
});

// post route for the post request in the saveNote() function in index.js
app.post("/api/notes", (req, res) => {
  noteObj = req.body;
  const { title, text } = noteObj;
  const newNote = {
    title,
    text,
    id: rand_id(),
  };
  notesDb.push(newNote);
  fs.writeFile("./db/db.json", JSON.stringify(notesDb), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Added new note.");
    }
  });
});

// // delete route to remove a note
// app.delete(`/api/notes/:id`, (req, res) => {
//   fs.readFile("./db/db.json", "utf8", (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       for (let i = 0; i < notesDb.length; i++) {
//         if (notesDb[i].id === JSON.stringify(req.params.id)) {
//           notesDb.splice(i, 1);
//           fs.writeFile("./db/db.json", JSON.stringify(notesDb), (err) => {
//             if (err) {
//               console.log(err);
//             } else {
//               res.send(200);
//             }
//           });
//         }
//       }
//     }
//   });
// });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
