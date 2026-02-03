import { UserIdentityDTO } from "@/dto/user/UserDTO";
import { hasPermission, PERMISSIONS } from "./permissions";

export function getDashboardRoute(user: UserIdentityDTO): string {

    if (hasPermission(user, PERMISSIONS.ADMIN_ACCESS))
        return '/admin/dashboard';

    if (hasPermission(user, PERMISSIONS.CANTINA_ACCESS))
        return '/cantina';

    if (hasPermission(user, PERMISSIONS.CELULA_ACCESS))
        return '/celula';

    return '/dashboard';
}