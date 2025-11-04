import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            Suplementos
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-blue-200 transition">
              Home
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/cart" className="relative hover:text-blue-200 transition">
                  Carrinho
                  {getCartItemsCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getCartItemsCount()}
                    </span>
                  )}
                </Link>
                <Link to="/profile" className="hover:text-blue-200 transition">
                  Perfil
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="hover:text-blue-200 transition">
                    Admin
                  </Link>
                )}
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Olá, {user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
                  >
                    Sair
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/cart" className="hover:text-blue-200 transition">
                  Carrinho
                </Link>
                <Link
                  to="/login"
                  className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition"
                >
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

