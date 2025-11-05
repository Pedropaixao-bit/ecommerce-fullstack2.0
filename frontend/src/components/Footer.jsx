const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              💪 Suplementos Pro
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Seu e-commerce de suplementos de alta qualidade. Transforme seu corpo e alcance seus objetivos.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-orange-400">Links Rápidos</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-orange-400 transition flex items-center gap-2">
                  <span>→</span> Início
                </a>
              </li>
              <li>
                <a href="/cart" className="hover:text-orange-400 transition flex items-center gap-2">
                  <span>→</span> Carrinho
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-orange-400 transition flex items-center gap-2">
                  <span>→</span> Login
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-orange-400">Categorias</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-orange-400 transition cursor-pointer">Proteínas</li>
              <li className="hover:text-orange-400 transition cursor-pointer">Vitaminas</li>
              <li className="hover:text-orange-400 transition cursor-pointer">Creatina</li>
              <li className="hover:text-orange-400 transition cursor-pointer">Pré-treino</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-orange-400">Contato</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <span>📧</span> contato@suplementospro.com
              </li>
              <li className="flex items-center gap-2">
                <span>📱</span> (11) 9999-9999
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span> São Paulo, SP
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
            <p>&copy; 2024 Suplementos Pro. Todos os direitos reservados.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <span className="hover:text-orange-400 transition cursor-pointer">Termos de Uso</span>
              <span className="hover:text-orange-400 transition cursor-pointer">Política de Privacidade</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

