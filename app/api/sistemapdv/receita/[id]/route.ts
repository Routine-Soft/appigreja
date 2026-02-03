import { NextRequest, NextResponse } from "next/server";
import db from "@/database/db";
import ReceitaModel from "@/models/receita";

// ---------------------------------------------------------
// GET — Buscar receita por ID
// ---------------------------------------------------------
export async function GET(
    request: NextRequest,
    context: {params: Promise<{id: string}>}
){
    try {
        await db();
        const {id} = await context.params;

        const receita = await ReceitaModel.findById(id);

        if(!receita){
            return NextResponse.json(
                {error: 'Receita não encontrada'},
                {status: 404}
            );
        }

        return NextResponse.json(
            {message: 'Receita encontrada', receita},
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
// PATCH — Atualizar receita
// ---------------------------------------------------------
export async function PATCH(
    request: NextRequest,
    context: {params: Promise<{id: string}>}
){
    try {
        await db();
        const {id} = await context.params;
        const body = await request.json();

        const receita = await ReceitaModel.findById(id);

        if(!receita){
            return NextResponse.json(
                {error: 'Receita não encontrada'},
                {status: 404}
            )
        }

        if(body.amount !== undefined){
            const formattedPrice = Number(
                body.amount.toString().replace(',', '.')
            );

            if (isNaN(formattedPrice)) {
                return NextResponse.json(
                    {error: 'Valor da receita invalido'},
                    {status: 400},
                );
            }

            body.amount = Math.round(formattedPrice * 100);
        }

        Object.assign(receita, body);
        await receita.save();

        return NextResponse.json(
            {message: 'Receita atualizada com sucesso', receita},
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
// DELETE — Deletar receita
// ---------------------------------------------------------
export async function DELETE(
    request: NextRequest,
    context: {params: Promise<{id: string}>}
){
    try {
        await db();
        const {id} = await context.params;

        const deletedreceita = await ReceitaModel.findByIdAndDelete(id)
        
        if(!deletedreceita){
            return NextResponse.json(
                {error: 'Receita não encontrada'},
                {status: 404}
            )
        }

        return NextResponse.json(
            {message: 'Receita deletada com sucesso'},
            {status: 200}
        )
    } catch (error) {
        return NextResponse.json(
            {error: 'Erro interno do servidor'},
            {status: 500}
        )
    }
}