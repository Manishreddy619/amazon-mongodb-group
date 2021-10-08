import express from 'express';
import reviewModel from './schema.js';
import createHttpError from 'http-errors';
// import q2m from "query-to-mongo"

const reviewsRouter = express.Router();

reviewsRouter.get('/', async (req, res, next) => {
	try {
		const review = await reviewModel
			.find()
			.populate({ path: 'product', select: 'name description' }); // look what marco write
		res.send(review);
	} catch (error) {
		next(error);
	}
});

reviewsRouter.post('/', async (req, res, next) => {
	try {
		const newReview = new reviewModel(req.body);
		const allReview = await newReview.save();
		res.status(201).send(allReview);
	} catch (error) {
		next(error);
	}
});

reviewsRouter.get('/:reviewId', async (req, res, next) => {
	try {
		const reviewId = req.params.reviewId;
		const review = await reviewModel.findById(reviewId).populate('product'); // look what marco write
		if (review) {
			res.send(review);
		} else {
			next(
				createHttpError(404, `review with id ${req.params.reviewId} not found`),
			);
		}
	} catch (error) {
		next(error);
	}
});

reviewsRouter.put('/:reviewId', async (req, res, next) => {
	try {
		const reviewId = req.params.reviewId;
		const modRev = await reviewModel.findByIdAndUpdate(reviewId, req.body, {
			new: true,
		});
		if (modRev) {
			res.send(modRev);
		} else {
			next(
				createHttpError(404, `review with id ${req.params.reviewId} not fund`),
			);
		}
	} catch (error) {
		next(error);
	}
});

reviewsRouter.delete('/:reviewId', async (req, res, next) => {
	try {
		const reviewId = req.params.reviewId;
		const delRev = await reviewModel.findByIdAndDelete(reviewId);
		if (delRev) {
			res.send(delRev);
		} else {
			next(
				createHttpError(404, `review with id ${req.params.reviewId} not found`),
			);
		}
	} catch (error) {
		next(error);
	}
});

export default reviewsRouter;
