import { Store } from '@/utils/Store';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

const Header = ({ title }) => {
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const router = useRouter();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('username');

    // Function to handle logout
    const handleLogout = () => {
        // Implement your logout logic here (e.g., clear authentication token, reset state)
        setIsLoggedIn(false);
    };

    const navMenu = [
        {
            id: 1,
            name: "Menu1"
        },
        {
            id: 2,
            name: "Menu2"
        },
        {
            id: 3,
            name: "Menu3"
        },
        {
            id: 4,
            name: "Menu4"
        },
        {
            id: 5,
            name: "Menu5"
        },
        {
            id: 6,
            name: "Menu6"
        }
    ];
    const navMenu2 = [
        {
            id: 1,
            name: "All Gift Vouchers"
        },
        {
            id: 2,
            name: "Happy Deal"
        },
        {
            id: 3,
            name: "Electronics"
        },
        {
            id: 4,
            name: "Cookarise"
        }
    ];
    return (
        <>
            <Head>
                <title>{title ? title + " - SellPoint" : "SellPoint"}</title>
                <meta name="description" content="e-Commerce Website" />
            </Head>
            <div className="flex flex-col justify-between">
                {/* topbar */}
                <section className="container m-auto">
                    <div className="flex items-center justify-between p-2 mx-auto">
                        {/* Replace the "SellPoint" text with an <img> element */}
                        <Link legacyBehavior href="/">
                            <a className="text-xl italic font-bold text-emerald-500">
                                <img src="/logo.png" alt="SellPoint Logo" className="w-36 h-10" />
                            </a>
                        </Link>

                        <div className="items-center hidden md:flex">
                            <div>
                                <form action="" className="flex border lg:w-[500px] md:w-96 border-emerald-400 rounded">
                                    <input
                                        style={{ '--tw-ring-inset': 'none' }}
                                        type="text"
                                        className="block w-full px-3 text-black bg-white border-none ring-none rounded-md  "
                                        placeholder="Search for products, brands and more..."
                                    />
                                    <button className="px-4 text-gray-400">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                            />
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="flex items-center">
                            {/* Display "Logout" and the user's name when logged in */}
                            {isLoggedIn ? (
                                <div className="flex items-center">
                                    <span className="mr-2">Hello, {username}</span>
                                    <button onClick={handleLogout} className="p-2 font-medium text-emerald-400 hover:text-emerald-600">
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                // Display "Sign Up" and "Login" when not logged in
                                <div className="z-10 flex items-center">
                                    <Link legacyBehavior href="/register">
                                        <a className="p-2 md:text-base sm:text-[12px] text-[12px] flex font-medium text-emerald-400 hover:text-emerald-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="md:w-6 md:h-6 w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                            </svg>
                                            Sign Up
                                        </a>
                                    </Link>
                                    <Link legacyBehavior href="/login">
                                        <a className="pr-3 md:text-base sm:text-[12px] text-[12px] font-medium flex text-emerald-400 hover:text-emerald-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="md:w-6 md:h-6 w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                            </svg>
                                            Login
                                        </a>
                                    </Link>
                                </div>

                            )}
                        </div>
                    </div>
                </section>
                {/* topbar end */}
                <header className="bg-emerald-500">
                    <nav className="relative z-10 container mx-auto flex items-center shadow-md h-12">
                        <div className=' group cursor-pointer hover:text-white h-12 '>
                            <div className='text-xl italic font-bold text-white flex items-center gap-2 pt-2'>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-7 h-7"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                </svg>
                                <p>All Categories</p>
                            </div>
                            <div className='absolute invisible w-[300px] group-hover:visible mt-3 bg-white'>
                                <div className='flex flex-col p-4'>
                                    {navMenu && navMenu.map((item, index) => (
                                        <Link legacyBehavior href={`/${item.name}`} key={index}>
                                            <a className='flex p-1 gap-2 items-center hover:bg-slate-50 hover:text-emerald-600'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                                                </svg>
                                                {item.name}
                                            </a>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:flex">
                            {navMenu2 && navMenu2.map((item, index) => (
                                <Link legacyBehavior href={`/${item.name}`} key={index}>
                                    <a className="p-2 ml-3 text-white hover:text-stone-300">{item.name}</a>
                                </Link>
                            ))}
                        </div>
                        <div className="ml-auto">
                            <Link legacyBehavior href="/cart">
                                <a className="p-4 text-white hover:text-stone-300">
                                    <FontAwesomeIcon className="text-2xl" icon={faCartShopping} />
                                    {cart.cartItems.length > 0 && (
                                        <span className='px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full'>
                                            {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                                        </span>
                                    )}
                                </a>
                            </Link>
                        </div>
                    </nav>
                </header>
                <section className='container'>
                    <div className='md:flex'>
                        <div className='md:hidden flex flex-row justify-between'>
                            {navMenu2 && navMenu2.map((item, index) => (
                                <Link legacyBehavior href={`/${item.name}`} key={index}>
                                    <a className="p-2 ml-3 text-black hover:text-stone-600 text-[10px]">{item.name}</a>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
                {/* header end */}
            </div>
        </>
    )
};

export default Header;