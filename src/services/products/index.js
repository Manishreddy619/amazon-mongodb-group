import express from 'express';
import createHttpError from 'http-errors';
import q2m from 'query-to-mongo';
import productModel from './schema.js';
import { parseFile } from './cloudinary.js';
const products = express.Router();

products.get('/', async (req, res, next) => {
	try {
		const mQ = q2m(req.query);
		const totalProducts = await productModel.countDocuments(mQ.criteria);
		const products = await productModel
			.find()
			.sort(mQ.options.sort)
			.skip(mQ.options.skip || 5)
			.limit(mQ.options.limit || 5);
		//.populate({path:'reviews'})
		res.send({
			links: mQ.links('/products', totalProducts),
			totalProducts,
			pageTotal: Math.ceil(totalProducts / mQ.options.limit),
			products,
		});
	} catch (error) {
		next(error);
	}
});
products.post('/', async (req, res, next) => {
	try {
		const newProduct = await productModel(req.body);
		const { _id } = await newProduct.save();
		res.status(201).send({ _id });
	} catch (error) {
		next(error);
	}
});
products.get('/:productId', async (req, res, next) => {
	try {
		const productId = req.params.productId;
		const product = await productModel.findById(productId).populate('reviews');
		if (product) {
			res.send(product);
		} else {
			next(createHttpError(404, `PRODUCT ID${productId} NOT FOUND`));
		}
	} catch (error) {
		next(error);
	}
});
products.put('/:productId', async (req, res, next) => {
	try {
		const productId = req.params.productId;
		const modifiedProduct = await productModel.findByIdAndUpdate(
			productId,
			req.body,
			{ new: true },
		);
		if (modifiedProduct) {
			res.send(modifiedProduct);
		} else {
			next(createHttpError(404, `PRODUCT ID${productId} NOT FOUND`));
		}
	} catch (error) {
		next(error);
	}
});
products.delete('/:productId', async (req, res, next) => {
	try {
		const productId = req.params.productId;
		const deletedProduct = await productModel.findByIdAndDelete(productId);
		if (deletedProduct) {
			res.send(`PRODUCT WITH ID${productId} IS GONE`);
		} else {
			next(createHttpError(404, `PRODUCT ID${productId} NOT FOUND`));
		}
	} catch (error) {
		next(error);
	}
});
products.put(
	'/:id/upload',
	parseFile.single('imageUrl'),
	async (req, res, next) => {
		try {
			console.log(req.file.path);
			const productId = req.params.id;
			const product = await productModel.findById(productId);
			console.log(product);
			if (product) {
				let myObj = {
					imageUrl: `${req.file.path}`,
				};
				const modifiedProduct = await productModel.findByIdAndUpdate(
					productId,
					myObj,
					{ new: true },
				);
				if (modifiedProduct) {
					res.send(modifiedProduct);
				}
			}
		} catch (error) {
			next(error);
		}
	},
);

export default products;
