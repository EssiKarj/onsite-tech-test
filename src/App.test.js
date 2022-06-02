import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, mount } from 'enzyme'
import Product from './components/Product';
import getProducts from './utils/getProducts'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('testing "addToBasket" through click simulation', () => {
  it('should update the basket with 1 item when clicked', async () => {
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
})