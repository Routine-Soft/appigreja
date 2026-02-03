import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'O nome do produto é obrigatório']
    },
    price: {
        type: Number,
        required: [true, 'O preço do produto é obrigatório']
    },
}, 
{ timestamps: true});

const productsModel = mongoose.models.products || mongoose.model('products', productsSchema);
export default productsModel;