import { FC, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomeCard from './Component/HomePage/HomePages';
import StarWarsApp from './Component/CardRender/CardRender';
import Header from './Component/Header/Header';
import './assets/style/index.scss';
import CharacterDetail from './Component/CardDetails/CharacterDeatails';
import InforCharacter from './Component/CharacterInfo/InforCharacter';
import Search from './Component/Search/Search';
import ErrorBoundary from './Component/ErrorMessage/ErrorMessage';
import { FavoritesProvider } from './../src/FavoriteContecst';
import FavoritePage from './Component/FavoritePage/FavoritePage';
import NotFound from './Component/NotFoundCard/NotFound';
import Register from './Component/Registration/Registation';
import { AuthProvider, useAuth } from './Component/Authentical/AuthContecst';

const ProtectedRoute: FC<{ element: React.ReactNode }> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/register" />;
};

export const App: FC = () => {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <ErrorBoundary>
          <Header />
          <Suspense fallback={<span>Loading...</span>}>
            <Routes>
              <Route path="/" element={<ProtectedRoute element={<HomeCard />} />} />
              <Route path="/people/*" element={<ProtectedRoute element={<StarWarsApp />} />} />
              <Route path="/people/:id" element={<ProtectedRoute element={<CharacterDetail />} />} />
              <Route path="/CharacterInfo/InforCharacter/:id" element={<ProtectedRoute element={<InforCharacter />} />} />
              <Route path="/search" element={<ProtectedRoute element={<Search />} />} />
              <Route path="/favorites" element={<ProtectedRoute element={<FavoritePage />} />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </FavoritesProvider>
    </AuthProvider>
  );
};
