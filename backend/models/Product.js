import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome do produto é obrigatório'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória']
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/300'
  },
  price: {
    type: Number,
    required: [true, 'Preço é obrigatório'],
    min: 0
  },
  stock: {
    type: Number,
    required: [true, 'Estoque é obrigatório'],
    min: 0,
    default: 0
  },
  category: {
    type: String,
    required: [true, 'Categoria é obrigatória'],
    trim: true
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;

