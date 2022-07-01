import { useContext } from "react";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import Product from "../models/Product";
import db from "../utils/db";
import axios from 'axios'
import { Store } from "../utils/Store";
import { toast } from "react-toastify";


export default function Home({ products }) {
  const { state, dispatch } = useContext(Store)
  const { cart } = state;
  const addToHandler = async (product) => {
    const existItem = cart.cartItems.find(x => x.slug === product.slug)
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${product._id}`)
    if (data.countInStock < quantity) {
      toast.error('Sorry. Product is out of stock')
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })
    toast.success('Product added to the cart')
  }
  return (
    <Layout title={'Home Page'}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map(p => {

          return <ProductItem product={p} key={p.slug} addToHandler={addToHandler} ></ProductItem>
        })}
      </div>
    </Layout >
  )
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj)
    }
  }
}