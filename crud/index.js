const express = require("express");
const { create } = require("express-handlebars");

let fruits = [
  { name: "Apple", id: 1 },
  { name: "Banana", id: 2 },
  { name: "Orange", id: 3 },
];

const app = express();
const hbs = create({
  extname: "hbs",
  defaultLayout: "layout",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.get("/form", (req, res) => {
  res.render("index", {
    title: "hbs",
  });
});
app.get("/", (req, res) => {
  res.render("index", {
    title: "hbs",
  });
});

app.post("/fruits/create", (req, res) => {
  let newFr = {
    name: req.body.name,
    id: fruits.length,
  };

  fruits.push(newFr);

  res.render("created", {
    title: "created",
    fruits,
  });
});

// app.put("/fruits/update", async (req, res) => {
//   let idx = fruits.findIndex((fruit) => fruit.id == req.body.id);
//   console.log(idx);
//   let updateFr = {
//     name: req.body.name,
//     id: req.body.id,
//   };
//   fruits[idx] = updateFr;

//   res.render("updated", {
//     title: "updated",
//     fruits,
//   });

//   console.log(res.send("asd"));
// });

app.get("/fruits/update", (req, res) => {
  let idx = fruits.findIndex((fruit) => fruit.id === +req.query.id);
  console.log("idx ", idx);
  let updateFr = {
    name: req.query.name,
    id: req.query.id,
  };
  fruits[idx] = updateFr;
  res.render("updated", {
    title: "updated",
    fruits,
  });
});

try {
  const port = 1000;
  app.listen(port, () => {
    console.log(port);
  });
} catch (error) {
  console.log(error);
}
