import React, { useEffect, useState } from 'react';
import keycloak from './keycloak';
import { getUserInfo, getMe } from './authService';

function ProfileBar() {
  const [userInfo, setUserInfo] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getUserInfo()
      .then((res) => setUserInfo(res.data))
      .catch(() => setUserInfo(null));

    getMe()
      .then((res) => {
        const realmAccess = res.data.realm_access;
        if (realmAccess && Array.isArray(realmAccess.roles)) {
          setRoles(realmAccess.roles);
        } else {
          setRoles([]);
        }
      })
      .catch(() => setRoles([]));
  }, []);

  const handleLogout = () => {
    keycloak.logout({ redirectUri: window.location.origin });
  };

  return (
    <header className="profile-bar">
      <div className="profile-title">E-Learning App</div>
      <div className="profile-meta">
        {userInfo && (
          <>
            <span className="profile-user">
              {userInfo.given_name} {userInfo.family_name} ({userInfo.email})
            </span>
            <span className="profile-roles">
              Rôles : {roles.join(', ') || 'Aucun'}
            </span>
          </>
        )}
        <button className="btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default ProfileBar;
