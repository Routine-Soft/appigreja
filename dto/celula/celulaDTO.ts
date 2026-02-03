/**
 * DTOs relacionados ao domínio de Usuário.
 * Arquivo único por simplicidade e fácil manutenção.
 */



export interface CreateCelulaDTO {
    lideres: string[];
    anfitrioes?: string[];
    enderecos?: string[];
    telefones?: string[];
}

export interface UpdateCelulaDTO {
    lideres?: string[];
    anfitrioes?: string[];
    enderecos?: string[];
    telefones?: string[];
}

export interface CelulaResponseDTO { 
    _id: string;
    lideres: string[];
    anfitrioes?: string[];
    enderecos?: string[];
    telefones?: string[];
}

export interface CelulaIdentityDTO {
    _id: string;
    token?: string;
}