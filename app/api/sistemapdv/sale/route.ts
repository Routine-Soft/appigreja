import db from "@/database/db";
import { NextRequest, NextResponse } from "next/server";
import saleModel from "@/models/sale";
import productsModel from "@/models/products";
import ReceitaModel from "@/models/receita";

// ------------------------------------------------
// GET — Listar todos as vendas
// ------------------------------------------------
export async function GET() {
    try {
        await db();

        const sale = await saleModel.find().sort({createdAt: -1});

        if (!sale || sale.length === 0) {
            return NextResponse.json(
                {error: 'Nenhuma venda cadastrada ainda'},
                {status: 404}
            )
        }
        
        return NextResponse.json(
            {message: 'Vendas listados com sucesso', sale},
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
// POST — Criar venda
// ------------------------------------------------
export async function POST(request: NextRequest) {
  try {
    await db();

    const { productId, quantity } = await request.json();

    const product = await productsModel.findById(productId);

    if (!product) {
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    // se você tiver isActive no produto
    if (product.isActive === false) {
      return NextResponse.json(
        { error: "Produto indisponível" },
        { status: 400 }
      );
    }

    const qty = Number(quantity);
    const unitPrice = product.price; // já em centavos
    const total = unitPrice * qty;

    // 1️⃣ cria venda
    const sale = await saleModel.create({
      productId: product._id,
      quantity: qty,
      unitPrice,
      total,
    });

    // 2️⃣ cria receita
    await ReceitaModel.create({
      saleId: sale._id,
      amount: total,
      description: `Venda de ${quantity}x ${product.name}`,
    });

    return NextResponse.json(
        { message: "Venda realizada com sucesso", sale },
        { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno" },
      { status: 500 }
    );
  }
}
