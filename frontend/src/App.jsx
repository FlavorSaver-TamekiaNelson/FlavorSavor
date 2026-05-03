import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar.jsx';
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

          <Route path="/restaurants" element={<RestaurantsPage />} />
          <Route path="/restaurants/add" element={<AddRestaurantsPage />} />
          <Route path="/restaurants/:id/edit" element={<EditRestaurantsPage />} />

          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/favorites/add" element={<AddFavoritePage />} />
          <Route path="/favorites/:id/edit" element={<EditFavoritePage />} />

          <Route path="/users" element={<UsersPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="*" element={<h2>404 — Page Not Found</h2>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
