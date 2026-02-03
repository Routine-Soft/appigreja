'use client';

import { ReactNode } from 'react';
import { UserIdentityDTO } from "@/dto/user/UserDTO";
import { Permission } from "@/utils/permissions";
import { hasPermission } from "@/utils/permissions";

type CanProps = {
    user: UserIdentityDTO;
    permissions: Permission[];
    children: ReactNode;
};

export function Can({ user, permissions, children }: CanProps) {

    const allowed = permissions.some(permission =>
        hasPermission(user, permission)
    );

    if (!allowed) return null;

    return <>{children}</>;
}
