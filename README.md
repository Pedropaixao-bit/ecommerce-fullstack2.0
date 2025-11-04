# 🛒 E-commerce de Suplementos - Stack MERN

Projeto completo de e-commerce utilizando MongoDB, Express.js, React.js e Node.js, preparado para deploy no GitHub Pages (frontend) e Render/Railway (backend).

## 📁 Estrutura do Projeto

```
suplementos/
├── backend/          # API RESTful (Node.js + Express + MongoDB)
│   ├── config/       # Configurações do banco de dados
│   ├── controllers/  # Lógica de negócio
│   ├── middleware/   # Middlewares (autenticação)
│   ├── models/       # Modelos Mongoose
│   ├── routes/       # Rotas da API
│   └── server.js     # Arquivo principal do servidor
│
└── frontend/         # Interface React.js (Vite)
    ├── src/
    │   ├── components/  # Componentes reutilizáveis
    │   ├── context/     # Context API (Auth, Cart)
    │   ├── pages/       # Páginas da aplicação
    │   └── App.jsx      # Componente principal
    └── vite.config.js   # Configuração do Vite
```

## 🚀 Início Rápido

### Backend

1. **Instale as dependências:**
```bash
cd backend
npm install
```

2. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/suplementos
# ou use MongoDB Atlas: mongodb+srv://usuario:senha@cluster.mongodb.net/suplementos
JWT_SECRET=sua_chave_secreta_aqui
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

3. **Inicie o servidor:**
```bash
npm run dev  # Modo desenvolvimento (nodemon)
# ou
npm start    # Modo produção
```

### Frontend

1. **Instale as dependências:**
```bash
cd frontend
npm install
```

2. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env
```

Edite o arquivo `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

3. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

4. **Gere o build para produção:**
```bash
npm run build
```

## 📦 Funcionalidades

### Backend (API RESTful)

- ✅ **Autenticação JWT** - Login e registro de usuários
- ✅ **CRUD de Produtos** - Criar, ler, atualizar e deletar produtos
- ✅ **Carrinho de Compras** - Adicionar, remover e atualizar itens
- ✅ **Sistema de Pedidos** - Criar e gerenciar pedidos
- ✅ **Middleware de Autenticação** - Proteção de rotas
- ✅ **Validação de Dados** - Express-validator
- ✅ **CORS Configurado** - Para comunicação com frontend

### Frontend (React + Vite)

- ✅ **Páginas:**
  - Home (lista de produtos com busca e filtros)
  - Detalhes do Produto
  - Carrinho de Compras
  - Login / Cadastro
  - Checkout
  - Perfil do Usuário
  - Painel Admin (CRUD de produtos e gerenciamento de pedidos)

- ✅ **Recursos:**
  - Context API para gerenciamento de estado
  - React Router para navegação
  - TailwindCSS para estilização
  - Toast notifications (react-hot-toast)
  - Proteção de rotas (autenticação e admin)

## 🌐 Deploy

### Backend (Render / Railway)

1. **Render:**
   - Acesse [render.com](https://render.com)
   - Crie uma nova Web Service
   - Conecte seu repositório GitHub
   - Configure:
     - Build Command: `cd backend && npm install`
     - Start Command: `cd backend && npm start`
     - Variáveis de Ambiente:
       - `MONGO_URI` - URI do MongoDB
       - `JWT_SECRET` - Chave secreta para JWT
       - `FRONTEND_URL` - URL do frontend no GitHub Pages
       - `NODE_ENV` - `production`

2. **Railway:**
   - Acesse [railway.app](https://railway.app)
   - New Project → Deploy from GitHub repo
   - Configure as mesmas variáveis de ambiente

### Frontend (GitHub Pages)

1. **Configure o `vite.config.js`** com o nome do seu repositório:
```js
base: '/seu-repositorio/'  // ou '/' se for root
```

2. **Atualize o `.env`** com a URL do backend deployado:
```env
VITE_API_URL=https://seu-backend.onrender.com/api
```

3. **Build e deploy:**
```bash
npm run build
```

4. **Configure o GitHub Pages:**
   - Vá em Settings → Pages
   - Source: `gh-pages` branch ou `/dist` folder
   - Ou use o comando:
   ```bash
   npm install -g gh-pages
   npm run deploy
   ```

5. **Atualize o CORS no backend** com a URL do GitHub Pages:
```js
origin: process.env.FRONTEND_URL || 'https://seu-usuario.github.io'
```

## 📚 Modelos de Dados

### User
- `name` - String (obrigatório)
- `email` - String (obrigatório, único)
- `password` - String (criptografada com bcrypt)
- `type` - String (enum: 'admin' ou 'client')

### Product
- `name` - String (obrigatório)
- `description` - String (obrigatório)
- `image` - String (URL da imagem)
- `price` - Number (obrigatório)
- `stock` - Number (obrigatório)
- `category` - String (obrigatório)

### Order
- `user` - ObjectId (referência ao User)
- `items` - Array de objetos (product, quantity, price)
- `totalAmount` - Number
- `status` - String (enum: 'pending', 'processing', 'shipped', 'delivered', 'cancelled')
- `shippingAddress` - Object

### Cart
- `user` - ObjectId (referência ao User, único)
- `items` - Array de objetos (product, quantity)

## 🔐 Rotas da API

### Usuários
- `POST /api/users/register` - Registrar usuário
- `POST /api/users/login` - Login
- `GET /api/users/profile` - Obter perfil (autenticado)
- `PUT /api/users/profile` - Atualizar perfil (autenticado)

### Produtos
- `GET /api/products` - Listar produtos (pode incluir query params: category, page, limit)
- `GET /api/products/search?q=termo` - Buscar produtos
- `GET /api/products/:id` - Obter produto por ID
- `POST /api/products` - Criar produto (admin)
- `PUT /api/products/:id` - Atualizar produto (admin)
- `DELETE /api/products/:id` - Deletar produto (admin)

### Carrinho
- `GET /api/cart` - Obter carrinho (autenticado)
- `POST /api/cart/add` - Adicionar ao carrinho (autenticado)
- `PUT /api/cart/update` - Atualizar item do carrinho (autenticado)
- `DELETE /api/cart/remove/:productId` - Remover do carrinho (autenticado)
- `DELETE /api/cart/clear` - Limpar carrinho (autenticado)

### Pedidos
- `POST /api/orders` - Criar pedido (autenticado)
- `GET /api/orders/my-orders` - Listar pedidos do usuário (autenticado)
- `GET /api/orders/all` - Listar todos os pedidos (admin)
- `PUT /api/orders/:id/status` - Atualizar status do pedido (admin)

## 🛠️ Tecnologias Utilizadas

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- cors
- express-validator
- dotenv

### Frontend
- React 18
- Vite
- React Router DOM
- Axios
- TailwindCSS
- React Hot Toast
- Context API

## 📝 Scripts Disponíveis

### Backend
- `npm run dev` - Inicia servidor em modo desenvolvimento (nodemon)
- `npm start` - Inicia servidor em modo produção

### Frontend
- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Gera build para produção
- `npm run preview` - Preview do build local
- `npm run deploy` - Deploy para GitHub Pages (requer gh-pages)

## 🎯 Próximos Passos (Opcional)

- [ ] Implementar upload de imagens (Cloudinary)
- [ ] Adicionar API de pagamento (Stripe sandbox)
- [ ] Painel admin com gráficos (Chart.js)
- [ ] Sistema de avaliações de produtos
- [ ] Cupons de desconto
- [ ] Histórico de navegação
- [ ] Wishlist

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

Desenvolvido Pedro p

