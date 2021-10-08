import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const cartSchema = new Schema({
	productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
	products: [{ asin: String, title: String, price: Number, quantity: Number }],
});

export default model('Cart', cartSchema);
