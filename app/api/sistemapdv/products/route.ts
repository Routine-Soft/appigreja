import {NextRequest, NextResponse} from 'next/server';
import db from '@/database/db';
import productsModel from '@/models/products';

// ------------------------------------------------
// GET — Listar todos os produtos (single tenant)
// ------------------------------------------------
export async function GET() {
    try {
        await db();

        const products = await productsModel.find().sort({createdAt: -1});

        if (!products || products.length === 0) {
            return NextResponse.json(
                {error: 'Nenhum produto cadastrado ainda'},
                {status: 404}
            )
        }
        
        return NextResponse.json(
            {message: 'Produtos listados com sucesso', products},
            {status: 200}
        )
    } catch (error) {
        return NextResponse.json(
            {error: 'Erro interno do servidor'},
            {status: 500}
        );
    }
}

// ------------------------------------------------
// POST — Criar produto (single tenant)
// ------------------------------------------------
export async function POST(request: NextRequest) {
    try {
        await db();

        const body = await request.json();

        const {
            name,
            price,
        } = body;

        if (!name || !price){
            return NextResponse.json(
                {error: 'Nome e preço do produto são obrigatórios'},
                {status: 400}
            )
        }

        const formattedPrice = Number(
            price.toString().replace(',', '.')
        );

        if (isNaN(formattedPrice)) {
            return NextResponse.json(
                {error: 'Preço do produto invalido'},
                {status: 400},
            )
        }

        const priceInCents = Math.round(formattedPrice * 100);

        const newProduct = new productsModel({
            name,
            price: priceInCents,
        });

        await newProduct.save();

        return NextResponse.json(
            {message: 'Produto criado com sucesso', product: newProduct},
            {status: 201}
        )


    } catch (error) {
        return NextResponse.json(
            {error: 'Erro interno do servidor'},
            {status: 500}
        )
    }
}
