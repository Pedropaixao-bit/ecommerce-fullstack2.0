const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Suplementos</h3>
            <p className="text-gray-400">
              Seu e-commerce de suplementos de confiança.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/cart" className="hover:text-white transition">
                  Carrinho
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <p className="text-gray-400">Email: contato@suplementos.com</p>
            <p className="text-gray-400">Telefone: (11) 9999-9999</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Suplementos. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

