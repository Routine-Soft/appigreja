import {NextRequest, NextResponse} from 'next/server';
import db from '@/database/db';
import despesasModel from '@/models/despesas';

// ------------------------------------------------
// GET — Listar todos as despesas
// ------------------------------------------------
export async function GET() {
    try {
        await db();

        const despesas = await despesasModel.find().sort({createdAt: -1});

        if (!despesas || despesas.length === 0) {
            return NextResponse.json(
                {error: 'Nenhum despesa cadastrado ainda'},
                {status: 404}
            )
        }
        
        return NextResponse.json(
            {message: 'Despesas listadas com sucesso', despesas},
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
// POST — Criar despesa
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
                {error: 'Nome e Valor da despesa são obrigatórios'},
                {status: 400}
            )
        }

        const formattedPrice = Number(
            amount.toString().replace(',', '.')
        );

        if (isNaN(formattedPrice)) {
            return NextResponse.json(
                {error: 'Valor da despesa invalido'},
                {status: 400},
            )
        }

        const priceInCents = Math.round(formattedPrice * 100);

        const newDespesa = new despesasModel({
            description,
            amount: priceInCents,
        });

        await newDespesa.save();

        return NextResponse.json(
            {message: 'Despesa criada com sucesso', despesa: newDespesa},
            {status: 201}
        )


    } catch (error) {
        return NextResponse.json(
            {error: 'Erro interno do servidor'},
            {status: 500}
        )
    }
}