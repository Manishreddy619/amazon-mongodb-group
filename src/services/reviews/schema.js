import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const reviewSchema = new Schema(
	{
		comment: { type: String, required: true },
		rate: { type: Number, required: true },
		product: [{ type: Schema.Types.ObjectId, ref: 'product' }], //REQUIRED reference to Products Table
	},
	{ timestamps: true },
);

export default model('review', reviewSchema);
