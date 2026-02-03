import { NextRequest, NextResponse } from "next/server";
import db from "@/database/db";
import productsModel from "@/models/products";

// ---------------------------------------------------------
// GET — Buscar curso por ID
// ---------------------------------------------------------
export async function GET(
    request: NextRequest,
    context: {params: Promise<{id: string}>}
){
    try {
        const {id} = await context.params;
        await db();

        const product = await productsModel.findById(id);

        if(!product){
            return NextResponse.json(
                {error: 'Produto não encontrado'},
                {status: 404}
            );
        }

        return NextResponse.json(
            {message: 'Produto encontrado', product},
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
// PATCH — Atualizar curso
// ---------------------------------------------------------
export async function PATCH(
    request: NextRequest,
    context: {params: Promise<{id: string}>}
){
    try {
        await db();
        const {id} = await context.params;
        const body = await request.json();

        const product = await productsModel.findById(id);

        if(!product){
            return NextResponse.json(
                {error: 'Produto não encontrado'},
                {status: 404}
            )
        }

        if(body.price !== undefined){
            const formattedPrice = Number(
                body.price.toString().replace(',', '.')
            );

            if (isNaN(formattedPrice)) {
                return NextResponse.json(
                    {error: 'Preço do produto invalido'},
                    {status: 400},
                );
            }

            body.price = Math.round(formattedPrice * 100);
        }

        Object.assign(product, body);
        await product.save();

        return NextResponse.json(
            {message: 'Produto atualizado com sucesso', product},
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
// DELETE — Deletar curso
// ---------------------------------------------------------
export async function DELETE(
    request: NextRequest,
    context: {params: Promise<{id: string}>}
){
    try {
        await db();
        const {id} = await context.params;

        const deletedProduct = await productsModel.findByIdAndDelete(id)
        
        if(!deletedProduct){
            return NextResponse.json(
                {error: 'Produto não encontrado'},
                {status: 404}
            )
        }

        return NextResponse.json(
            {message: 'Produto deletado com sucesso'},
            {status: 200}
        )
    } catch (error) {
        return NextResponse.json(
            {error: 'Erro interno do servidor'},
            {status: 500}
        )
    }
}