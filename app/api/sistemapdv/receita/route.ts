import {NextRequest, NextResponse} from 'next/server';
import db from '@/database/db';
import receitaModel from '@/models/receita';

// ------------------------------------------------
// GET — Listar todos as receitas
// ------------------------------------------------
export async function GET() {
    try {
        await db();

        const receitas = await receitaModel.find().sort({createdAt: -1});

        if (!receitas || receitas.length === 0) {
            return NextResponse.json(
                {error: 'Nenhuma receita cadastrada ainda'},
                {status: 404}
            )
        }
        
        return NextResponse.json(
            {message: 'Receitas listadas com sucesso', receitas},
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
// POST — Criar receita
// ------------------------------------------------
export async function POST(request: NextRequest) {
    try {
        await db();

        const body = await request.json();

        const {
            description, 
            amount
        } = body;

        if (!description || !amount){
            return NextResponse.json(
                {error: 'Nome e valor da receita são obrigatórios'},
                {status: 400}
            )
        }

        const formattedPrice = Number(
            amount.toString().replace(',', '.')
        );

        if (isNaN(formattedPrice)) {
            return NextResponse.json(
                {error: 'Valor da receita invalido'},
                {status: 400},
            )
        }

        const priceInCents = Math.round(formattedPrice * 100);

        const newReceita = new receitaModel({
            description,
            amount: priceInCents,
        });

        await newReceita.save();

        return NextResponse.json(
            {message: 'Receita criada com sucesso', receita: newReceita},
            {status: 201}
        )


    } catch (error) {
        return NextResponse.json(
            {error: 'Erro interno do servidor'},
            {status: 500}
        )
    }
}