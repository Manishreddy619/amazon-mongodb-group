import express from 'express'
import createHttpError from 'http-errors'
import q2m from 'query-to-mongo'
import productModel from './schema.js'

const products=express.Router()

products.get('/',async(req,res,next)=>{
    try {
        const products=await productModel.find()
        res.send(products)
    } catch (error) {
        next(error)
    }
})
products.post('/',async(req,res,next)=>{
    try {
        const newProduct=await productModel(req.body)
        const{_id}=await newProduct.save()
        res.status(201).send({_id})
    } catch (error) {
        next(error)
    }
})

export default products