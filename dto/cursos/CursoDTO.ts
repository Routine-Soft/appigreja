/**
 * DTOs relacionados ao domínio de Usuário.
 * Arquivo único por simplicidade e fácil manutenção.
 */

/* =========================
 *  MÓDULO DTO
 * ========================= */

export interface ModuloDTO {
    _id?: string;
    titulo: string;
    descricao?: string;
    ordem?: number;
    conteudo?: string;
    preco?: number;
    videoUrl?: string;
    createdAt?: string;
    updatedAt?: string;
}

/* =========================
 *  CURSO - CREATE
 * ========================= */

export interface CreateCursoDTO {
    titulo: string;
    descricao?: string;
    categoria?: string;
    duracao?: number;
    imagem?: string;
    ativo?: boolean;
    modulos?: ModuloDTO[];
}

/* =========================
 *  CURSO - UPDATE
 * ========================= */

export interface UpdateCursoDTO {
    titulo?: string;
    descricao?: string;
    categoria?: string;
    duracao?: number;
    imagem?: string;
    ativo?: boolean;
    modulos?: ModuloDTO[];
}

/* =========================
 *  CURSO - RESPONSE (GET)
 * ========================= */

export interface CursoResponseDTO {
    _id: string;
    titulo: string;
    descricao?: string;
    categoria?: string;
    duracao?: number;
    imagem?: string;
    ativo: boolean;
    modulos?: ModuloDTO[];
    createdAt?: string;
    updatedAt?: string;
}
