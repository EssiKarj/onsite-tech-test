import React, { Component } from 'react';
import Product from './components/Product';
import Basket from './components/Basket';
import getProducts from './utils/getProducts';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      productItems: [],
      items: [],
      totalPrice: 0,
    };
  }

  async componentDidMount() {
    await this.fetchProducts();
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  fetchProducts = async () => {
    this.setState({ loading: true });

    await getProducts().then(products => {
      this.setState({ loading: false, productItems: products });
    });
  };

  calculateTotalPrice(items) {
    let total = 0;

    items.forEach(item => {
      total += parseFloat(item.price, 10) * item.quantity;
    });

    return +total.toFixed(2);
  }

  addToBasket = id => {
    const item = this.state.productItems.find(item => item.id === id);
    const newItemsArray = this.state.items.slice();
    const matchingItem = newItemsArray.find(basketItem => basketItem.id === item.id);

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      item.quantity = 1;
      newItemsArray.push(item);
    }

    const newTotalPrice = this.calculateTotalPrice(newItemsArray);
    this.setState({
      items: newItemsArray,
      totalPrice: newTotalPrice,
    });
  };

  // TODO
  removeFromBasket = id => {
    //filters the items array by only taking items that does not match id of the removed items
    const updatedItemsArray = this.state.items.filter(item => item.id !== id)

    //calculates new total with updated items array
    const updatedTotalPrice = this.calculateTotalPrice(updatedItemsArray)

    //sets state with the updated items array and total price
    this.setState({
      items: updatedItemsArray,
      totalPrice: updatedTotalPrice,
    })
  };

  render() {
    const { loading, productItems, items, totalPrice } = this.state;
    return (
      <div className="App">
        <div>
          <section className="main">
            <section className="product_summary_collection">
              {!loading ? (
                productItems.map(product => {
                  return <Product productData={product} add={this.addToBasket} key={product.id} />;
                })
              ) : (
                <div className="spinner" />
              )}
            </section>

            <Basket
              items={items}
              totalPrice={totalPrice}
              removeFromBasket={this.removeFromBasket}
            />
          </section>
        </div>
      </div>
    );
  }
}

export default App;
