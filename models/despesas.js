import mongoose from "mongoose";

const despesaSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'O nome da despesa é obrigatório']
    },
    amount: {
        type: Number,
        required: [true, 'O valor da despesa é obrigatório']
    },
}, { timestamps: true})

const despesaModel = mongoose.models.despesa || mongoose.model('despesa', despesaSchema);
export default despesaModel;