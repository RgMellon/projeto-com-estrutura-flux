import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { MdShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';

import api from '../../services/api';

import { ProductList } from './styles';

import * as ActionsCart from '../../store/modules/cart/actions';

class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('products');
    // força o reterno de um novo objeto
    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));
    this.setState({ products: data });
  }

  handleAddProduct = id => {
    const { addToCartRequest } = this.props;

    addToCartRequest(id);
  };

  render() {
    const { products } = this.state;
    const { amount } = this.props;

    return (
      <ProductList>
        {products.map(item => (
          <li key={String(item.id)}>
            <img src={item.image} alt="Tênis" />

            <strong> {item.title} </strong>
            <span> R$ {item.priceFormatted}</span>

            <button
              type="button"
              onClick={() => this.handleAddProduct(item.id)}
            >
              <div>
                <MdShoppingCart size={16} color="#FFF" /> {amount[item.id] || 0}
              </div>
              <span> ADICIONAR AO CARRINHO </span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ActionsCart, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
