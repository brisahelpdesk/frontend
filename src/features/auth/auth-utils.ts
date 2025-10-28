/**
 * Utilitários de autenticação e autorização
 */

/**
 * Determina se o usuário é um cliente baseado nas roles
 */
export function isClient(roles?: string[]): boolean {
  if (!roles || roles.length === 0) return false;
  return roles.some(role => 
    role.toLowerCase() === 'client' || 
    role.toLowerCase() === 'cliente' ||
    role.toLowerCase() === 'role_client'
  );
}

/**
 * Determina se o usuário é um funcionário baseado nas roles
 */
export function isEmployee(roles?: string[]): boolean {
  if (!roles || roles.length === 0) return false;
  return roles.some(role => 
    role.toLowerCase() === 'employee' || 
    role.toLowerCase() === 'funcionario' ||
    role.toLowerCase() === 'admin' ||
    role.toLowerCase() === 'tecnico' ||
    role.toLowerCase() === 'role_employee' ||
    role.toLowerCase() === 'role_admin'
  );
}

/**
 * Retorna a rota inicial baseada nas roles do usuário
 */
export function getInitialRoute(roles?: string[]): string {
  if (isClient(roles)) {
    return '/client-portal';
  }
  if (isEmployee(roles)) {
    return '/app';
  }
  return '/auth/login';
}

/**
 * Tipo de usuário
 */
export type UserType = 'client' | 'employee' | 'unknown';

/**
 * Retorna o tipo de usuário baseado nas roles
 */
export function getUserType(roles?: string[]): UserType {
  if (isClient(roles)) return 'client';
  if (isEmployee(roles)) return 'employee';
  return 'unknown';
}
