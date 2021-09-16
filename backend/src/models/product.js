const imagesView = require('./imagesView');

class Product {
  constructor(id, name, price, images) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.images = imagesView.renderAll(images);
  }
}

module.exports = Product;
