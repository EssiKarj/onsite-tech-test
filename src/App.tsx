import React, { useState, useEffect } from 'react'
import Product from './components/Product';
import Basket from './components/Basket';
import getProducts from './utils/getProducts';

import './App.css';

//type for items required from mock data
type ProductItem = {
  id: number
  title: string
  image: string
  altText: string
  price: string
  quantity: number
}

//type for the state used to track different inputs across the page
type PageState = {
  loading: boolean
  productItems: ProductItem[]
  items: ProductItem[]
  totalPrice: string
}

class App extends React.Component {
  state: PageState;

  constructor(props: any) {
    super(props);

    this.state = {
      loading: false,
      productItems: [],
      items: [],
      totalPrice: '0',
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

  fetchProducts = async (): Promise<void> => {
    this.setState({ loading: true });

    await getProducts().then(products => {
      this.setState({ loading: false, productItems: products });
    });
  };

  calculateTotalPrice(items: ProductItem[]): string {
    let total = 0;

    items.forEach(item => {
      total += parseFloat(item.price) * item.quantity;
    });

    return total.toFixed(2);
  }

  addToBasket = (id: number): void => {
    const item = this.state.productItems.find(item => item.id === id);
    if (!item) return

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

  removeFromBasket = (id: number): void => {
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