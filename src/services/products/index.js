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

export default products