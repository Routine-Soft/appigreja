import { NextRequest, NextResponse } from 'next/server';
import db from '@/database/db';
import cursoModel from '@/models/curso';
import { CreateCursoDTO, CursoResponseDTO } from '@/dto/cursos/CursoDTO';


// ------------------------------------------------
// GET — Listar todos os cursos (single tenant)
// ------------------------------------------------
export async function GET() {
    try {
        await db();

        const cursos = await cursoModel.find().sort({ createdAt: -1 });

        return NextResponse.json(
            { message: 'Cursos listados com sucesso', cursos },
            { status: 200 }
        );
    } catch (error) {
        console.error('Erro ao listar cursos:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}

// ------------------------------------------------
// POST — Criar curso (single tenant)
// ------------------------------------------------
export async function POST(request: NextRequest) {
    try {
        await db();

        const data: CreateCursoDTO = await request.json();

        // const {
        //     titulo,
        //     descricao,
        //     categoria,
        //     duracao,
        //     imagem,
        //     modulos,
        //     preco,
        //     videoUrl,
        // } = body;

        if (!data.titulo) {
            return NextResponse.json(
                { error: 'O título do curso é obrigatório' },
                { status: 400 }
            );
        }

        const curso = await cursoModel.create({
            titulo: data.titulo,
            descricao: data.descricao,
            categoria: data.categoria,
            duracao: data.duracao,
            imagem: data.imagem,
            ativo: data.ativo ?? true,
            modulos: data.modulos ?? [],
        })

        const response: CursoResponseDTO = {
            _id: curso._id.toString(),
            titulo: curso.titulo,
            descricao: curso.descricao,
            categoria: curso.categoria,
            duracao: curso.duracao,
            imagem: curso.imagem,
            ativo: curso.ativo || false,
            modulos: curso.modulos,
            createdAt: curso.createdAt,
            updatedAt: curso.updatedAt,
        };
        // const curso = new cursoModel({
        //     titulo,
        //     descricao,
        //     categoria,
        //     duracao,
        //     imagem,
        //     preco,
        //     videoUrl,
        //     modulos: Array.isArray(modulos) ? modulos : [],
        // });

        // await curso.save();

        return NextResponse.json(
            { message: 'Curso criado com sucesso', curso: response },
            { status: 201 }
        );

    } catch (error) {
        console.error('Erro ao criar curso:', error);
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}
