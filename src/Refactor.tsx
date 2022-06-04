import React, { useState, useEffect } from 'react'
import getProducts from './utils/getProducts'
import Product from './components/Product'
import Basket from './components/Basket'

//type for items required from mock data
type ProductItem = {
  id: number,
  title: string,
  image: string,
  altText: string,
  price: string,
  quantity: number
}

//type for the productPage state used to track different inputs across the page
type PageState = {
  loading: boolean,
  productItems: ProductItem[],
  items: ProductItem[],
  totalPrice: string | number
}

const Refactor = () => {

  const [productPage, setProductPage] = useState<PageState>({
    loading: false,
    productItems: [],
    items: [],
    totalPrice: 0,
  })

  const fetchProducts = async () => {
    setProductPage({ ...productPage, loading: true })

    try {
      const products = await getProducts()
      setProductPage({ ...productPage, loading: false, productItems: products })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { fetchProducts() }, [])

  //added type for items passed
  const calculateTotalPrice = (items: ProductItem[]): string => {
    let total = 0

    items.forEach(item => {
      total += parseFloat(item.price) * item.quantity
    })

    return total.toFixed(2)
  }

  //added a type for the argument
  const addToBasket = (id: number) => {
    const item = productPage.productItems.find(item => item.id === id);
    if (!item) return

    const newItemsArray = productPage.items.slice();
    const matchingItem = newItemsArray.find(basketItem => basketItem.id === item.id);

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      item.quantity = 1;
      newItemsArray.push(item);
    }

    const newTotalPrice = calculateTotalPrice(newItemsArray)

    setProductPage({
      ...productPage,
      items: newItemsArray,
      totalPrice: newTotalPrice
    })
  }

  //added a type for the argument
  const removeFromBasket = (id: number) => {
    const updatedItemsArray = productPage.items.filter(item => item.id !== id)

    const updatedTotalPrice = calculateTotalPrice(updatedItemsArray)

    setProductPage({
      ...productPage,
      items: updatedItemsArray,
      totalPrice: updatedTotalPrice
    })
  }


  return (
    <div className="App">
      <div>
        <section className="main">
          <section className="product_summary_collection">
            {!productPage.loading ? (
              productPage.productItems.map(product => {
                return <Product productData={product} add={addToBasket} key={product.id} />;
              })
            ) : (
              <div className="spinner" />
            )}
          </section>

          <Basket
            items={productPage.items}
            totalPrice={productPage.totalPrice}
            removeFromBasket={removeFromBasket}
          />
        </section>
      </div>
    </div>
  )
}

export default Refactor

