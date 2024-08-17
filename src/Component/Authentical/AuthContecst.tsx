import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  const login = (username: string, password: string) => {
    const passwordValid = password.length >= 6 && /^[A-Za-z]/.test(password);
    const usernameValid = username.length >= 6;

    if (passwordValid && usernameValid) {
      setIsAuthenticated(true);
      navigate('/');  //Перенаправляет на домашнюю страницу после успешной регистрации
    } else {
      alert('Пароль должен быть не менее 6 символов, начинаться с латинской буквы, а логин должен быть не менее 6 символов.');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
