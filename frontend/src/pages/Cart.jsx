import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const Cart = () => {
  const { cart, loading, updateCartItem, removeFromCart, getCartTotal, fetchCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Faça login para ver seu carrinho');
      navigate('/login');
    } else {
      fetchCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const handleQuantityChange = (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;
    updateCartItem(productId, newQuantity);
  };

  const handleCheckout = () => {
    if (!cart || !cart.items || cart.items.length === 0) {
      toast.error('Carrinho vazio');
      return;
    }
    navigate('/checkout');
  };

  if (loading) return <Loader />;

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Carrinho</h1>
        <div className="text-center py-12">
          <p className="text-gray-500 text-xl mb-4">Seu carrinho está vazio</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Carrinho</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.product._id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-4"
            >
              <img
                src={item.product.image || 'https://via.placeholder.com/150'}
                alt={item.product.name}
                className="w-full md:w-32 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{item.product.name}</h3>
                <p className="text-gray-600 mb-2">R$ {item.product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500">
                  Estoque: {item.product.stock}
                </p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => removeFromCart(item.product._id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  Remover
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(item.product._id, item.quantity, -1)}
                    className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded transition"
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.product._id, item.quantity, 1)}
                    disabled={item.quantity >= item.product.stock}
                    className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
                <p className="text-lg font-semibold mt-2">
                  R$ {(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-2xl font-bold mb-4">Resumo do Pedido</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>R$ {getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-4 border-t">
                <span>Total:</span>
                <span>R$ {getCartTotal().toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-semibold transition"
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

