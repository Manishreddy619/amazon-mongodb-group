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
products.get('/:productId',async(req,res,next)=>{
    try {
        const productId=req.params.productId
        const product=await productModel.findById(productId)
        if(product){
            res.send(product)
        }else{
            next(createHttpError(404,`PRODUCT ID${productId} NOT FOUND`))
        }
    } catch (error) {
        next(error)
    }
})
products.put('/:productId',async(req,res,next)=>{
    try {
        const productId=req.params.productId
        const modifiedProduct=await productModel.findByIdAndUpdate(productId,req.body,{new:true})
        if(modifiedProduct){
            res.send(modifiedProduct)
        }else{
            next(createHttpError(404,`PRODUCT ID${productId} NOT FOUND`))
        }
    } catch (error) {
        next(error)
    }
})
products.delete('/:productId',async(req,res,next)=>{
    try {
        const productId=req.params.productId
        const deletedProduct=await productModel.findByIdAndDelete(productId)
        if(deletedProduct){
            res.send(`PRODUCT WITH ID${productId} IS GONE`)
        }else{
            next(createHttpError(404,`PRODUCT ID${productId} NOT FOUND`))
        }
    } catch (error) {
        next(error)
    }
})


export default products