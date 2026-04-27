import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UsersPage from './pages/UsersPage';

import RestaurantsPage from './pages/RestaurantsPage';
import AddRestaurantPage from './pages/AddRestaurantsPage';
import EditRestaurantPage from './pages/EditRestaurantsPage';

import FavoritesPage from './pages/FavoritesPage';
import AddFavoritePage from './pages/AddFavoritePage';
import EditFavoritePage from './pages/EditFavoritePage';


function PrivateRoute() {
  return <Outlet />;
}


function Layout() {
  return (
    <>
      <NavBar />
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <Outlet />
      </div>
    </>
  );
}


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/users" element={<UsersPage />} />
            <Route path="/restaurants">
              <Route index element={<RestaurantsPage />} />
              <Route path="add" element={<AddRestaurantPage />} />
              <Route path=":id/edit" element={<EditRestaurantPage />} />
            </Route>
            <Route path="/favorites">
              <Route index element={<FavoritesPage />} />
              <Route path="add" element={<AddFavoritePage />} />
              <Route path=":id/edit" element={<EditFavoritePage />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;