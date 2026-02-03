import { CreateCelulaDTO, UpdateCelulaDTO, CelulaResponseDTO, CelulaIdentityDTO } from '@/dto/celula/celulaDTO';

export const CelulaService = {
    getAllCelulas: async (): Promise<{ celulas: CelulaResponseDTO[] }> => {
        const response = await fetch('/api/celula', {
            method: 'GET',
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Erro ao buscar células');
        }

        return response.json();
    },

    getCelulaById: async ({_id, token}: CelulaIdentityDTO) => {
        const response = await fetch(`/api/celula/${_id}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        });

        if (!response.ok){
            const data = await response.json();
            throw new Error(data.error || 'Erro ao buscar célula')
        }

        return response.json()
    },

    createCelula: async (celulaData: CreateCelulaDTO) => {
        const response = await fetch('/api/celula', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(celulaData),
        })

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Erro ao criar célula')
        }

        return response.json();
    },

    updateCelula: async ({_id, token}: CelulaIdentityDTO, celulaData: UpdateCelulaDTO) => {
        const response = await fetch(`/api/celula/${_id}`, {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(celulaData),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Erro ao atualizar célula')
        }

        return response.json();
    },

    deleteCelula: async ({_id, token}: CelulaIdentityDTO) => {
        const response = await fetch(`/api/celula/${_id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Erro ao deletar célula')
        }

        return response.json();
    },
}