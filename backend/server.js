import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bfhlRoutes from "./routes/bhfl.js"; // Ensure the path matches the location of your route file

const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(
  cors({
    origin: " https://bhfl-repo-c-v-taruns-projects.vercel.app/",
  })
);

app.use(bodyParser.json());

// Use the routes from the bfhlRoutes file
app.use("/bfhl", bfhlRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
