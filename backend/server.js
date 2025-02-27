import express from "express";
import dotenv from "dotenv";
import path from "path"
import { dbConnection } from "./dbConfig/dbConnection.js";
import adminRoute from "./routes/admin.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

const __dirname = path.resolve();

app.use(express.json());
app.use("/api", adminRoute);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*",(req, res) =>{
      res.sendFile
      (path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
    
  }

app.listen(PORT, () => {
  dbConnection();
  console.log("Server running on port: " + PORT);
});
