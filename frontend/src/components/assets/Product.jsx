import './Product.css';
import React from 'react';

function Product(props) {
  return (
    <div className='product'>
      <h1 className='name'>{props.name}</h1>
      <div className='image'>
        <img src={props.image} alt='Produto' />
      </div>
      <div className='price'>R$ {props.price}</div>
      <div className='buttons'>
        <button
          className='edit btn-select'
          onClick={() => props.edit(props.product)}
        >
          <i className={'fa fa-edit'}></i>
        </button>
        <button
          className='delete btn-select'
          onClick={() => props.remove(props.product)}
        >
          <i className={'fa fa-trash'}></i>
        </button>
      </div>
    </div>
  );
}

export default Product;
