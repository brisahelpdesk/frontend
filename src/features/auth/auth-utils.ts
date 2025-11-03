export function isClient(roles?: string[]): boolean {
  if (!roles || roles.length === 0) return false;
  return roles.some(role => 
    role.toLowerCase() === 'client' || 
    role.toLowerCase() === 'cliente' ||
    role.toLowerCase() === 'role_client'
  );
}



export function isEmployee(roles?: string[]): boolean {
  if (!roles || roles.length === 0) return false;
  return roles.some(role => 
    role.toLowerCase() === 'employee' || 
    role.toLowerCase() === 'funcionario' ||
    role.toLowerCase() === 'admin' ||
    role.toLowerCase() === 'tecnico' ||
    role.toLowerCase() === 'role_employee' ||
    role.toLowerCase() === 'role_admin' ||
    role.toLowerCase() === 'supervisor'
  );
}


export function getInitialRoute(roles?: string[]): string {
  if (isClient(roles)) {
    return '/client-portal';
  }
  if (isEmployee(roles)) {
    return '/app';
  }
  return '/auth/login';
}


export type UserType = 'client' | 'employee' | 'unknown';


export function getUserType(roles?: string[]): UserType {
  if (isClient(roles)) return 'client';
  if (isEmployee(roles)) return 'employee';
  return 'unknown';
}
