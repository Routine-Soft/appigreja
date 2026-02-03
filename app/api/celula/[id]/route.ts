import { NextRequest, NextResponse } from 'next/server';
import db from '@/database/db';
import CelulaModel from '@/models/celula';

// ---------------------------------------------------------
// GET — Buscar celula por ID
// ---------------------------------------------------------
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await db();
        const { id } = await context.params;
        const celula = await CelulaModel.findById(id);

        if (!celula) {
            return NextResponse.json(
                { error: 'Celula não encontrada' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Celula encontrada', celula },
            { status: 200 }
        );
    } catch (error) {
        console.error('Erro ao buscar celula:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}


// ---------------------------------------------------------
// PATCH — Atualizar celula
// ---------------------------------------------------------
export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

        await db();

        const body = await request.json();
        const celula = await CelulaModel.findById(id);

        if (!celula) {
            return NextResponse.json(
                { error: 'Celula não encontrada' },
                { status: 404 }
            );
        }

        Object.assign(celula, body);
        await celula.save();

        return NextResponse.json(
            { message: 'Celula atualizada com sucesso', celula },
            { status: 200 }
        );
    } catch (error) {
        console.error('Erro ao atualizar celula:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}


// ---------------------------------------------------------
// DELETE — Deletar celula
// ---------------------------------------------------------
export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

        await db();

        const deletedCelula = await CelulaModel.findByIdAndDelete(id);

        if (!deletedCelula) {
            return NextResponse.json(
                { error: 'Celula não encontrada' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Celula deletada com sucesso' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Erro ao deletar celula:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}

