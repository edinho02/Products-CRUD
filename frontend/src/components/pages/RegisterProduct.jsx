import './RegisterProduct.css';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';

import Main from '../template/Main';

import { baseUrl } from '../../consts';

const incialProductState = {
  id: false,
  name: '',
  price: '',
  images: false,
  redirectToHome: false,
};

class RegisterProduct extends Component {
  state = { ...incialProductState };

  componentDidMount() {
    const product = this.props.routeData.location.state;
    if (product && product.id) {
      this.setState({ ...product });
    }
  }

  saveProduct() {
    const oldProduct = this.props.routeData.location.state;
    let redirectToHome = false;
    if (oldProduct && oldProduct.id) {
      redirectToHome = true;
    }

    const formData = new FormData();

    formData.append('name', this.state.name);
    formData.append('price', this.state.price);
    if (this.state.images.size > 0)
      formData.append('images', this.state.images, this.state.images.name);

    const method = this.state.id ? 'put' : 'post';
    const url = this.state.id
      ? `${baseUrl}/product/${this.state.id}`
      : `${baseUrl}/new-product`;

    axios[method](url, formData).then(resp => {
      this.setState({ ...incialProductState, redirectToHome });
    });
  }

  updateField(event) {
    const product = { ...this.state };
    product[event.target.name] = event.target.value;
    this.setState({ ...product });
  }

  onFileChange(event) {
    this.setState({ images: event.target.files[0] });
  }

  renderProductPage() {
    if (this.state.redirectToHome) {
      return <Redirect to='/' />;
    }

    return (
      <div className='new-product'>
        <div className='name'>
          <label htmlFor='name-input' className='name-label'>
            Nome do Produto
          </label>
          <input
            type='text'
            name='name'
            value={this.state.name}
            onChange={e => this.updateField(e)}
            id='name-input'
          />
        </div>
        <div className='price'>
          <label htmlFor='price-input' className='price-label'>
            Preço do Produto
          </label>
          <input
            type='text'
            name='price'
            value={this.state.price}
            onChange={e => this.updateField(e)}
            id='price-input'
          />
        </div>
        <div className='image'>
          <label htmlFor='image-input' className='image-label'>
            Imagem
          </label>
          <input
            type='file'
            name='image'
            onChange={e => this.onFileChange(e)}
            id='image-input'
          />
        </div>
        <button className='plus-btn' onClick={e => this.saveProduct(e)}>
          <i className={'fa fa-plus'}></i>
        </button>
      </div>
    );
  }

  render() {
    return (
      <Main title='Cadastrar novo produto'>{this.renderProductPage()}</Main>
    );
  }
}

export default RegisterProduct;
