# 🔧 Guia de Troubleshooting - Problemas Comuns

## ❌ Problema: Não Consigo Adicionar Produtos no Painel Admin

### Possíveis Causas e Soluções

#### 1. **Usuário não é Admin**

**Sintoma:** Você vê o painel admin, mas ao tentar salvar um produto aparece erro "Acesso negado" ou 403.

**Solução:**
1. Acesse o **MongoDB Atlas**
2. Vá em **Clusters** → **Browse Collections**
3. Selecione o banco `suplementosbd`
4. Abra a coleção `users`
5. Encontre seu usuário (pelo email)
6. Clique em **Edit** (ícone de lápis)
7. Procure o campo `type`
8. Altere de `"client"` para `"admin"` (com aspas)
9. Clique em **Update**
10. **IMPORTANTE:** Faça logout e login novamente no site

**Verificação:**
- Após fazer login novamente, você deve ver seu nome no menu
- Se aparecer "Admin" no menu, está correto

---

#### 2. **Erro de CORS ou Conexão**

**Sintoma:** Erro ao salvar, aparece mensagem de erro no console do navegador.

**Solução:**
1. Abra o Console do navegador (F12 → Console)
2. Veja a mensagem de erro exata
3. Verifique se a URL da API está correta:
   - Na Vercel: `VITE_API_URL` deve ser `https://seu-backend.onrender.com` (sem `/api/`)
4. Teste a API diretamente:
   ```
   https://seu-backend.onrender.com/api/health
   ```
   Deve retornar: `{"status":"OK","message":"API is running"}`

---

#### 3. **Token Expirado ou Inválido**

**Sintoma:** Erro 401 (Não autorizado) ao tentar salvar.

**Solução:**
1. Faça logout
2. Faça login novamente
3. Tente adicionar produto novamente

---

#### 4. **Campos Obrigatórios Não Preenchidos**

**Sintoma:** Formulário não envia ou aparece erro de validação.

**Verifique se preencheu:**
- ✅ Nome do Produto
- ✅ Descrição
- ✅ Categoria
- ✅ Preço (número maior que 0)
- ✅ Estoque (número maior ou igual a 0)
- Imagem (opcional, mas recomendado)

---

#### 5. **Erro no Console do Navegador**

**Como verificar:**
1. Abra o Console (F12)
2. Tente adicionar um produto
3. Veja se aparece algum erro em vermelho
4. Copie a mensagem de erro completa
5. Verifique:
   - Se a URL da requisição está correta
   - Se o token está sendo enviado
   - Se há erro de CORS

---

## 🌐 Como Deixar o Site Público

### O site JÁ ESTÁ PÚBLICO! ✅

O site na **Vercel** já é público por padrão. Qualquer pessoa pode:
- ✅ Acessar o site
- ✅ Ver os produtos
- ✅ Se cadastrar
- ✅ Fazer compras

### O que você precisa garantir:

#### 1. **Verificar se o site está acessível:**
- Acesse a URL do seu site na Vercel
- Deve carregar normalmente
- Se não carregar, verifique os logs de deploy

#### 2. **Compartilhar a URL:**
- A URL é algo como: `https://ecommerce-fullstack2-0-xxxxx.vercel.app`
- Ou se você configurou domínio customizado
- Compartilhe essa URL com quem quiser acessar

#### 3. **Garantir que o backend está público:**
- O backend no **Render** também já é público
- Qualquer pessoa pode fazer requisições à API
- O CORS está configurado para aceitar requisições do frontend

### ⚠️ O que NÃO precisa fazer:

- ❌ Não precisa configurar nada na Vercel para tornar público (já é)
- ❌ Não precisa configurar nada no Render para tornar público (já é)
- ❌ O site não precisa de senha ou acesso restrito

### 🔒 Se quiser RESTRINGIR acesso (opcional):

Se por algum motivo você quiser restringir o acesso:

1. **Vercel:** Não tem opção nativa, precisaria implementar autenticação no frontend
2. **Render:** Não tem opção nativa para restringir acesso público

Mas para um e-commerce, você **QUER** que seja público!

---

## 📋 Checklist de Verificação

### Para Adicionar Produtos Funcionar:

- [ ] Usuário é admin (verificado no MongoDB)
- [ ] Fez logout e login após virar admin
- [ ] VITE_API_URL está configurada na Vercel
- [ ] Backend está rodando no Render (status "Live")
- [ ] FRONTEND_URL está configurada no Render
- [ ] Token está sendo enviado nas requisições
- [ ] Todos os campos obrigatórios estão preenchidos

### Para o Site Estar Público:

- [ ] Site carrega na URL da Vercel
- [ ] Qualquer pessoa pode acessar sem login
- [ ] Qualquer pessoa pode se cadastrar
- [ ] Backend responde na URL do Render

---

## 🆘 Ainda Não Funciona?

### Passos para Debug:

1. **Abra o Console do Navegador (F12)**
2. **Vá na aba Network**
3. **Tente adicionar um produto**
4. **Veja a requisição que falhou:**
   - Clique na requisição vermelha
   - Veja a aba "Headers" - a URL está correta?
   - Veja a aba "Response" - qual é a mensagem de erro?

### Informações para me passar:

1. Mensagem de erro exata (do console)
2. Status code da requisição (ex: 403, 401, 500)
3. URL da requisição que está sendo feita
4. Se você é admin (verificado no MongoDB)

---

## ✅ Exemplo de Produto para Teste

Se quiser testar, use estes dados:

```
Nome: Whey Protein 1kg
Categoria: Proteínas
Descrição: Proteína em pó de alta qualidade para ganho de massa muscular. Ideal para pós-treino.
Imagem: https://images.unsplash.com/photo-1556910103-2d5b2e5b5b5b?w=500
Preço: 99.90
Estoque: 50
```

---

**Última atualização:** 2024

