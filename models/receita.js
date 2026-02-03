import mongoose from "mongoose";

const receitaSchema = new mongoose.Schema({
    saleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sale",
      required: true,
      unique: true, // uma receita por venda
    },
    description: { type: String, required: true }, 
    amount: { type: Number, required: true },
}, {timestamps: true});

const ReceitaModel = mongoose.models.receita || mongoose.model("receita", receitaSchema);
export default ReceitaModel;