import express from "express";
// import {Book} from '../models/bookModel'
import { Book } from '../models/bookModel.js'

const commonRoute = express.Router()

commonRoute.post('/',async (req,res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send("Please send all fields : title , author , publishYear")
        }

        const newBook = {
            title : req.body.title,
            author : req.body.author,
            publishYear : req.body.publishYear
        }

        const book = await Book.create(newBook)

        return res.status(201).send(book)

    }catch (error){
        console.log(error.message)
        return res.status(500).send({message:error.message})
    }
})

commonRoute.get('/',async (req,res)=>{
    try{
        const allbooks = await Book.find({}) 

        return res.status(200).json({
            count : allbooks.length,
            data : allbooks,
        })

    }catch(error){
        connsole.log(error.meassage);
        return res.status(500).send({meassage:error.message})
    }
})

commonRoute.get('/:id',async (req,res)=>{
    try{

        const {id} = req.params

        const book = await Book.findById(id) 

        return res.status(200).json(book)

    }catch(error){
        connsole.log(error.meassage);
        return res.status(500).send({meassage:error.message})
    }
})

commonRoute.put('/:id',async (req,res)=>{
    try{

        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send("Please send all fields : title , author , publishYear")
        }

        const {id} = req.params

        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).json({message : "Book not found"});
        }

        return res.status(200).json({message : "Book updated successfully"});

    }catch(error){
        connsole.log(error.meassage);
        return res.status(500).json({meassage:error.message})
    }
})

commonRoute.delete('/:id',async (req,res)=>{
    try{
        const {id} = req.params

        const result = await Book.findByIdAndDelete(id, req.body);

        if(!result){
            return res.status(404).json({message : "Book not found"});
        }

        return res.status(200).json({message : "Book deleted successfully"});

    }catch(error){
        connsole.log(error.meassage);
        return res.status(500).json({meassage:error.message})
    }
})

export default commonRoute;