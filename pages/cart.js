import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Store } from '@/utils/Store';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';

function CartScreen() {
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
        <>
            <Header title="Shopping Cart" />
            <h1 className="mb-4 text-xl">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div className='h-screen'>
                    Cart is empty. <Link legacyBehavior href='/'><a className='text-black primary-button hover:none'>Go Shopping</a></Link>
                </div>
            ) : (
                <div className='grid md:grid-cols-4 md:gap-5'>
                    <div className='overflow-x-auto md:col-span-3'>
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
                                                    {item.name}
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
                                        <td className='p-5 text-center'>${item.price}</td>
                                        <td className='p-5 text-center'>
                                            <button onClick={() => removeItemHandler(item)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='p-5 card h-fit'>
                        <ul>
                            <li>
                                <div className='pb-3 text-xl'>Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) :
                                    ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                                </div>
                            </li>
                            <li>
                                <button onClick={() => router.push('login?redirect=/shipping')} className='w-full primary-button'>Check Out</button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
}
export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
