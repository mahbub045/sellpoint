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
            <Link legacyBehavior href={`/product/${product.slug}`}>
                <div className='card glow-effect h-fit group cursor-pointer'>
                    <div className='relative overflow-hidden '>
                        <img src={product.image} alt={product.name} className='object-cover w-full h-52 rounded shadow' />
                        <div className='absolute h-full w-full bg-black/40 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100'>
                            {/* add button to over image if needed */}
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center p-5'>
                        <h2 className='text-lg font-medium dark:text-white'>{product.name}</h2>
                        <p className='mb-2 dark:text-white'>{product.brand}</p>
                        <p className='font-bold inline-block dark:text-white'><span className='font-extrabold'>৳ </span>{product.discountPrice}</p>
                        <del className='font-bold text-red-600 opacity-60'><span className='font-extrabold'>৳ </span>{product.price}</del>
                    </div>
                </div>
            </Link>
        </>
    )
};
export default Productitem;