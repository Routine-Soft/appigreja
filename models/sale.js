import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    unitPrice: {
      type: Number, // em centavos
      required: true,
    },

    total: {
      type: Number, // em centavos
      required: true,
    },
  },
  { timestamps: true }
);

const saleModel = mongoose.models.sales || mongoose.model("sales", saleSchema);
export default saleModel;
