"use client";
import Link from "next/link";
import { useEffect, useState } from "react";


const generateStars = (rating) => {
    const maxRating = 5;
    const starCount = Math.floor(rating); // Get the integer part of the rating
    const stars = [];

    // Create SVG elements for each star based on the rating
    for (let i = 0; i < maxRating; i++) {
        if (i < starCount) {
            stars.push(
                <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="yellow"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-3 h-3 inline-block text-yellow-600"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                </svg>
            );
        } else {
            stars.push(
                <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="gray" // Change color for remaining stars
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-3 h-3 inline-block text-gray-400" // Change class for styling
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                </svg>
            );
        }
    }

    return stars;
};


const Productitem = ({ product }) => {
    const [discount, setDiscount] = useState(null);
    useEffect(() => {
        if (product?.price) {
            const discountPercentage = Math.ceil(((product.price - product.discountPrice) / product.price) * 100);
            setDiscount(discountPercentage);
        }
    }, [product])
    //calculate discount end

    // Generate stars
    const stars = generateStars(product?.rating || 0);

    return (
        <>
            <Link legacyBehavior href={`/product/${product.slug}`}>
                <div className='card bg-slate-200 dark:bg-slate-950 rounded-md h-fit group cursor-pointer relative' title="View Details">
                    {/* Image container with relative positioning */}
                    <div className='relative'>
                        <img src={product.image} alt={product.name} className='object-cover w-full h-52' />
                        {/* Absolute positioning for the discount price */}
                        <div className='absolute top-2 left-2 bg-emerald-500 rounded-md p-1 shadow-md'>
                            <p className='font-bold text-xs '>
                                -{discount && discount}%
                            </p>
                        </div>
                    </div>
                    {/* Product details */}
                    <div className='flex flex-col items-start justify-center px-3 py-2'>
                        <h2 className='font-medium dark:text-white line-clamp-1'>{product.name}</h2>
                        <p className='mb-1 text-sm text-gray-700 dark:text-gray-600'>{product.brand}</p>
                        <p className='flex justify-center items-center font-bold dark:text-white'>
                            <span className='font-extrabold'>৳ </span>
                            {product.discountPrice}
                            {product.countInStock > 0 ? (
                                <span className="flex justify-center items-center ml-2 text-emerald-600 text-xs">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 inline-block">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    In Stock
                                </span>
                            ) : (
                                <span className="flex justify-center items-center ml-2 text-red-500 text-xs">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 ">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                    </svg>
                                    Out Of Stock
                                </span>
                            )}
                        </p>
                        <del className=' text-red-600 opacity-60'>
                            <span className='font-extrabold'>৳ </span>
                            {product.price}
                        </del>
                        <p>
                            {stars} {/* Display generated stars */}
                            <span className="text-xs">({product?.numReviews})</span>
                        </p>
                    </div>
                </div>
            </Link>
        </>
    )
};

export default Productitem;