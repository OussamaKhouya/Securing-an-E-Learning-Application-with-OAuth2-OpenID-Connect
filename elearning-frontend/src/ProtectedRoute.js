import React from 'react';
import { Navigate } from 'react-router-dom';
import keycloak from './keycloak';

function userHasAnyRole(requiredRoles) {
  const tokenParsed = keycloak.tokenParsed;
  const roles =
    tokenParsed &&
    tokenParsed.realm_access &&
    Array.isArray(tokenParsed.realm_access.roles)
      ? tokenParsed.realm_access.roles
      : [];
  return requiredRoles.some((role) => roles.includes(role));
}

function ProtectedRoute({ children, roles }) {
  if (!keycloak.authenticated) {
    return <Navigate to="/" replace />;
  }

  if (roles && roles.length > 0 && !userHasAnyRole(roles)) {
    return <Navigate to="/courses" replace />;
  }

  return children;
}

export default ProtectedRoute;

