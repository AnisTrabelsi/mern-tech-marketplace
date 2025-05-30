import Product from '../models/Product.js';

export async function listProducts(req, res) {
  const { page = 1, limit = 20, search = '', category } = req.query;
  const filter = {
    name: new RegExp(search, 'i'),
    ...(category ? { category } : {})
  };
  const products = await Product.find(filter)
    .skip((page - 1) * limit)
    .limit(+limit)
    .sort({ createdAt: -1 });
  const total = await Product.countDocuments(filter);
  res.json({ products, total });
}

export async function getProduct(req, res) {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ error: 'Produit non trouvé' });
  res.json(p);
}

export async function createProduct(req, res) {
  try {
    console.log('REQ.BODY', req.body);
    console.log('REQ.FILE', req.file);
    if (req.file) {
      req.body.imageUrl = `/uploads/${req.file.filename}`;
    }
    const newP = await Product.create(req.body);
    res.status(201).json(newP);
  } catch (err) {
    console.error('Create error:', err);
    res.status(400).json({ error: err.message });
  }
}

export async function updateProduct(req, res) {
  try {
    if (req.file) {
      req.body.imageUrl = `/uploads/${req.file.filename}`;
    }
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Produit non trouvé' });
    res.json(updated);
  } catch (err) {
    console.error('Update error:', err);
    res.status(400).json({ error: err.message });
  }
}

export async function deleteProduct(req, res) {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Produit supprimé' });
}
