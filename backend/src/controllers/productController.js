const { db } = require('../database/db');
const Product = require('../models/product');
const uniqid = require('uniqid');

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const unlinkAsync = promisify(fs.unlink);

const addProduct = async (req, res) => {
  try {
    const productId = uniqid();

    const { name, price } = req.body;
    const requestImages = req.files;
    let images = [];

    if (requestImages.length) {
      images = requestImages.map(img => {
        return {
          default: false,
          path: img.filename,
        };
      });
    } else {
      images.push({
        default: true,
        path: 'default-image.jpg',
      });
    }

    const productsData = {
      name,
      price,
      images,
    };

    await db.collection('products').doc(productId).set(productsData);

    res.status(201).send(productsData);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const listAllProducts = async (req, res) => {
  try {
    const products = await db.collection('products');
    const data = await products.get();
    const productsArray = [];
    if (data.empty) {
      res.status(404).send('No product found');
    } else {
      data.forEach(doc => {
        const student = new Product(
          doc.id,
          doc.data().name,
          doc.data().price,
          doc.data().images
        );
        productsArray.push(student);
      });
      res.send(productsArray);
    }
  } catch (err) {
    res.status(err.status).send(err.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const product = db.collection('products').doc(id);
    const productDoc = await product.get();
    const oldProduct = {
      name: productDoc.data().name,
      price: productDoc.data().price,
      images: productDoc.data().images,
    };

    const { name, price } = req.body;
    const requestImages = req.files;

    const newProduct = {
      name: name ? name : oldProduct.name,
      price: price ? price : oldProduct.price,
      images: requestImages.length ? [] : oldProduct.images,
    };

    if (requestImages.length) {
      const imagesPath = oldProduct.images
        .filter(img => !img.default)
        .map(img => img.path);

      imagesPath.forEach(imgPath => {
        const fullPath = path.join(__dirname, '..', '..', 'uploads', imgPath);

        unlinkAsync(fullPath);
      });

      newProduct.images = requestImages.map(img => {
        return {
          default: false,
          path: img.filename,
        };
      });
    }

    const newData = {
      name: newProduct.name,
      price: newProduct.price,
      images: newProduct.images,
    };

    await product.update(newData);

    res.send(newData);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const productData = await db.collection('products').doc(id).get();
    const imagesPath = productData
      .data()
      .images.filter(img => !img.default)
      .map(img => img.path);

    imagesPath.forEach(imgPath => {
      const fullPath = path.join(__dirname, '..', '..', 'uploads', imgPath);

      unlinkAsync(fullPath);
    });

    await db.collection('products').doc(id).delete();

    res.send('Product deleted successfully!');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {
  addProduct,
  listAllProducts,
  updateProduct,
  deleteProduct,
};
