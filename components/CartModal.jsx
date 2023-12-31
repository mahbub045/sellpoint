import { Store } from '@/utils/Store';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';

const CartModal = ({ onClose }) => {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const { cart: { cartItems } } = state;
    const removeItemHandler = (item) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    };
    const updateCartHandler = (item, qty) => {
        const quantity = Number(qty);
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    };

    return (
        <div className="fixed mt-60 inset-5 flex items-center justify-center z-50">
            <div className="bg-black opacity-60 inset-0 fixed"></div>
            <div className="bg-white/95 dark:bg-black/95 border border-emerald-600 shadow-lg shadow-emerald-600 p-4 rounded-md z-50 relative max-w-md w-full md:max-w-xl"> {/* Adjusted max width */}
                <div className="flex justify-end">
                    <button onClick={onClose} className='rounded-lg hover:text-red-600 p-1 hover:bg-slate-200' >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>

                    </button>
                </div>
                <h1 className="mb-4 text-xl text-center">Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <div className='text-center mb-4 text-red-600'>
                        Your Cart is empty.
                    </div>
                ) : (
                    <div className='grid md:grid-cols-2 md:gap-5'>
                        <div className='overflow-x-auto md:col-span-2'>
                            <table className='min-w-full'>
                                <thead className='border-b'>
                                    <tr>
                                        <th className='px-5 text-center'>Item</th>
                                        <th className='px-5 text-center'>Quantity</th>
                                        <th className='px-5 text-center'>Price</th>
                                        <th className='px-5 text-center'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item.slug} className='border-b'>
                                            <td>
                                                <Link legacyBehavior href={`/product/${item.slug}`}>
                                                    <a className='flex items-center'>
                                                        <Image src={item.image} alt={item.name} width={50} height={50}></Image>
                                                        &nbsp;
                                                        <span className='dark:text-white'>{item.name}</span>
                                                    </a>
                                                </Link>
                                            </td>
                                            <td className='p-5 text-center'>
                                                <select value={item.quantity} onChange={(e) => updateCartHandler(item, e.target.value)}>
                                                    {
                                                        [...Array(item.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                        ))
                                                    }
                                                </select>
                                            </td>
                                            <td className='p-5 text-center'><span className='text-xl'>৳ </span>{item.discountPrice}</td>
                                            <td className='p-5 text-center'>
                                                <button onClick={() => removeItemHandler(item)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:text-red-600">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                <hr />
                <div className='p-5 text-center'>
                    {cartItems?.length === 0 ? (
                        <Link legacyBehavior href="/">
                            <button className='primary-button dark:text-black'>Back to Shopping</button>
                        </Link>
                    ) : (
                        <ul>
                            <li>
                                <div className='pb-3 text-xl text-center'>
                                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}):
                                    <span className='text-2xl'> ৳ </span>{cartItems.reduce((a, c) => a + c.quantity * c.discountPrice, 0)}
                                </div>
                            </li>
                            <li className='text-center'>
                                <button onClick={() => window.location.href = '/login?redirect=/shipping'} className='w-60 primary-button dark:text-black'>
                                    Check Out
                                </button>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};
export default dynamic(() => Promise.resolve(CartModal), { ssr: false });
