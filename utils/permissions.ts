import { UserIdentityDTO } from "@/dto/user/UserDTO";

export const PERMISSIONS = {
    ADMIN_ACCESS: 'ADMIN_ACCESS',
    CANTINA_ACCESS: 'CANTINA_ACCESS',
    CELULA_ACCESS: 'CELULA_ACCESS',
} as const;

// 👇 pega automaticamente os valores do objeto
export type Permission =
    typeof PERMISSIONS[keyof typeof PERMISSIONS];

export function hasPermission(
    user: UserIdentityDTO,
    permission: Permission
): boolean {
    return user?.permissions?.includes(permission) ?? false;
}
