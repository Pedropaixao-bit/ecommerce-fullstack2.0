# 🚀 Guia Completo de Deploy

Este guia explica passo a passo como fazer o deploy do e-commerce de suplementos na Vercel (frontend) e Render (backend).

## 📋 Pré-requisitos

- Conta no [GitHub](https://github.com)
- Conta no [Vercel](https://vercel.com) (gratuita)
- Conta no [Render](https://render.com) (gratuita)
- Conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (gratuita)

---

## 🗄️ Passo 1: Configurar MongoDB Atlas

### 1.1 Criar Conta e Cluster

1. Acesse [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Clique em "Try Free"
3. Crie uma conta ou faça login
4. Clique em "Build a Database"
5. Escolha o plano **FREE (M0)**
6. Escolha um provedor e região (ex: AWS, São Paulo)
7. Dê um nome ao cluster (ex: `suplementos-cluster`)
8. Clique em "Create Deployment"

### 1.2 Criar Usuário do Banco

1. Vá em **Database Access** → **Add New Database User**
2. Escolha método: "Password"
3. Crie um username (ex: `adminapp`)
4. Gere uma senha forte e **GUARDE-A**
5. Permissões: "Read and write to any database"
6. Clique em "Add User"

### 1.3 Configurar Network Access

1. Vá em **Network Access** → **Add IP Address**
2. Clique em **"Allow Access from Anywhere"** (`0.0.0.0/0`)
3. Clique em "Confirm"

### 1.4 Obter Connection String

1. Vá em **Clusters** → Clique em **"Connect"**
2. Escolha **"Drivers"**
3. Copie a connection string (parece com):
   ```
   mongodb+srv://adminapp:<password>@suplementos-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Substitua `<password>` pela senha que você criou
5. Substitua `<db>` (ou adicione após `.net/`) pelo nome do banco (ex: `suplementosbd`)
6. String final:
   ```
   mongodb+srv://adminapp:SUA_SENHA@suplementos-cluster.xxxxx.mongodb.net/suplementosbd?retryWrites=true&w=majority
   ```
7. **GUARDE essa string** - você vai precisar no Render

---

## ⚙️ Passo 2: Deploy do Backend no Render

### 2.1 Criar Conta no Render

1. Acesse [render.com](https://render.com)
2. Clique em "Get Started for Free"
3. Faça login com GitHub

### 2.2 Criar Web Service

1. No dashboard, clique em **"New +"** → **"Web Service"**
2. Conecte seu repositório GitHub
3. Selecione o repositório `ecommerce-fullstack2.0`
4. Configure:
   - **Name:** `ecommerce-backend` (ou o nome que preferir)
   - **Region:** Escolha a mais próxima (ex: São Paulo)
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

### 2.3 Configurar Environment Variables

Na seção **"Environment"**, adicione:

```
MONGO_URI=mongodb+srv://adminapp:SUA_SENHA@suplementos-cluster.xxxxx.mongodb.net/suplementosbd?retryWrites=true&w=majority
```

```
JWT_SECRET=a3f1c9d27b8e4a6f0c2d5e7a9b1f3d8ce4a6c2b15f7a0d3ec9b8a1f26e4d3c2b
```
*(Use o botão "Generate" do Render ou gere uma chave aleatória)*

```
NODE_ENV=production
```

```
FRONTEND_URL=https://seu-site.vercel.app
```
*(Você vai atualizar isso depois que fizer deploy do frontend)*

### 2.4 Configurar Health Check

Na seção **"Advanced"**:
- **Health Check Path:** `/api/health`

### 2.5 Deploy

1. Clique em **"Create Web Service"**
2. Aguarde o deploy (pode levar 2-5 minutos)
3. Quando estiver "Live", copie a URL (ex: `https://ecommerce-backend.onrender.com`)

### 2.6 Testar o Backend

Abra no navegador:
```
https://seu-backend.onrender.com/api/health
```

Deve retornar:
```json
{
  "status": "OK",
  "message": "API is running"
}
```

---

## 🎨 Passo 3: Deploy do Frontend na Vercel

### 3.1 Criar Conta na Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Sign Up"
3. Faça login com GitHub

### 3.2 Importar Projeto

1. No dashboard, clique em **"Add New..."** → **"Project"**
2. Selecione o repositório `ecommerce-fullstack2.0`
3. Clique em **"Import"**

### 3.3 Configurar Projeto

Na tela de configuração:

- **Framework Preset:** `Vite`
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm ci` (ou deixe automático)

### 3.4 Configurar Environment Variables

Na seção **"Environment Variables"**, adicione:

```
VITE_API_URL=https://seu-backend.onrender.com
```

**⚠️ IMPORTANTE:** 
- Use a URL do Render sem `/api/` no final
- Exemplo: `https://ecommerce-backend.onrender.com`
- **NÃO** use: `https://ecommerce-backend.onrender.com/api`

### 3.5 Deploy

1. Clique em **"Deploy"**
2. Aguarde o build (1-3 minutos)
3. Quando terminar, você terá uma URL (ex: `https://ecommerce-fullstack2-0.vercel.app`)

### 3.6 Atualizar FRONTEND_URL no Render

1. Volte ao Render → Seu Web Service → Environment
2. Atualize `FRONTEND_URL` com a URL da Vercel:
   ```
   FRONTEND_URL=https://ecommerce-fullstack2-0.vercel.app
   ```
3. Clique em **"Save Changes"**
4. O Render vai fazer redeploy automaticamente

### 3.7 Redeploy do Frontend

1. Na Vercel, vá em **Deployments**
2. Clique nos três pontos do último deployment
3. Selecione **"Redeploy"**
4. Aguarde o build terminar

---

## ✅ Passo 4: Verificação Final

### 4.1 Testar o Site

1. Acesse sua URL da Vercel
2. Verifique se a página carrega
3. Abra o Console do navegador (F12)
4. Verifique se não há erros de CORS ou conexão

### 4.2 Testar Funcionalidades

1. **Cadastro:**
   - Acesse `/register`
   - Crie uma conta
   - Deve funcionar sem necessidade de aprovação

2. **Login:**
   - Faça login com a conta criada
   - Deve funcionar normalmente

3. **Produtos:**
   - Acesse a home
   - Os produtos devem carregar (se houver produtos cadastrados)

4. **Carrinho:**
   - Faça login
   - Adicione produtos ao carrinho
   - Verifique se funciona

### 4.3 Criar Primeiro Admin

Para criar um usuário admin:

1. Acesse o MongoDB Atlas
2. Vá em **Clusters** → **"Browse Collections"**
3. Escolha o banco `suplementosbd`
4. Abra a coleção `users`
5. Encontre o documento do usuário que você criou
6. Edite o campo `type` de `"client"` para `"admin"`
7. Clique em **"Update"**
8. Faça logout e login novamente no site
9. Agora você verá o menu "Admin"

---

## 🔧 Troubleshooting

### Erro: "Erro ao carregar produtos"

**Solução:**
1. Verifique se `VITE_API_URL` na Vercel está correta (sem `/api/`)
2. Teste a API diretamente: `https://seu-backend.onrender.com/api/health`
3. Verifique os logs no Render (Logs tab)

### Erro de CORS

**Solução:**
1. Confirme que `FRONTEND_URL` no Render está correto
2. Deve ser exatamente a URL da Vercel (sem `/` no final)
3. Faça redeploy do backend após atualizar

### Build falha na Vercel

**Solução:**
1. Verifique se Root Directory está como `frontend`
2. Confirme que `package.json` está na pasta `frontend`
3. Veja os logs de build para identificar o erro

### Backend não inicia no Render

**Solução:**
1. Verifique se `MONGO_URI` está correto (com senha substituída)
2. Confirme que `JWT_SECRET` está definido
3. Veja os logs no Render para identificar o erro

### MongoDB Connection Error

**Solução:**
1. Verifique se o IP `0.0.0.0/0` está permitido no Network Access
2. Confirme que a senha na connection string está correta
3. Verifique se o nome do banco está correto na URI

---

## 📊 Monitoramento

### Render

- **Logs:** Acesse seu Web Service → Aba "Logs"
- **Metrics:** Veja CPU, memória e requisições
- **Events:** Acompanhe deploys e eventos

### Vercel

- **Deployments:** Veja histórico de deploys
- **Analytics:** Configure analytics (pago)
- **Logs:** Veja logs de build e runtime

### MongoDB Atlas

- **Metrics:** Monitore conexões e operações
- **Alerts:** Configure alertas (pago)
- **Backups:** Backups automáticos (pago)

---

## 🔄 Atualizações Futuras

### Para atualizar o código:

1. Faça commit e push para o GitHub:
   ```bash
   git add .
   git commit -m "Atualização"
   git push origin main
   ```

2. **Render:** Deploy automático (se configurado)
3. **Vercel:** Deploy automático (se configurado)

### Para fazer deploy manual:

**Render:**
- Web Service → Menu → "Manual Deploy" → "Deploy latest commit"

**Vercel:**
- Deployments → "Redeploy"

---

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs no Render e Vercel
2. Teste a API diretamente no navegador
3. Verifique as variáveis de ambiente
4. Consulte a documentação oficial:
   - [Render Docs](https://render.com/docs)
   - [Vercel Docs](https://vercel.com/docs)
   - [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)

---

**Última atualização:** 2024

