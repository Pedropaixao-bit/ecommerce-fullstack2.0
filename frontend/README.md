# Frontend - E-commerce de Suplementos

Interface React.js desenvolvida com Vite, TailwindCSS e React Router.

## 🚀 Início Rápido

### 1. Instalação

```bash
npm install
```

### 2. Configuração

Copie o arquivo `.env.example` para `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Para produção, use a URL do backend deployado:
```env
VITE_API_URL=https://seu-backend.onrender.com/api
```

### 3. Executar

```bash
# Modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 🌐 Deploy no GitHub Pages

### 1. Configure o `vite.config.js`

Atualize o `base` com o nome do seu repositório:

```js
export default defineConfig({
  plugins: [react()],
  base: '/seu-repositorio/',  // ou '/' se for root
  // ...
});
```

### 2. Atualize o `.env` com a URL do backend deployado

```env
VITE_API_URL=https://seu-backend.onrender.com/api
```

### 3. Build e Deploy

**Opção 1: Usando gh-pages**

```bash
# Instale gh-pages globalmente (se ainda não tiver)
npm install -g gh-pages

# Deploy
npm run deploy
```

**Opção 2: Manual**

```bash
# Build
npm run build

# Commit a pasta dist
git add dist
git commit -m "Deploy frontend"
git subtree push --prefix dist origin gh-pages
```

**Opção 3: GitHub Actions**

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
        working-directory: ./frontend
      
      - name: Build
        run: npm run build
        working-directory: ./frontend
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./frontend/dist
```

### 4. Configure o GitHub Pages

1. Vá em **Settings → Pages**
2. **Source:** `gh-pages` branch ou `/dist` folder
3. Salve

### 5. Acesse

Seu site estará disponível em:
```
https://seu-usuario.github.io/seu-repositorio/
```

## 📦 Páginas

- **/** - Home (lista de produtos)
- **/product/:id** - Detalhes do produto
- **/cart** - Carrinho de compras
- **/login** - Login
- **/register** - Cadastro
- **/checkout** - Checkout (autenticado)
- **/profile** - Perfil do usuário (autenticado)
- **/admin** - Painel admin (admin only)

## 🎨 Componentes

- `Navbar` - Navegação principal
- `Footer` - Rodapé
- `ProductCard` - Card de produto
- `Loader` - Indicador de carregamento
- `ProtectedRoute` - Proteção de rotas

## 📚 Context API

- `AuthContext` - Gerenciamento de autenticação
- `CartContext` - Gerenciamento do carrinho

## 🛠️ Tecnologias

- React 18
- Vite
- React Router DOM
- TailwindCSS
- Axios
- React Hot Toast

## 📝 Scripts

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview do build
- `npm run deploy` - Deploy para GitHub Pages (requer gh-pages)

## ⚙️ Configuração do Build

O build está configurado para funcionar com GitHub Pages através do `vite.config.js`:

```js
base: '/seu-repositorio/'  // Ajuste conforme necessário
```

## 🔧 Troubleshooting

### Build não funciona no GitHub Pages

1. Verifique se o `base` no `vite.config.js` está correto
2. Verifique se a URL da API está correta no `.env`
3. Certifique-se de que o build foi gerado corretamente

### CORS errors

Certifique-se de que o backend está configurado para aceitar requisições do domínio do GitHub Pages:

```js
// backend/server.js
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://seu-usuario.github.io',
  credentials: true
}));
```

