import express from "express" ;
import dotenv from "dotenv" ;
import { connectDB } from "./config/db.js";
// import Product from "./models/product.model.js";
// import mongoose from "mongoose";
import router from "./routes/product.route.js";
import cors from "cors"
import path from "path";


dotenv.config();
app.use(cors());
app.use(express.json());
const app = express();
const PORT = process.env.PORT || 5000

const __dirname = path.resolve();

app.use("/api/products" ,router);
// app.use(cors({
//     origin: 'http://localhost:5173', // Allow your frontend's port
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], 
//     allowedHeaders: ['Content-Type'],
// }));

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));
    app.get("*" ,(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
    })
}
// app.get("/api/products" , (req,res)=>{
//     res.send("server is ready")
// });
// console.log(process.env.MONGO_URI);

console.log("NODE_ENV:", process.env.NODE_ENV);

app.listen(PORT, ()=>{
    connectDB();
    console.log("server started at http://localhost:" +PORT);
})