import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { getApiUrl } from '../utils/api';

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
        getApiUrl(`products/${id}`)
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="relative">
              <img
                src={product.image || 'https://via.placeholder.com/500'}
                alt={product.name}
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
              {product.stock > 0 && product.stock < 10 && (
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-full font-bold">
                  Últimas unidades!
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center">
              <div className="mb-4">
                <span className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-bold uppercase">
                  {product.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">{product.name}</h1>
              <div className="mb-6">
                <span className="text-5xl font-bold text-orange-600">
                  R$ {product.price.toFixed(2)}
                </span>
              </div>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">{product.description}</p>
              
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 font-semibold">Estoque disponível:</span>
                  <span className={`text-lg font-bold ${
                    product.stock > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.stock > 0 ? `${product.stock} unidades` : 'Esgotado'}
                  </span>
                </div>
              </div>

              {product.stock > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="font-bold text-gray-700 text-lg">Quantidade:</label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold transition"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max={product.stock}
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                        className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg text-center font-bold focus:outline-none focus:border-orange-500"
                      />
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-4 rounded-lg text-xl font-bold transition transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Adicionar ao Carrinho
                  </button>
                </div>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-400 text-white py-4 rounded-lg text-xl font-bold cursor-not-allowed"
                >
                  Produto Esgotado
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

