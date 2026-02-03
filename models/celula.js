import mongoose from 'mongoose';

const CelulaSchema = new mongoose.Schema({
    lideres: { type: [String], required: true },
    anfitrioes: { type: [String], required: true },
    enderecos: [
        {
            cep: { type: String, required: false },
            rua: { type: String, required: true },
            numero: { type: String, required: true },
            bairro: { type: String, required: true },
            cidade: { type: String, required: true },
            estado: { type: String, required: true },
        }
    ],
    telefones: { type: [String], required: true },
}, {timestamps: true});

const CelulaModel = mongoose.models.celula || mongoose.model('celula', CelulaSchema);
export default CelulaModel;