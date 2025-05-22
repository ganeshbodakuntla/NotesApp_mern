import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import noteRoutes from "./Routes/noteRoutes.js";
import { connectdB } from "./config/dB.js";
import rateLimiter from "./middleWares/rateLimiter.js";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
const _dirname = path.resolve();

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173", // only allow this origin
    })
  );
}

app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", noteRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "../Frontend/dist")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(_dirname, "../Frontend", "dist", "index.html"));
  });
}
connectdB().then(() => {
  app.listen(PORT, () => {
    console.log(`server running on port:${PORT}`);
  });
});

// mongodb+srv://Ganesh:Ggane005@cluster0.bhclqsq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
