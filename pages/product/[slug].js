import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Store } from '@/utils/Store';
import data from '@/utils/data';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

const ProductScreen = () => {
    const { state, dispatch } = useContext(Store);
    const router = useRouter();
    const { query } = useRouter();
    const { slug } = query;
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('S');
    const product = data.products.find((x) => x.slug === slug);
    if (!product) {
        return <div>Product Not found!</div>;
    }

    const handleColorButtonClick = (color) => {
        setSelectedColor(color);
    };
    const handleSizeButtonClick = (value) => {
        setSelectedSize(value);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    const increaseQuantity = () => {
        if (quantity < product.countInStock) {
            setQuantity(quantity + 1);
        }
    };
    const addToCartHandler = () => {
        const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        if (product.countInStock < quantity) {
            alert("Sorry, Product is out of stock");
            return;
        }
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
        router.push('/cart');
    }

    return (
        <>
            <Header title={product.name} />
            <div className='container mx-auto p-4'>
                <div className='py-2'>
                    <Link href="/">
                        <button className="text-black primary-button">Back to products</button>
                    </Link>
                </div>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                    <div className='relative overflow-hidden'>
                        <img src={product.image} alt={product.name} className='w-full h-auto hover:cursor-zoom-in transition-transform transform hover:scale-150' />
                    </div>
                    <div className='flex flex-col'>
                        {/* Product Info */}
                        <ul className="mb-2">
                            <li>
                                <h1 className='text-xl font-semibold'>{product.name}</h1>
                            </li>
                            <li className="text-sm">
                                <span className='font-semibold'>Category: </span>{product.category} | <span className='font-semibold'>Brand: </span>{product.brand}
                            </li>
                            <li className="text-sm">
                                <span className='font-semibold'>Rating: </span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 inline-block text-yellow-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                                <span>{product.rating} of {product.numReviews}</span>
                            </li>
                        </ul>
                        {/* Price */}
                        <div className='my-2'>
                            <h1 className='text-3xl font-semibold'>
                                <span className='font-extrabold'>৳ </span>{product.discountPrice}
                            </h1>
                            <del className='text-red-600'>
                                <span className='font-extrabold'>৳ </span>{product.price}
                            </del>
                        </div>
                        <hr className="my-2" />
                        {/* Color Family */}
                        <div className='my-4'>
                            <h4 className='font-semibold'>Color Family</h4>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    className={`bg-black w-10 h-10 rounded-full ${selectedColor === 'black' ? 'border-2 border-black' : 'border border-solid border-gray-300'}`}
                                    onClick={() => handleColorButtonClick('black')}
                                />
                                <button
                                    type="button"
                                    className={`bg-blue-500 w-10 h-10 rounded-full ${selectedColor === 'blue' ? 'border-2 border-blue-600' : 'border border-solid border-gray-300'}`}
                                    onClick={() => handleColorButtonClick('blue')}
                                />
                                <button
                                    type="button"
                                    className={`bg-green-500 w-10 h-10 rounded-full ${selectedColor === 'green' ? 'border-2 border-green-600' : 'border border-solid border-gray-300'}`}
                                    onClick={() => handleColorButtonClick('green')}
                                />
                                <button
                                    type="button"
                                    className={`bg-violet-500 w-10 h-10 rounded-full ${selectedColor === 'violet' ? 'border-2 border-violet-600' : 'border border-solid border-gray-300'}`}
                                    onClick={() => handleColorButtonClick('violet')}
                                />
                                <button
                                    type="button"
                                    className={`bg-yellow-500 w-10 h-10 rounded-full ${selectedColor === 'yellow' ? 'border-2 border-yellow-600' : 'border border-solid border-gray-300'}`}
                                    onClick={() => handleColorButtonClick('yellow')}
                                />
                                {/* Add more color buttons as needed */}
                            </div>
                        </div>
                        {/* Size */}
                        <div className='my-2'>
                            <h4 className='font-semibold'>Size</h4>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    className={`px-3 ${selectedSize === 'S' ? 'bg-emerald-500' : 'bg-gray-300'} rounded`}
                                    onClick={() => handleSizeButtonClick('S')}
                                >
                                    S
                                </button>
                                <button
                                    type="button"
                                    className={`px-3 ${selectedSize === 'M' ? 'bg-emerald-500' : 'bg-gray-300'} rounded`}
                                    onClick={() => handleSizeButtonClick('M')}
                                >
                                    M
                                </button>
                                <button
                                    type="button"
                                    className={`px-3 ${selectedSize === 'XL' ? 'bg-emerald-500' : 'bg-gray-300'} rounded`}
                                    onClick={() => handleSizeButtonClick('XL')}
                                >
                                    XL
                                </button>
                                <button
                                    type="button"
                                    className={`px-3 ${selectedSize === '2XL' ? 'bg-emerald-500' : 'bg-gray-300'} rounded`}
                                    onClick={() => handleSizeButtonClick('2XL')}
                                >
                                    2XL
                                </button>
                                <button
                                    type="button"
                                    className={`px-3 ${selectedSize === '3XL' ? 'bg-emerald-500' : 'bg-gray-300'} rounded`}
                                    onClick={() => handleSizeButtonClick('2XL')}
                                >
                                    3XL
                                </button>
                            </div>
                        </div>
                        {/* Quantity */}
                        <div className='my-2'>
                            <h4 className='font-semibold'>Quantity</h4>
                            {product.countInStock > 0 ?
                                <div className="flex items-center">
                                    <button
                                        type="button"
                                        className="px-5 py-1 font-bold bg-emerald-200 text-black rounded-l"
                                        onClick={decreaseQuantity}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="text"
                                        className="w-28 px-4 py-1 text-center border border-gray-300 rounded"
                                        value={quantity}
                                        readOnly
                                    />
                                    <button
                                        type="button"
                                        className="px-5 py-1 font-bold bg-emerald-400 text-black rounded-r"
                                        onClick={increaseQuantity}
                                    >
                                        +
                                    </button>
                                </div>
                                :
                                <div>
                                    <button className='bg-slate-400 rounded px-10 py-1 opacity-70'>Out Of Stock</button>
                                </div>
                            }
                        </div>
                        {/* Buy Now and Add to Cart buttons */}
                        <div className='mt-5 flex flex-col md:flex-row md:justify-between font-semibold'>
                            <button className="w-full md:w-72 mb-2 md:mb-0 md:mr-2 p-2 bg-slate-400 hover:bg-slate-500 rounded" onClick={addToCartHandler}>Buy Now</button>
                            <button className="w-full md:w-72 p-2 primary-button" onClick={addToCartHandler}>Add to Cart</button>
                        </div>
                    </div>
                    <div className="p-5">
                        {/* Delivery Information */}
                        <div className="p-5">
                            <div className="mb-4">
                                <h5 className='inline-block'>Delivery</h5>
                                <button className='inline-block ml-4 text-emerald-600 hover:underline'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 inline-block">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                    Change
                                </button>
                                <p>123 Main Street, Dhaka, Bangladesh</p>
                            </div>
                            <hr />
                            <div className="mb-4">
                                <h5 className='font-semibold'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 inline-block mr-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                                    </svg>
                                    COD
                                </h5>
                                <p>Cash on Delivery Available</p>
                            </div>
                            <hr />
                            <div className="mb-4">
                                <h5 className='font-semibold text-sm'>Service</h5>
                                <p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 inline-block">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                    </svg>
                                    <span className='ml-1'>7 Day Return</span>
                                </p>
                                <p className='text-sm'>Warranty not available</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='my-2'>
                    <h1 className='font-semibold text-xl py-4'>Description:</h1>
                    {product.description}
                </div>
                <div className='my-2'>
                    <h1 className='text-xl font-semibold py-4'>Coustomer Reviews</h1>
                    <div className="pb-5">
                        <div>
                            <span className='font-semibold'>Rating: </span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 inline-block text-yellow-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                            <span>{product.rating}</span>
                        </div>
                        <button className='text-emerald-600 font-semibold hover:underline'>Noman Ali</button>
                        <p className='text-xs font-semibold opacity-80'>02-12-2020</p>
                        <p className='my-2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa modi fugiat temporibus, molestiae dignissimos omnis eveniet dicta est quas suscipit saepe optio tempora iure ut pariatur quo, officiis sed quis autem consectetur provident quaerat. Provident aliquam aspernatur nisi natus dignissimos? Tenetur itaque quisquam maxime est ratione nostrum omnis molestias. Atque?</p>
                    </div>
                    <hr />
                    {/* 2 */}
                    <div className="pb-5">
                        <div>
                            <span className='font-semibold'>Rating: </span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 inline-block text-yellow-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                            <span>{product.rating}</span>
                        </div>
                        <button className='text-emerald-600 font-semibold hover:underline'>Rana Khan</button>
                        <p className='text-xs font-semibold opacity-80'>02-12-2020</p>
                        <p className='my-2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa modi fugiat temporibus, molestiae dignissimos omnis eveniet dicta est quas suscipit saepe optio tempora iure ut pariatur quo, officiis sed quis autem consectetur provident quaerat. Provident aliquam aspernatur nisi natus dignissimos? Tenetur itaque quisquam maxime est ratione nostrum omnis molestias. Atque?</p>
                    </div>
                    <hr />
                    {/* 3 */}
                    <div className="pb-5">
                        <div>
                            <span className='font-semibold'>Rating: </span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 inline-block text-yellow-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                            <span>{product.rating}</span>
                        </div>
                        <button className='text-emerald-600 font-semibold hover:underline'>Jannati Akter</button>
                        <p className='text-xs font-semibold opacity-80'>02-12-2020</p>
                        <p className='my-2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa modi fugiat temporibus, molestiae dignissimos omnis eveniet dicta est quas suscipit saepe optio tempora iure ut pariatur quo, officiis sed quis autem consectetur provident quaerat. Provident aliquam aspernatur nisi natus dignissimos? Tenetur itaque quisquam maxime est ratione nostrum omnis molestias. Atque?</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ProductScreen;
