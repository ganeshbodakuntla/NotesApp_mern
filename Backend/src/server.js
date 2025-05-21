import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import noteRoutes from "./Routes/noteRoutes.js";
import { connectdB } from "./config/dB.js";
import rateLimiter from "./middleWares/rateLimiter.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // only allow this origin
  })
);
app.use(rateLimiter);

app.use("/api/notes", noteRoutes);
const PORT = process.env.PORTv || 3001;

connectdB().then(() => {
  app.listen(PORT, () => {
    console.log(`server running on port:${PORT}`);
  });
});

// mongodb+srv://Ganesh:Ggane005@cluster0.bhclqsq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
