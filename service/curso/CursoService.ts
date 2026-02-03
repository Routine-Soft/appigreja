import { CreateCursoDTO, ModuloDTO, UpdateCursoDTO, CursoResponseDTO } from "@/dto/cursos/CursoDTO";

export const CursoService = {
    getAllCursos: async (): Promise<{ cursos: CursoResponseDTO[] }> => {
        const response = await fetch('/api/cursos', {
            method: 'GET',
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Erro ao buscar cursos');
        }

        return response.json();
    },

    createCurso: async (cursoData: CreateCursoDTO) => {
        const response = await fetch('/api/cursos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cursoData),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Erro ao criar curso');
        }

        return response.json();
    },

    updateCurso: async (
        id: string,
        cursoData: UpdateCursoDTO
    ): Promise<{ curso: CursoResponseDTO }> => {
        const response = await fetch(`/api/cursos/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cursoData),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Erro ao atualizar curso');
        }

        return response.json();
    },

    // ------------------------------------------------
    // DELETE — Deletar curso
    // ------------------------------------------------
    deleteCurso: async (
        id: string
    ): Promise<{ message: string }> => {
        const response = await fetch(`/api/cursos/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Erro ao deletar curso');
        }

        return response.json();
    },
}