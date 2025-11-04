# Backend API - E-commerce de Suplementos

API RESTful desenvolvida com Node.js, Express.js e MongoDB.

## 🚀 Início Rápido

### 1. Instalação

```bash
npm install
```

### 2. Configuração

Copie o arquivo `.env.example` para `.env` e configure as variáveis:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/suplementos
# ou MongoDB Atlas:
# MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/suplementos
JWT_SECRET=sua_chave_secreta_aqui
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 3. Executar

```bash
# Modo desenvolvimento (com nodemon)
npm run dev

# Modo produção
npm start
```

## 🌐 Deploy no Render

1. **Crie uma conta no [Render](https://render.com)**

2. **New → Web Service**

3. **Conecte seu repositório GitHub**

4. **Configure:**
   - **Name:** `suplementos-backend`
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Environment:** `Node`

5. **Adicione as variáveis de ambiente:**
   - `MONGO_URI` - URI do MongoDB (MongoDB Atlas recomendado)
   - `JWT_SECRET` - Chave secreta para JWT (gere uma chave forte)
   - `FRONTEND_URL` - URL do frontend no GitHub Pages
   - `NODE_ENV` - `production`
   - `PORT` - Render define automaticamente, mas pode ser `5000`

6. **Deploy!**

## 🌐 Deploy no Railway

1. **Crie uma conta no [Railway](https://railway.app)**

2. **New Project → Deploy from GitHub repo**

3. **Configure o Root Directory:**
   - Settings → Root Directory: `backend`

4. **Adicione as variáveis de ambiente** (mesmas do Render)

5. **Deploy!**

## 📦 Dependências

- `express` - Framework web
- `mongoose` - ODM para MongoDB
- `dotenv` - Gerenciamento de variáveis de ambiente
- `jsonwebtoken` - Autenticação JWT
- `bcryptjs` - Criptografia de senhas
- `cors` - Middleware CORS
- `express-validator` - Validação de dados

## 📚 Estrutura

```
backend/
├── config/          # Configurações (db.js)
├── controllers/     # Lógica de negócio
│   ├── userController.js
│   ├── productController.js
│   ├── orderController.js
│   └── cartController.js
├── middleware/      # Middlewares
│   └── auth.js      # Autenticação JWT
├── models/          # Modelos Mongoose
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
│   └── Cart.js
├── routes/          # Rotas da API
│   ├── userRoutes.js
│   ├── productRoutes.js
│   ├── orderRoutes.js
│   └── cartRoutes.js
├── server.js        # Arquivo principal
├── .env.example     # Exemplo de variáveis de ambiente
└── package.json
```

## 🔐 Rotas da API

### Autenticação
- `POST /api/users/register` - Registrar novo usuário
- `POST /api/users/login` - Login de usuário

### Produtos
- `GET /api/products` - Listar produtos
- `GET /api/products/:id` - Obter produto por ID
- `GET /api/products/search?q=termo` - Buscar produtos
- `POST /api/products` - Criar produto (admin)
- `PUT /api/products/:id` - Atualizar produto (admin)
- `DELETE /api/products/:id` - Deletar produto (admin)

### Carrinho (autenticado)
- `GET /api/cart` - Obter carrinho
- `POST /api/cart/add` - Adicionar ao carrinho
- `PUT /api/cart/update` - Atualizar item
- `DELETE /api/cart/remove/:productId` - Remover item
- `DELETE /api/cart/clear` - Limpar carrinho

### Pedidos (autenticado)
- `POST /api/orders` - Criar pedido
- `GET /api/orders/my-orders` - Meus pedidos
- `GET /api/orders/all` - Todos os pedidos (admin)
- `PUT /api/orders/:id/status` - Atualizar status (admin)

## 🔒 Middleware de Autenticação

Use o header `Authorization` com o token JWT:

```
Authorization: Bearer seu_token_jwt_aqui
```

## 📝 Exemplo de Uso

### Criar usuário admin (via MongoDB ou script)

```javascript
// No MongoDB, após criar um usuário, atualize:
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { type: "admin" } }
)
```

