import React from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import * as ActionsCart from '../../store/modules/cart/actions';

import { formatPrice } from '../../util/format';

import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { Container, ProductTable, Total } from './styles';

function Cart({ cart, removeFromItemCart, updateAmountRequest, total }) {
  function handleIncrementAmount(product) {
    const amount = product.amount + 1;
    updateAmountRequest(product.id, amount);
  }

  function handleDecrementAmount(product) {
    const amount = product.amount - 1;
    updateAmountRequest(product.id, amount);
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th> QTD </th>
            <th> SUBTOTAL </th>
            <th />
          </tr>
        </thead>

        <tbody>
          {cart &&
            cart.map(item => (
              <tr>
                <td>
                  <img src={item.image} alt="Tênis" />
                </td>
                <td>
                  <strong> {item.title}</strong>
                  <span> {item.priceFormatted}</span>
                </td>

                <td>
                  <div>
                    <button type="button">
                      <MdRemoveCircleOutline
                        size={20}
                        color="#7159c1"
                        onClick={() => {
                          handleDecrementAmount(item);
                        }}
                      />
                    </button>
                    <input type="number" readOnly value={item.amount} />

                    <button type="button">
                      <MdAddCircleOutline
                        size={20}
                        color="#7159c1"
                        onClick={() => {
                          handleIncrementAmount(item);
                        }}
                      />
                    </button>
                  </div>
                </td>

                <td>
                  <strong> {item.subTotal}</strong>
                </td>

                <td>
                  <button
                    type="button"
                    onClick={() => {
                      removeFromItemCart(item.id);
                    }}
                  >
                    <MdDelete size={20} color="#7159c1" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button"> Finalizar pedido </button>
        <Total>
          <span> TOTAL </span>
          <strong> {total}</strong>
        </Total>
      </footer>
    </Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart.map(item => ({
    ...item,
    subTotal: formatPrice(item.price * item.amount),
  })),

  total: formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0)
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ActionsCart, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
