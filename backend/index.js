import express from "express"
import mongoose from 'mongoose'
import cors from 'cors'
import { PORT, mongoDBURL} from "./config.js";
import commonRoute from './routes/commonRoutes.js' 

const app = express();
app.use(express.json());

app.use(cors())

// app.use(cors(
//     {
//         origin : "http://localhost:3000",
//         methods : ['GET','POST','PUT','DELETE'],
//         allowedHeaders : ['Content-Type'],
//     }
// ))


app.get('/',(req,res)=>{
    return res.status(200).send("Hello World")
})

app.use('/books',commonRoute)

mongoose.connect(mongoDBURL)
    .then(()=>{
        console.log("App Connected to database")
        app.listen(PORT,()=>{
            console.log(`Server is running at : ${PORT}`)
        })
    })
    .catch((error)=>{
        console.log("Error while connecting Data Base")
    })
