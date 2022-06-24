/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
export default function ProductItem({ product }) {
    return (
        <div className='card'>
            <Link href={`/product/${product.slug}`}>
                <a>
                    <img
                        src={product.image}
                        alt={product.description}
                        className="rounded shadow" />
                </a>
            </Link>
            <div className='flex flex-col items-center jistify-center p-5'>
                <Link href={`/product/${product.slug}`}>
                    <a>
                        <h2 className='text-lg'>
                            {product.name}
                        </h2>
                    </a>
                </Link>
                <p className='mb-2'>{product.brand}</p>
                <p className='mb-2'>${product.price}</p>
                <button className='primary-button' type='button'>
                    Add to Cart
                </button>
            </div>
        </div>
    )
}
