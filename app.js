const express=require("express");


const app=express();

const cookieParser = require('cookie-parser');


const cors = require('cors');
require("dotenv").config();
const bankRoutes=require("./routes/bankRoutes");

const userRoutes=require("./routes/userRoutes")
const connectDB=require("./db");
const adminRoutes = require("./routes/adminRoutes");
connectDB();
app.use(express.json());


const frontendURL =
  process.env.NODE_ENV === "production"
    ? "https://bank-management-frontend.vercel.app" 
    : "http://localhost:5173";

app.use(
    cors({
      origin: frontendURL,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );


  app.use(cookieParser());
  
  
app.options('*', cors()); 

app.use("/api", bankRoutes);
app.use("/api", userRoutes);

app.use("/api",adminRoutes);

const port=process.env.PORT || 2000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
});