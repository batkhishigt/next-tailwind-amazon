import React, { useContext } from 'react'
import Layout from '../components/Layout';
import { useRouter } from 'next/router'
import { Store } from '../utils/Store'
import Link from 'next/link'
import Image from 'next/image';
import { XCircleIcon } from '@heroicons/react/outline'
import dynamic from 'next/dynamic'
import axios from 'axios'
import { toast } from 'react-toastify';

function CartScreen() {
    const { state, dispatch } = useContext(Store)
    const cartItems = state.cart.cartItems;
    const router = useRouter();
    const removeItemHandler = (item) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
    }
    const updateCartHandler = async (item, qty) => {
        const quantity = Number(qty)
        const { data } = await axios.get(`/api/products/${item._id}`)
        if (data.quantity < quantity) {
            toast.error('Sorry. Product is out of stock')
        }
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } })
        toast.success('Product added to the cart')
    }
    return (
        <Layout title="Shopping cart" >
            <h1 className='mb-4 text-xl'> Shopping cart</h1>
            {cartItems.length === 0 ? (
                <div>
                    Cart is empty, <Link href="/">go shopping</Link>
                </div>
            ) : (
                <div className='grid md:grid-cols-4 md:gap-5'>
                    <div className='overflow-x-auto md:col-span-3'>
                        <table className='min-w-full'>
                            <thead className='border-b'>
                                <tr>
                                    <th className='px-5 text-left'>Item</th>
                                    <th className='p-5 text-right'>Quantity</th>
                                    <th className='p-5 text-right'>Price</th>
                                    <th className='p-5 text-left'>Action</th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                {cartItems.map(item => (
                                    <tr key={item.slug} className="border-b">
                                        <td>
                                            <Link href={`/product/${item.slug}`}>
                                                <a className='flex items-center'>
                                                    <Image
                                                        src={`/${item.image}`}
                                                        alt={item.name}
                                                        width={50}
                                                        height={50}
                                                    >
                                                    </Image>
                                                    &nbsp;
                                                    {item.name}
                                                </a>
                                            </Link>

                                        </td>
                                        <td className='p-5 text-right'>
                                            <select value={item.quantity} onChange={(e) => updateCartHandler(item, e.target.value)}>
                                                {[...Array(item.countInStock).keys()].map(number => (
                                                    <option key={number + 1} value={number + 1}>{number + 1}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className='p-5 text-right'>{item.price}</td>
                                        <td className='p-5 text-right'>
                                            <button onClick={() => { removeItemHandler(item) }}>
                                                <XCircleIcon className="h-5 w-5"></XCircleIcon>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='card p-5'>
                        <ul>
                            <li>
                                <div className='pb-3 text-xl'>Subtotal({cartItems.reduce((a, c) => a + c.quantity, 0)}){' '}: ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}</div>

                            </li>
                            <li>
                                <button className='primary-button w-full' onClick={() => router.push('login?redirect=/shipping')}>
                                    Check out
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>)
            }
        </Layout>
    )
}
export default dynamic(() => Promise.resolve(CartScreen), { ssr: false })