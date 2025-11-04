import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/${id}`
      );
      setProduct(response.data);
    } catch (error) {
      toast.error('Produto não encontrado');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Faça login para adicionar ao carrinho');
      navigate('/login');
      return;
    }

    if (quantity > product.stock) {
      toast.error('Quantidade excede o estoque disponível');
      return;
    }

    addToCart(product._id, quantity);
    toast.success('Produto adicionado ao carrinho!');
  };

  if (loading) return <Loader />;
  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image || 'https://via.placeholder.com/500'}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="mb-4">
            <span className="text-3xl font-bold text-green-600">
              R$ {product.price.toFixed(2)}
            </span>
          </div>
          <div className="mb-4">
            <span className="text-lg">
              <strong>Categoria:</strong> {product.category}
            </span>
          </div>
          <div className="mb-6">
            <span className="text-lg">
              <strong>Estoque:</strong> {product.stock} unidades
            </span>
          </div>
          {product.stock > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-semibold">Quantidade:</label>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-20 px-3 py-2 border rounded-lg"
                />
              </div>
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          ) : (
            <button
              disabled
              className="w-full bg-gray-400 text-white py-3 rounded-lg text-lg font-semibold cursor-not-allowed"
            >
              Sem Estoque
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

