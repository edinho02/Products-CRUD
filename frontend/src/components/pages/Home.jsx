import './Home.css';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';

import Main from '../template/Main';
import Product from '../assets/Product';

import { baseUrl } from '../../consts';

const incialState = {
  editProduct: false,
  product: {
    id: false,
    name: '',
    price: '',
  },
  list: [],
};

export default class Home extends Component {
  state = { ...incialState };

  constructor(props) {
    super(props);

    this.getUpdatedList = this.getUpdatedList.bind(this);
    this.remove = this.remove.bind(this);
    this.edit = this.edit.bind(this);
  }

  componentDidMount() {
    axios(`${baseUrl}/products`).then(resp => {
      this.setState({ list: resp.data });
    });
  }

  getUpdatedList(product, add = true) {
    const list = this.state.list.filter(u => u.id !== product.id);
    if (add) list.unshift(product);
    return list;
  }

  remove(product) {
    axios.delete(`${baseUrl}/product/${product.id}`).then(resp => {
      const list = this.getUpdatedList(product, false);
      this.setState({ list });
    });
  }

  edit(product) {
    this.setState({ editProduct: true, product });
  }

  renderProducts() {
    const list = this.state.list;

    if (list.length > 0) {
      return this.state.list.map(product => {
        return (
          <Product
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.images[0].url}
            product={product}
            remove={this.remove}
            edit={this.edit}
          />
        );
      });
    } else {
      return (
        <div className='alert'>Não foram encontrados produtos cadastrados!</div>
      );
    }
  }

  renderHome() {
    if (this.state.editProduct) {
      return (
        <Redirect
          from='*'
          to={{
            pathname: '/product',
            state: { ...this.state.product },
          }}
        />
      );
    }

    return (
      <React.Fragment>
        <form className='search-bar disabled'>
          <input
            type='text'
            placeholder='Buscar produto...'
            className='bar'
          ></input>
          <button className='search-btn btn-select'>
            <i className={'fa fa-search'}></i>
          </button>
        </form>
        <div className='products'>{this.renderProducts()}</div>
      </React.Fragment>
    );
  }

  render() {
    return <Main title='Produtos Cadastrados'>{this.renderHome()}</Main>;
  }
}
