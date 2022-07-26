const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "session001",
    secret: "COOKIE_SECRET",
    httpOnly: true,
    sameSite: "strict",
  })
);


const db = require("./src/models");

db.sequelize.sync();

// OPEN API documentation
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
      title: "Sample Staff Scheduling",
      version: "1.0.0",
      description: "REST API documentation.",
  },
  servers: [
      {
          url: "http://localhost:8080",
          description: "Local server",
      },
  ],
}
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./src/routes/*.js"],
}
const swaggerSpec = swaggerJSDoc(options)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Swagger ends here

app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

require("./src/routes/auth.routes")(app);
require("./src/routes/user.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

