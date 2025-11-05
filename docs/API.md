# 📚 Documentação Completa da API

## Base URL

```
Produção: https://seu-backend.onrender.com/api
Local: http://localhost:5000/api
```

## Autenticação

A maioria dos endpoints requer autenticação via JWT. Inclua o token no header:

```
Authorization: Bearer <seu_token_jwt>
```

O token é obtido através dos endpoints `/register` ou `/login`.

---

## 🔐 Endpoints de Usuários

### POST /api/users/register

Registra um novo usuário. **Não requer aprovação** - o usuário é criado automaticamente como `client`.

**Request:**
```http
POST /api/users/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Validações:**
- `name`: obrigatório, não vazio
- `email`: obrigatório, formato de email válido, único
- `password`: obrigatório, mínimo 6 caracteres

**Response 201 (Success):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzEyMzQ1Njc4OTBhYiIsImlhdCI6MTcwMzQ1Njc4OSwiZXhwIjoxNzA2MDQ4Nzg5fQ.abc123...",
  "user": {
    "id": "65c1234567890ab",
    "name": "João Silva",
    "email": "joao@email.com",
    "type": "client"
  }
}
```

**Response 400 (Email já cadastrado):**
```json
{
  "message": "Email já cadastrado"
}
```

---

### POST /api/users/login

Autentica um usuário existente.

**Request:**
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Validações:**
- `email`: obrigatório, formato de email válido
- `password`: obrigatório, não vazio

**Response 200 (Success):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65c1234567890ab",
    "name": "João Silva",
    "email": "joao@email.com",
    "type": "client"
  }
}
```

**Response 401 (Credenciais inválidas):**
```json
{
  "message": "Email ou senha inválidos"
}
```

---

### GET /api/users/profile

Obtém o perfil do usuário autenticado.

**Request:**
```http
GET /api/users/profile
Authorization: Bearer <token>
```

**Response 200 (Success):**
```json
{
  "_id": "65c1234567890ab",
  "name": "João Silva",
  "email": "joao@email.com",
  "type": "client",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Response 401 (Não autenticado):**
```json
{
  "message": "Token inválido ou expirado"
}
```

---

### PUT /api/users/profile

Atualiza o perfil do usuário autenticado.

**Request:**
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "João Silva Santos",
  "email": "novoemail@email.com"
}
```

**Validações:**
- `email`: se fornecido, deve ser único (não pode ser o mesmo de outro usuário)

**Response 200 (Success):**
```json
{
  "id": "65c1234567890ab",
  "name": "João Silva Santos",
  "email": "novoemail@email.com",
  "type": "client"
}
```

**Response 400 (Email já em uso):**
```json
{
  "message": "Email já cadastrado"
}
```

---

## 📦 Endpoints de Produtos

### GET /api/products

Lista todos os produtos ou filtra por categoria.

**Request:**
```http
GET /api/products
GET /api/products?category=Proteínas
```

**Query Parameters:**
- `category` (opcional): Filtrar produtos por categoria

**Response 200 (Success):**
```json
{
  "products": [
    {
      "_id": "65c1234567890ab",
      "name": "Whey Protein 1kg",
      "description": "Proteína em pó de alta qualidade para ganho de massa muscular",
      "image": "https://exemplo.com/imagem.jpg",
      "price": 99.90,
      "stock": 50,
      "category": "Proteínas",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### GET /api/products/search

Busca produtos por termo.

**Request:**
```http
GET /api/products/search?q=whey
```

**Query Parameters:**
- `q` (obrigatório): Termo de busca

**Response 200 (Success):**
```json
[
  {
    "_id": "65c1234567890ab",
    "name": "Whey Protein 1kg",
    "description": "...",
    "price": 99.90,
    "stock": 50,
    "category": "Proteínas"
  }
]
```

---

### GET /api/products/:id

Obtém um produto específico por ID.

**Request:**
```http
GET /api/products/65c1234567890ab
```

**Response 200 (Success):**
```json
{
  "_id": "65c1234567890ab",
  "name": "Whey Protein 1kg",
  "description": "Proteína em pó de alta qualidade",
  "image": "https://exemplo.com/imagem.jpg",
  "price": 99.90,
  "stock": 50,
  "category": "Proteínas",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Response 404 (Produto não encontrado):**
```json
{
  "message": "Produto não encontrado"
}
```

---

### POST /api/products

Cria um novo produto. **Apenas admin.**

**Request:**
```http
POST /api/products
Authorization: Bearer <token_admin>
Content-Type: application/json

{
  "name": "Whey Protein 1kg",
  "description": "Proteína em pó de alta qualidade para ganho de massa muscular",
  "image": "https://exemplo.com/imagem.jpg",
  "price": 99.90,
  "stock": 50,
  "category": "Proteínas"
}
```

**Validações:**
- `name`: obrigatório
- `description`: obrigatório
- `price`: obrigatório, número >= 0
- `stock`: obrigatório, número >= 0
- `category`: obrigatório
- `image`: opcional (URL)

**Response 201 (Success):**
```json
{
  "_id": "65c1234567890ab",
  "name": "Whey Protein 1kg",
  "description": "...",
  "image": "https://exemplo.com/imagem.jpg",
  "price": 99.90,
  "stock": 50,
  "category": "Proteínas",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Response 403 (Não autorizado):**
```json
{
  "message": "Acesso negado. Apenas administradores."
}
```

---

### PUT /api/products/:id

Atualiza um produto existente. **Apenas admin.**

**Request:**
```http
PUT /api/products/65c1234567890ab
Authorization: Bearer <token_admin>
Content-Type: application/json

{
  "name": "Whey Protein 2kg",
  "price": 179.90,
  "stock": 30
}
```

**Response 200 (Success):** Produto atualizado

**Response 404 (Produto não encontrado):**
```json
{
  "message": "Produto não encontrado"
}
```

---

### DELETE /api/products/:id

Deleta um produto. **Apenas admin.**

**Request:**
```http
DELETE /api/products/65c1234567890ab
Authorization: Bearer <token_admin>
```

**Response 200 (Success):**
```json
{
  "message": "Produto deletado com sucesso"
}
```

---

## 🛒 Endpoints de Carrinho

### GET /api/cart

Obtém o carrinho do usuário autenticado.

**Request:**
```http
GET /api/cart
Authorization: Bearer <token>
```

**Response 200 (Success):**
```json
{
  "_id": "65c1234567890ab",
  "user": "65c1234567890cd",
  "items": [
    {
      "product": {
        "_id": "65c1234567890ef",
        "name": "Whey Protein 1kg",
        "price": 99.90
      },
      "quantity": 2
    }
  ]
}
```

**Response 200 (Carrinho vazio):**
```json
{
  "_id": "65c1234567890ab",
  "user": "65c1234567890cd",
  "items": []
}
```

---

### POST /api/cart/add

Adiciona um produto ao carrinho.

**Request:**
```http
POST /api/cart/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "65c1234567890ef",
  "quantity": 2
}
```

**Validações:**
- `productId`: obrigatório, ID válido de produto
- `quantity`: obrigatório, número > 0

**Response 200 (Success):** Carrinho atualizado

**Response 404 (Produto não encontrado):**
```json
{
  "message": "Produto não encontrado"
}
```

---

### PUT /api/cart/update

Atualiza a quantidade de um item no carrinho.

**Request:**
```http
PUT /api/cart/update
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "65c1234567890ef",
  "quantity": 3
}
```

**Response 200 (Success):** Carrinho atualizado

---

### DELETE /api/cart/remove/:productId

Remove um produto do carrinho.

**Request:**
```http
DELETE /api/cart/remove/65c1234567890ef
Authorization: Bearer <token>
```

**Response 200 (Success):** Carrinho atualizado

---

### DELETE /api/cart/clear

Limpa todo o carrinho.

**Request:**
```http
DELETE /api/cart/clear
Authorization: Bearer <token>
```

**Response 200 (Success):**
```json
{
  "message": "Carrinho limpo"
}
```

---

## 📋 Endpoints de Pedidos

### POST /api/orders

Cria um novo pedido a partir do carrinho.

**Request:**
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "shippingAddress": {
    "street": "Rua das Flores, 123",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "01234-567"
  }
}
```

**Validações:**
- Carrinho não pode estar vazio
- `shippingAddress`: obrigatório

**Response 201 (Success):**
```json
{
  "_id": "65c1234567890gh",
  "user": "65c1234567890cd",
  "items": [
    {
      "product": {
        "_id": "65c1234567890ef",
        "name": "Whey Protein 1kg",
        "price": 99.90
      },
      "quantity": 2,
      "price": 99.90
    }
  ],
  "totalAmount": 199.80,
  "status": "pending",
  "shippingAddress": {
    "street": "Rua das Flores, 123",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "01234-567"
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Response 400 (Carrinho vazio):**
```json
{
  "message": "Carrinho vazio"
}
```

---

### GET /api/orders/my-orders

Lista todos os pedidos do usuário autenticado.

**Request:**
```http
GET /api/orders/my-orders
Authorization: Bearer <token>
```

**Response 200 (Success):**
```json
[
  {
    "_id": "65c1234567890gh",
    "items": [...],
    "totalAmount": 199.80,
    "status": "pending",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### GET /api/orders/all

Lista todos os pedidos de todos os usuários. **Apenas admin.**

**Request:**
```http
GET /api/orders/all
Authorization: Bearer <token_admin>
```

**Response 200 (Success):** Array de pedidos

---

### PUT /api/orders/:id/status

Atualiza o status de um pedido. **Apenas admin.**

**Request:**
```http
PUT /api/orders/65c1234567890gh/status
Authorization: Bearer <token_admin>
Content-Type: application/json

{
  "status": "processing"
}
```

**Status possíveis:**
- `pending` - Pendente
- `processing` - Processando
- `shipped` - Enviado
- `delivered` - Entregue
- `cancelled` - Cancelado

**Response 200 (Success):**
```json
{
  "_id": "65c1234567890gh",
  "status": "processing",
  ...
}
```

---

## 🔍 Health Check

### GET /api/health

Verifica se a API está funcionando.

**Request:**
```http
GET /api/health
```

**Response 200 (Success):**
```json
{
  "status": "OK",
  "message": "API is running"
}
```

---

## 📊 Códigos de Status HTTP

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Erro de validação ou requisição inválida
- `401` - Não autenticado
- `403` - Não autorizado (sem permissão)
- `404` - Recurso não encontrado
- `500` - Erro interno do servidor

---

## 🔒 Segurança

### Headers Recomendados

```http
Content-Type: application/json
Authorization: Bearer <token>
```

### Validação de Token

O token JWT expira em 30 dias. Após expirar, o usuário precisa fazer login novamente.

### Permissões

- **Client:** Pode acessar produtos, carrinho e criar pedidos
- **Admin:** Pode fazer tudo que client faz + gerenciar produtos e pedidos

---

## 📝 Exemplos de Uso

### Exemplo: Fluxo Completo de Compra

```javascript
// 1. Registrar usuário
POST /api/users/register
{
  "name": "João",
  "email": "joao@email.com",
  "password": "senha123"
}
// Retorna: token

// 2. Buscar produtos
GET /api/products

// 3. Adicionar ao carrinho
POST /api/cart/add
Authorization: Bearer <token>
{
  "productId": "65c1234567890ef",
  "quantity": 2
}

// 4. Ver carrinho
GET /api/cart
Authorization: Bearer <token>

// 5. Criar pedido
POST /api/orders
Authorization: Bearer <token>
{
  "shippingAddress": {
    "street": "Rua das Flores, 123",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "01234-567"
  }
}
```

---

**Última atualização:** 2024

