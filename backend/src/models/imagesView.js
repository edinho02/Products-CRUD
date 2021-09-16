function render(image) {
  return {
    url: `http://localhost:3033/uploads/${image.path}`,
  };
}

function renderAll(images) {
  return images.map(image => this.render(image));
}

module.exports = {
  render,
  renderAll,
};
