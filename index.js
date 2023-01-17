const express = require("express");
const format = require("date-format");
const app = express();

// swagger docs related
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.status(200).send("<h1>Hello from LCO</h1>");
});

app.get("/api/v1/instagram", (req, res) => {
  const instaSocial = {
    username: "thelonedruid56",
    folowers: 66,
    follows: 70,
    date: format.asString("dd[MM] - hh:mm:ss", new Date())
  };

  res.status(200).json(instaSocial);
});

app.get("/api/v1/facebook", (req, res) => {
  const instaSocial = {
    username: "thelonedruid56",
    folowers: 88,
    follows: 10,
    date: format.asString("dd[MM] - hh:mm:ss", new Date())
  };

  res.status(200).json(instaSocial);
});

app.get("/api/v1/linkedin", (req, res) => {
  const instaSocial = {
    username: "thelonedruid56",
    folowers: 800,
    follows: 80,
    date: new Date()
  };

  res.status(200).json(instaSocial);
});

app.get("/api/v1/:token", (req, res) => {
  console.log(req.params.token);
  res.status(200).json({ param: req.params.token });
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
