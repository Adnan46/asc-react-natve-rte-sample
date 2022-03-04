import { useContext } from 'react';

import { AuthContext } from '../provider';

const useAuth = () => {
    const { login, logout, client, isConnected, isConnecting, error } = useContext(AuthContext);

    return {
        error,
        login,
        client,
        logout,
        isConnected,
        isConnecting,
    };
};

export default useAuth;
