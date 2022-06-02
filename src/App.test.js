import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, mount } from 'enzyme'
import Product from './components/Product';
import Basket from './components/Basket'
import getProducts from './utils/getProducts'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('testing "addToBasket" through click simulation', () => {
  it('should update the basket with 1(first) item', async () => {
    const wrapper = shallow(<App />)
    const instance = wrapper.instance()

    // need to await componentDidMount so that promise resolves before testing the component
    await instance.componentDidMount()

    // grabbing first Product and finding the "a" tag 
    const button = wrapper.find(Product).first().dive().find('a')

    button.simulate('click')

    // checking state has updated with the correct item
    expect(wrapper.state('items')[0]['id']).toBe(1)
    expect(wrapper.state('items')[0]['quantity']).toBe(1)
  })

  it('should update the total of the basket to 45.00', async () => {
    const wrapper = shallow(<App />)
    const instance = wrapper.instance()

    // need to await componentDidMount so that promise resolves before testing the component
    await instance.componentDidMount()

    // grabbing first Product and finding the "a" tag 
    const button = wrapper.find(Product).first().dive().find('a')

    button.simulate('click')

    //checking the totalPrice has updated with the correct total
    expect(wrapper.state('totalPrice')).toBe(45.00)
  })

  it('should update the basket with both items => 2 items', async () => {
    const wrapper = shallow(<App />)
    const instance = wrapper.instance()

    // need to await componentDidMount so that promise resolves before testing the component
    await instance.componentDidMount()

    //find "a" tag in products and simulate click for each one
    wrapper.find(Product).forEach(node => node.dive().find('a').simulate('click'))

    expect(wrapper.state('items')).toHaveLength(2) //check if items array has the length of two
    expect(wrapper.state('items')[0]['id']).toBe(1) //check if first item has an ID of 1 => cufflinks
    expect(wrapper.state('items')[1]['id']).toBe(2) //check if first item has an ID of 2 => tshirt
  })

  it('should update the price the total of the basket to 64.95', async () => {
    const wrapper = shallow(<App />)
    const instance = wrapper.instance()

    // need to await componentDidMount so that promise resolves before testing the component
    await instance.componentDidMount()

    //find "a" tag in products and simulate click for each one
    wrapper.find(Product).forEach(node => node.dive().find('a').simulate('click'))

    expect(wrapper.state('totalPrice')).toBe(64.95)
  })
})

describe('testing "removeFromBasket" through click simulation', () => {
  it('should remove items from a basket when there is  only one item', async () => {
    const wrapper = shallow(<App />)
    const instance = wrapper.instance()

    // need to await componentDidMount so that promise resolves before testing the component
    await instance.componentDidMount()
    const button = wrapper.find(Product).first().dive().find('a')

    button.simulate('click')

    // grabbing first  in Basket and finding the "a" tag 
    const removeButton = wrapper.find(Basket).first().dive().find('a')

    removeButton.simulate('click')

    expect(wrapper.state('items')).toHaveLength(0)
  })

  it('should update the "totalPrice" to 0', async () => {
    const wrapper = shallow(<App />)
    const instance = wrapper.instance()

    // need to await componentDidMount so that promise resolves before testing the component
    await instance.componentDidMount()
    const button = wrapper.find(Product).first().dive().find('a')

    button.simulate('click')

    // grabbing first  in Basket and finding the "a" tag 
    const removeButton = wrapper.find(Basket).first().dive().find('a')

    removeButton.simulate('click')

    //checking the totalPrice has updated with the correct total
    expect(wrapper.state('totalPrice')).toBe(0)
  })

  it('should remove all items with id of 1 when there is only one product with quantity of 2', async () => {
    const wrapper = shallow(<App />)
    const instance = wrapper.instance()

    // need to await componentDidMount so that promise resolves before testing the component
    await instance.componentDidMount()
    const button = wrapper.find(Product).first().dive().find('a')

    button.simulate('click').simulate('click')

    // grabbing first  in Basket and finding the "a" tag 
    const removeButton = wrapper.find(Basket).first().dive().find('a')

    removeButton.simulate('click')

    expect(wrapper.state('totalPrice')).toBe(0) //checks totalPrice is 0
    expect(wrapper.state('items')).toHaveLength(0) //checks items array is empty
  })

  it('should remove all items of first product in the basket when there are both products', async () => {
    const wrapper = shallow(<App />)
    const instance = wrapper.instance()

    // need to await componentDidMount so that promise resolves before testing the component
    await instance.componentDidMount()

    //simulates click twice for each product
    wrapper.find(Product).forEach((node) => {
      node.dive().find('a').simulate('click').simulate('click')
    })

    const removeTshirt = wrapper.find(Basket).first().dive().find('a').at(0)

    removeTshirt.simulate('click')

    expect(wrapper.state('totalPrice')).toBe(39.90) //checks totalPrice is 39.90 => price of two tshirts
    expect(wrapper.state('items')).toHaveLength(1) //checks items array has two products after deleting all cufflinks
    expect(wrapper.state('items')[0]['quantity']).toBe(2) // checks quantity of remainign product hasn't changed => 2
  })
})