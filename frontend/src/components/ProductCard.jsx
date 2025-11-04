import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      addToCart(product._id, 1);
    } else {
      alert('Faça login para adicionar ao carrinho');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image || 'https://via.placeholder.com/300'}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 transition">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-600">
            R$ {product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">
            Estoque: {product.stock}
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? 'Sem estoque' : 'Adicionar ao Carrinho'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

