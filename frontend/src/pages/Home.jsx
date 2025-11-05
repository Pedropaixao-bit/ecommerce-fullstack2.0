import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const url = category
        ? `${import.meta.env.VITE_API_URL}/products?category=${category}`
        : `${import.meta.env.VITE_API_URL}/products`;
      const response = await axios.get(url);
      setProducts(response.data.products || response.data);
      
      // Extract unique categories
      const uniqueCategories = [
        ...new Set((response.data.products || response.data).map(p => p.category))
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      toast.error('Erro ao carregar produtos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      fetchProducts();
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/search?q=${searchTerm}`
      );
      setProducts(response.data);
    } catch (error) {
      toast.error('Erro ao buscar produtos');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-500 text-white py-16 mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              💪 Suplementos de Alta Qualidade
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100">
              Transforme seu corpo e alcance seus objetivos
            </p>
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-6 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-4 focus:ring-orange-300 text-lg"
                />
                <button
                  type="submit"
                  className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold transition transform hover:scale-105 shadow-lg"
                >
                  Buscar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Categories Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Categorias</h2>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setCategory('')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                category === ''
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              Todos os Produtos
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  category === cat
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-xl font-semibold">Nenhum produto encontrado</p>
            <p className="text-gray-400 mt-2">Tente buscar por outra categoria ou termo</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                {category ? `Produtos em ${category}` : 'Todos os Produtos'}
                <span className="text-orange-600 ml-2">({products.length})</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

