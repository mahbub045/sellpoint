'use client';
import { Store } from "@/utils/Store";
import Link from "next/link";
import { useContext, useState } from "react";

const Productitem = ({ product }) => {
    const { state, dispatch } = useContext(Store);
    const [quantity, setQuantity] = useState(1);
    const addToCartHandler = () => {
        const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        if (product.countInStock < quantity) {
            alert("Sorry, Product is out of stock");
            return;
        }
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    }
    return (
        <>

            <div className='card glow-effect h-fit group'>
                <Link legacyBehavior href={`/product/${product.slug}`}>
                    <div className='relative overflow-hidden cursor-pointer'>
                        <img src={product.image} alt={product.name} className='object-cover w-full h-52 rounded shadow' />
                        <div className='absolute h-full w-full bg-black/40 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100'>
                            {/* add button to over image if needed */}
                        </div>
                    </div>
                </Link>
                <div className='flex flex-col items-center justify-center p-5'>
                    <h2 className='text-lg font-medium dark:text-white'>{product.name}</h2>
                    <p className='mb-2 dark:text-white'>{product.brand}</p>
                    <p className='font-bold inline-block dark:text-white'><span className='font-extrabold'>৳ </span>{product.discountPrice}</p>
                    <del className='font-bold text-red-600 opacity-60'><span className='font-extrabold'>৳ </span>{product.price}</del>
                    <button className='flex dark:text-black primary-button font-semibold' type='button' title='Add to Cart' onClick={addToCartHandler}>
                        Add to Cart
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                    </button>
                </div>
            </div>

        </>
    )
};
export default Productitem;