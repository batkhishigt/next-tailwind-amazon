import React, { useContext, useEffect } from 'react'
import CheckoutWizaerd from '../components/CheckoutWizaerd'
import Layout from '../components/Layout'
import { useForm } from 'react-hook-form'
import { Store } from '../utils/Store'
import Cookies from 'js-cookie'


export default function ShippingScreen() {
    const { state, dispatch } = useContext(Store)
    const { cart } = state
    const { shippingAddress } = cart
    const { handleSubmit, register, formState: { errors }, setValue, getValues } = useForm();

    useEffect(() => {
        setValue('fullName', shippingAddress.fullName)
        setValue('address', shippingAddress.address)
        setValue('city', shippingAddress.city)
        setValue('postalCode', shippingAddress.postalCode)
        setValue('country', shippingAddress.country)
    }, [setValue, shippingAddress])


    const submitHandler = ({ fullName, address, city, postalCode, country }) => {
        dispatch({ type: 'SAVE_SHIPPING_ADDRESS', payload: { fullName, address, city, postalCode, country } })
        Cookies.set('cart', JSON.stringify({
            ...cart, shippingAddress: {
                fullName, address, city, postalCode, country
            }
        }))
    }
    return (
        <Layout title='shipping'>
            <CheckoutWizaerd activeStep={1} />
            <form
                className='mx-auto max-w-screen-md'
                onSubmit={handleSubmit(submitHandler)}
            >
                <h1 className='mb-4 text-xl'>Shipping Address</h1>
                <div className='mb-4'>
                    <label htmlFor='fullName'>Full Name</label>
                    <input
                        className='w-full'
                        id='fullName'
                        autoFocus
                        {...register('fullName', {
                            required: 'Please enter full name'
                        })}
                    />
                    {errors.fullName && (<div className='text-red-500'>{errors.fullName.messge}</div>)}
                </div>
                <div className='mb-4'>
                    <label htmlFor='address'>Address</label>
                    <input
                        className='w-full'
                        id='address'
                        autoFocus
                        {...register('address', {
                            required: 'Please enter full name',
                            minLenght: { value: 3, message: 'address more than 3 characters' }
                        })}
                    />
                    {errors.address && (<div className='text-red-500'>{errors.address.messge}</div>)}
                </div>
                <div className='mb-4'>
                    <label htmlFor='city'>City</label>
                    <input
                        className='w-full'
                        id='city'
                        autoFocus
                        {...register('city', {
                            required: 'Please enter full name',

                        })}
                    />
                    {errors.city && (<div className='text-red-500'>{errors.city.messge}</div>)}
                </div>
                <div className='mb-4'>
                    <label htmlFor='postalCode'>Postal code</label>
                    <input
                        className='w-full'
                        id='postalCode'
                        autoFocus
                        {...register('postalCode', {
                            required: 'Please enter full name',

                        })}
                    />
                    {errors.postalCode && (<div className='text-red-500'>{errors.postalCode.messge}</div>)}
                </div>
                <div className='mb-4'>
                    <label htmlFor='country'>Country</label>
                    <input
                        className='w-full'
                        id='country'
                        autoFocus
                        {...register('country', {
                            required: 'Please enter full name',

                        })}
                    />
                    {errors.country && (<div className='text-red-500'>{errors.country.messge}</div>)}
                </div>
                <div className='mb-4 flex justify-between'>
                    <button className='primary-button '>
                        Next
                    </button>
                </div>
            </form>
        </Layout>
    )
}
ShippingScreen.auth = true;