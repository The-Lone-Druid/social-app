const express = require("express");
const format = require("date-format");
const fileUpload = require("express-fileupload");
require("dotenv").config();
// swagger docs related
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const app = express();
const swaggerDocument = YAML.load("./swagger.yaml");
const PORT = process.env.PORT || 4000;
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(fileUpload());

let courses = [
  {
    id: "11",
    name: "Learn Reactjs",
    price: 299
  },
  {
    id: "12",
    name: "Learn Angular",
    price: 499
  },
  {
    id: "13",
    name: "Learn Django",
    price: 999
  }
];

app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to Social App</h1><h4>Visit API Docs on /api-docs</h4>"
  );
});

app.get("/api/v1/lco", (req, res) => {
  res.send("Hello from LCO");
});

app.get("/api/v1/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/v1/courses/:courseId", (req, res) => {
  const myCourse = courses.find((course) => course.id === req.params.courseId);
  res.json(myCourse);
});

app.post("/api/v1/add-course", (req, res) => {
  const id = (parseInt(courses.reverse()[0].id) + 1).toString();
  courses.push({ id, ...req.body });
  res.json({ id, ...req.body });
});

app.get("/api/v1/coursequery", (req, res) => {
  const location = req.query.location;
  const device = req.query.device;

  res.send({
    location,
    device
  });
});

app.post("/api/v1/course-upload", (req, res) => {
  const file = req.files.file;
  let path = __dirname + "/assets/images/" + Date.now() + ".jpg";
  console.log(req.headers);
  file.mv(path, (err) => {
    res.send(true);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  console.log(process.env.PORT);
});
