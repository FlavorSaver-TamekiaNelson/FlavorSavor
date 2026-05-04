import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar.jsx';
import ProtectedRoute from './auth/ProtectedRoute.jsx';
import RestaurantsPage from './pages/restaurants/RestaurantsPage.jsx';
import AddRestaurantsPage from './pages/restaurants/AddRestaurantsPage.jsx';
import EditRestaurantsPage from './pages/restaurants/EditRestaurantsPage.jsx';
import FavoritesPage from './pages/favorites/FavoritesPage.jsx';
import AddFavoritePage from './pages/favorites/AddFavoritePage.jsx';
import EditFavoritePage from './pages/favorites/EditFavoritePage.jsx';
import UsersPage from './pages/users/UsersPage.jsx';
import LoginPage from './pages/auth/LoginPage.jsx';
import RegisterPage from './pages/auth/RegisterPage.jsx';
import HomePage from './pages/home/HomePage.jsx';

function App() {
  return (
    <Router>
      <NavBar />
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/restaurants" element={<ProtectedRoute><RestaurantsPage /></ProtectedRoute>} />
          <Route path="/restaurants/add" element={<ProtectedRoute><AddRestaurantsPage /></ProtectedRoute>} />
          <Route path="/restaurants/:id/edit" element={<ProtectedRoute><EditRestaurantsPage /></ProtectedRoute>} />

          <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
          <Route path="/favorites/add" element={<ProtectedRoute><AddFavoritePage /></ProtectedRoute>} />
          <Route path="/favorites/:id/edit" element={<ProtectedRoute><EditFavoritePage /></ProtectedRoute>} />

          <Route path="/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />

          <Route path="*" element={<h2>404 — Page Not Found</h2>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;