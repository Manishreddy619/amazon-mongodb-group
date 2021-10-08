import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const productSchema = new Schema(
	{
		// name description brand imageUrl price category
		name: { type: String, required: true },
		description: { type: String, required: true },
		brand: { type: String, required: true },
		imageUrl: { type: String, required: true },
		price: { type: Number, required: true },
		category: { type: String, required: true },
		// reviews: [{ type: Schema.Types.ObjectId, ref: 'review' }],
	},
	{ timestamps: true },
);

export default model('product', productSchema);
