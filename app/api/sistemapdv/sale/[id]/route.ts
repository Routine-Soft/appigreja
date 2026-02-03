import db from "@/database/db";
import { NextRequest, NextResponse } from "next/server";
import saleModel from "@/models/sale";
import productsModel from "@/models/products";
import ReceitaModel from "@/models/receita"

// ---------------------------------------------------------
// GET — Buscar sale por ID
// ---------------------------------------------------------
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await db();
    const { id } = await context.params;
    const sale = await saleModel.findById(id).populate("productId");

    if (!sale) {
      return NextResponse.json(
        { error: "Venda não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {message: 'Venda encontrada com sucesso', sale},
      {status: 200}
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------
// PATCH — Atualizar sale
// ---------------------------------------------------------
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await db();
    const { id } = await context.params;
    const body = await request.json();

    const sale = await saleModel.findById(id);

    if (!sale) {
      return NextResponse.json(
        { error: "Venda não encontrada" },
        { status: 404 }
      );
    }

    // se a quantidade foi alterada
    if (body.quantity !== undefined) {
      const qty = Number(body.quantity);

      if (qty < 1) {
        return NextResponse.json(
          { error: "Quantidade inválida" },
          { status: 400 }
        );
      }

      sale.quantity = qty;
      sale.total = sale.unitPrice * qty;

      // atualiza a receita vinculada
      await ReceitaModel.findOneAndUpdate(
        { saleId: sale._id },
        { amount: sale.total }
      );
    }

    Object.assign(sale, body);
    await sale.save();

    return NextResponse.json(
      { message: "Venda atualizada com sucesso", sale },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------
// DELETE — Deletar sale
// ---------------------------------------------------------
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await db();
    const { id } = await context.params;
    
    const sale = await saleModel.findByIdAndDelete(id);

    if (!sale) {
      return NextResponse.json(
        { error: "Venda não encontrada" },
        { status: 404 }
      );
    }

    await ReceitaModel.findOneAndDelete({ saleId: sale._id });

    return NextResponse.json(
      { message: "Venda cancelada" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
