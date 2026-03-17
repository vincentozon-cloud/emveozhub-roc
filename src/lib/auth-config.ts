// src/lib/auth-config.ts

export type UserRole = 'monitor' | 'operator' | 'admin';

export interface Permission {
  canViewTelemetry: boolean;
  canTriggerMitigation: boolean;
  canManageSystem: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, Permission> = {
  monitor: {
    canViewTelemetry: true,
    canTriggerMitigation: false,
    canManageSystem: false,
  },
  operator: {
    canViewTelemetry: true,
    canTriggerMitigation: true,
    canManageSystem: false,
  },
  admin: {
    canViewTelemetry: true,
    canTriggerMitigation: true,
    canManageSystem: true,
  },
};