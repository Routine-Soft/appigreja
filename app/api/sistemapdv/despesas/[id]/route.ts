import { NextRequest, NextResponse } from "next/server";
import db from "@/database/db";
import despesasModel from "@/models/despesas";

// ---------------------------------------------------------
// GET — Buscar despesa por ID
// ---------------------------------------------------------
export async function GET(
    request: NextRequest,
    context: {params: Promise<{id: string}>}
){
    try {
        const {id} = await context.params;
        await db();

        const despesa = await despesasModel.findById(id);

        if(!despesa){
            return NextResponse.json(
                {error: 'Despesa não encontrada'},
                {status: 404}
            );
        }

        return NextResponse.json(
            {message: 'Despesa encontrada', despesa},
            {status: 200}
        )
    } catch (error) {
        return NextResponse.json(
            {error: 'Erro interno do servidor'},
            {status: 500}
        )
    }
}

// ---------------------------------------------------------
// PATCH — Atualizar despesa
// ---------------------------------------------------------
export async function PATCH(
    request: NextRequest,
    context: {params: Promise<{id: string}>}
){
    try {
        await db();
        const {id} = await context.params;
        const body = await request.json();

        const despesa = await despesasModel.findById(id);

        if(!despesa){
            return NextResponse.json(
                {error: 'Despesa não encontrada'},
                {status: 404}
            )
        }

        if(body.amount !== undefined){
            const formattedPrice = Number(
                body.amount.toString().replace(',', '.')
            );

            if (isNaN(formattedPrice)) {
                return NextResponse.json(
                    {error: 'Valor da despesa invalido'},
                    {status: 400},
                );
            }

            body.amount = Math.round(formattedPrice * 100);
        }

        Object.assign(despesa, body);
        await despesa.save();

        return NextResponse.json(
            {message: 'Despesa atualizada com sucesso', despesa},
            {status: 200}
        );
    } catch (error) {
        return NextResponse.json(
            {error: 'Erro interno do servidor'},
            {status: 500}
        )
    }
}

// ---------------------------------------------------------
// DELETE — Deletar despesa
// ---------------------------------------------------------
export async function DELETE(
    request: NextRequest,
    context: {params: Promise<{id: string}>}
){
    try {
        await db();
        const {id} = await context.params;

        const deletedDespesa = await despesasModel.findByIdAndDelete(id)
        
        if(!deletedDespesa){
            return NextResponse.json(
                {error: 'Despesa não encontrada'},
                {status: 404}
            )
        }

        return NextResponse.json(
            {message: 'Despesa deletada com sucesso'},
            {status: 200}
        )
    } catch (error) {
        return NextResponse.json(
            {error: 'Erro interno do servidor'},
            {status: 500}
        )
    }
}