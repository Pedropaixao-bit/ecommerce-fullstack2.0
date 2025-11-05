import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAuthenticated) {
      addToCart(product._id, 1);
      toast.success('Produto adicionado ao carrinho!');
    } else {
      toast.error('Faça login para adicionar ao carrinho');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <Link to={`/product/${product._id}`} className="block">
        <div className="relative overflow-hidden bg-gray-100">
          <img
            src={product.image || 'https://via.placeholder.com/300'}
            alt={product.name}
            className="w-full h-64 object-cover hover:scale-110 transition-transform duration-300"
          />
          {product.stock === 0 && (
            <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
              Esgotado
            </div>
          )}
          {product.stock > 0 && product.stock < 10 && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              Últimas unidades
            </div>
          )}
        </div>
      </Link>
      <div className="p-5">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-bold mb-2 hover:text-orange-600 transition text-gray-800 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 min-h-[40px]">
          {product.description}
        </p>
        <div className="mb-3">
          <span className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-3xl font-bold text-orange-600">
              R$ {product.price.toFixed(2)}
            </span>
          </div>
          {product.stock > 0 && (
            <span className="text-sm text-gray-600 bg-green-100 px-2 py-1 rounded-full">
              ✓ Em estoque
            </span>
          )}
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? (
            'Sem estoque'
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Adicionar ao Carrinho
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

