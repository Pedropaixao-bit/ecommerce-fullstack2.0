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
    <nav className="bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-3xl font-bold hover:text-orange-200 transition">
            💪 Suplementos Pro
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-orange-200 transition font-medium">
              Início
            </Link>
            <Link to="/" className="hover:text-orange-200 transition font-medium">
              Produtos
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/cart" className="relative hover:text-orange-200 transition font-medium flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Carrinho
                  {getCartItemsCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-yellow-400 text-orange-900 text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                      {getCartItemsCount()}
                    </span>
                  )}
                </Link>
                <Link to="/profile" className="hover:text-orange-200 transition font-medium">
                  Perfil
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="bg-orange-700 hover:bg-orange-800 px-4 py-2 rounded-lg transition font-medium">
                    Admin
                  </Link>
                )}
                <div className="flex items-center space-x-3 border-l pl-4 border-orange-400">
                  <span className="text-sm">Olá, {user?.name?.split(' ')[0]}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded-lg transition font-medium"
                  >
                    Sair
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/cart" className="relative hover:text-orange-200 transition font-medium flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Carrinho
                </Link>
                <Link
                  to="/login"
                  className="bg-orange-700 hover:bg-orange-800 px-4 py-2 rounded-lg transition font-medium"
                >
                  Entrar
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition font-medium"
                >
                  Cadastrar
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Link to="/cart" className="relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-orange-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

