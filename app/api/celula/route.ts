import { NextRequest, NextResponse } from 'next/server';
import db from '@/database/db';
import CelulaModel from '@/models/celula';

// ------------------------------------------------
// GET — Listar todas as celulas
// ------------------------------------------------
export async function GET() {
    try {
        await db();

        const celulas = await CelulaModel.find().sort({ createdAt: -1 });

        if(!celulas || celulas.length === 0) {
            return NextResponse.json(
                { error: 'Nenhuma celula cadastrada ainda' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Celulas listadas com sucesso', celulas },
            { status: 200 }
        );
    } catch (error) {
        console.error('Erro ao listar celulas:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}

// ------------------------------------------------
// POST — Criar celular
// ------------------------------------------------
export async function POST(request: NextRequest) {
    try {
        await db();

        const body = await request.json();

        const {
            lideres,
            anfitrioes,
            enderecos,
            telefones
        } = body;

        if (!lideres) {
            return NextResponse.json(
                { error: 'O nome de pelo menos um lider é obrigatório' },
                { status: 400 }
            );
        }

        const novaCelula = new CelulaModel({
            lideres,
            anfitrioes,
            enderecos,
            telefones
        });

        await novaCelula.save();

        return NextResponse.json(
            { message: 'Celula criada com sucesso', celula: novaCelula },
            { status: 201 }
        );

    } catch (error) {
        console.error('Erro ao criar celula:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}