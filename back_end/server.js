import express from "express";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import dotenv from "dotenv"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";


dotenv.config();

connectDB();  

const app = express();

app.use(express.json());


app.get("/", (req,res)=>{
    res.send("Api is started")
})

app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)

app.use(notFound)

app.use(errorHandler)


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started in ${process.env.NODE_ENV} at port ${PORT}`))