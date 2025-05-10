const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Array en memoria para almacenar los productos
let products = [
  { id: 1, name: "Laptop", price: 1000, category: "Electronics", description: "A high performance laptop" },
  { id: 2, name: "Coffee Mug", price: 10, category: "Kitchenware", description: "A ceramic coffee mug" }
];

// Obtener la lista de productos
app.get('/products', (req, res) => {
  res.status(200).json(products);
});

// Obtener un producto por su ID
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }
  res.status(200).json(product);
});

// Agregar un nuevo producto
app.post('/products', (req, res) => {
  const { name, price, category, description } = req.body;

  // Validaciones
  if (!name || !price || !category || !description || price <= 0) {
    return res.status(400).json({ message: "Datos inválidos" });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    category,
    description
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Actualizar un producto existente
app.put('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));

  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  const { name, price, category, description } = req.body;

  if (!name || !price || !category || !description || price <= 0) {
    return res.status(400).json({ message: "Datos inválidos" });
  }

  product.name = name;
  product.price = price;
  product.category = category;
  product.description = description;

  res.status(200).json(product);
});

// Eliminar un producto por su ID
app.delete('/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));

  if (productIndex === -1) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  products.splice(productIndex, 1);
  res.status(204).send();
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
