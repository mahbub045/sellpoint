import { Store } from '@/utils/Store';
import data from '@/utils/data';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import CartModal from './CartModal';

const Header = ({ title }) => {
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const router = useRouter();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('username');
    const [showInput, setShowInput] = useState(false);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const { theme, setTheme } = useTheme();

    // Function to open the cart modal
    const openCartModal = () => {
        setIsCartModalOpen(true);
    };

    // Function to close the cart modal
    const closeCartModal = () => {
        setIsCartModalOpen(false);
    };

    const handleSearchIconClick = () => {
        setShowInput(!showInput);
    };

    // Function to handle logout
    const handleLogout = () => {
        // Implement your logout logic here (e.g., clear authentication token, reset state)
        setIsLoggedIn(false);
    };

    const navMenu2 = [
        {
            id: 1,
            name: "All Gift Vouchers",
            url: '/ServerNotFound'
        },
        {
            id: 2,
            name: "Happy Deal",
            url: '/ServerNotFound'
        },
        {
            id: 3,
            name: "Electronics",
            url: '/ServerNotFound'
        },
        {
            id: 4,
            name: "Cookarise",
            url: '/ServerNotFound'
        }
    ];

    // State to track whether the header should be fixed
    const [isHeaderFixed, setIsHeaderFixed] = useState(false);

    useEffect(() => {
        // Function to handle scroll event
        const handleScroll = () => {
            // Check the scroll position
            if (window.scrollY > 100) { // Adjust the value as needed
                setIsHeaderFixed(true);
            } else {
                setIsHeaderFixed(false);
            }
        };

        // Add event listener for scroll
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Add or remove the 'fixed' class based on the state
    const headerClassName = isHeaderFixed
        ? 'bg-emerald-500 transition-transform duration-300 ease-in-out transform fixed top-0 left-0 right-0 z-50 shadow-md shadow-gray-600'
        : 'bg-emerald-500 transition-transform duration-300 ease-in-out transform z-50 shadow-md shadow-gray-600';

    // search functionality
    const [query, setQuery] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        router.push(`/search?name=${query}`);
    }

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
                        <div className="items-center hidden sm:flex">
                            <div>
                                <form action="" className="flex border lg:w-[500px] md:w-96 border-emerald-400 rounded" onSubmit={submitHandler}>
                                    <input
                                        onChange={(e) => setQuery(e.target.value)}
                                        style={{ '--tw-ring-inset': 'none' }}
                                        type="text"
                                        className="block w-full px-3 text-black dark:text-white bg-inherit border-none ring-none rounded"
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
                                    <Link legacyBehavior href="/signup">
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
                <header className={headerClassName}>
                    <nav className="relative z-10 container mx-auto flex items-center h-12">
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
                                {!showInput &&
                                    <p>All Categories</p>
                                }
                            </div>
                            <div className='absolute invisible w-[300px] group-hover:visible mt-3 bg-white dark:bg-black'>
                                <div className='flex flex-col p-4'>
                                    {data && data?.map((item, index) => (
                                        <Link legacyBehavior href={`/categorypages/${item?.categorySlug}`} key={index}>
                                            <a className='flex p-1 gap-2 items-center dark:text-white hover:text-emerald-600 dark:hover:text-emerald-600'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                                                </svg>
                                                {item.category}
                                            </a>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:flex">
                            {navMenu2 && navMenu2.map((item, index) => (
                                <Link legacyBehavior href={`/${item.url}`} key={index}>
                                    <a className="p-2 ml-3 text-white hover:text-stone-200">{item.name}</a>
                                </Link>
                            ))}
                        </div>
                        {/* sm:sbox,dlmode,cart */}
                        <div className="flex ml-auto p-4">
                            <div className="items-center sm:hidden flex">
                                <div className="relative flex items-center">
                                    <button
                                        onClick={handleSearchIconClick}
                                        className="text-white"
                                    >
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
                                    {showInput && (
                                        <form
                                            onSubmit={submitHandler}
                                            className="flex w-52 h-9 border border-white rounded ml-2"
                                        >
                                            <input
                                                onChange={(e) => setQuery(e.target.value)}
                                                style={{ '--tw-ring-inset': 'none' }}
                                                type="text"
                                                className="block w-full px-3 text-white bg-inherit border-none ring-none rounded placeholder-white"
                                                placeholder='Search...'
                                            />
                                        </form>
                                    )}
                                </div>
                            </div>
                            {/* dark mode & light mode */}
                            <div>
                                {!showInput && (
                                    <button
                                        onClick={() => theme == "light" ? setTheme("dark") : setTheme("light")}
                                        className='p-3'>

                                        {
                                            theme == "light" ? <div className='rounded-lg text-white'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                                                </svg>

                                            </div> : <div className='rounded-lg text-white'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                                                </svg>

                                            </div>

                                        }
                                    </button>
                                )}
                            </div>
                            {/* Dark mode & light mode end*/}
                            {/* cart */}
                            <div>
                                <a className=" text-white cursor-pointer hover:text-stone-200 mb-1" onClick={openCartModal}>
                                    <div className="relative py-2">
                                        <div className="t-0 absolute left-5">
                                            {cart?.cartItems?.length > 0 && (
                                                <p className="flex h-1 w-1 items-center justify-center rounded-full bg-red-500 p-2 text-[10px] text-white"> {cart?.cartItems?.reduce((a, c) => a + c.quantity, 0)}</p>
                                            )}
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="mt-1 h-6 w-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                        </svg>
                                    </div>

                                </a>
                            </div>
                            {/* Render the CartModal if isCartModalOpen is true */}
                            {isCartModalOpen && <CartModal onClose={closeCartModal} />}
                            {/* cart end */}
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
            </div >
        </>
    )
};

export default dynamic(() => Promise.resolve(Header), { ssr: false });