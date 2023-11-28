'use client';
import Drawer from '@/components/Drawer';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Store } from '@/utils/Store';
import { Menu, Switch } from '@headlessui/react';
import Cookies from 'js-cookie';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Fragment, useContext, useState } from "react";
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

const AddProduct = ({ categoryDetails, searchData, allBrands }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();
    const { dispatch } = useContext(Store);

    const handleToggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const links = [
        { href: '/admin/allproducts', label: 'All Products' },
        { href: '/admin/addproduct', label: 'Add New Product' },
        { href: '/admin/categories', label: 'Category' },
        { href: '/admin/brands', label: 'Brand' },
        { href: '/admin/attributes', label: 'Attribute' },
        { href: '/admin/productreviews', label: 'Product Reviews' },
    ]

    const handleLogout = () => {
        Cookies.remove('cart');
        dispatch({ type: 'CART_RESET' })
        signOut({ callbackUrl: '/login' });
    };

    /////////////////////////////////////
    const [productName, setProductName] = useState('');
    const [slug, setSlug] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [image, setImage] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');
    const [discountPrice, setDiscountPrice] = useState('');
    const [price, setPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [colorEnabled, setColorEnabled] = useState(false);
    const [attribute, setAttribute] = useState('');
    const [selectedAttributes, setSelectedAttributes] = useState(false);
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    const [cashOnDelivery, setCashOnDelivery] = useState(false);
    const [worldWideDelivery, setWorldWideDelivery] = useState(false);
    const [featuredProduct, setFeaturedProduct] = useState(false);
    const [flashDeal, setFlashDeal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            productName,
            slug,
            category,
            subCategory,
            image,
            image2,
            image3,
            image4,
            discountPrice,
            price,
            brand,
            colorEnabled,
            attributes,
            selectedAttributes,
            countInStock,
            description,
            cashOnDelivery,
        };
        console.log(formData);
        // Reset form fields or perform any other necessary actions after submission
    };
    ////////////////////////////////////////////////

    return (
        <>
            <Header title={`${session?.user?.name}`} categoryDetails={categoryDetails} searchData={searchData} />
            <div className="min-h-screen flex flex-col sm:flex-row">
                {/* Dashboard for mobile start */}
                <div className='sm:hidden flex flex-row justify-center'>
                    <button
                        onClick={handleToggleDrawer}
                        type="button"
                        className='text-emerald-600 hover:text-emerald-700 cursor-pointer'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-menu-2 inline-block" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M4 6l16 0"></path>
                            <path d="M4 12l16 0"></path>
                            <path d="M4 18l16 0"></path>
                        </svg>
                        Dashboard
                    </button>
                </div>
                {/* Dashboard for mobile end */}
                <div className="hidden sm:flex flex-col bg-slate-100 dark:bg-slate-950 shadow border-r border-slate-400 dark:border-stone-500 rounded p-2 lg:w-1/4 md:w-1/3">
                    <h2 className="text-xl font-bold text-emerald-600">Dashboard</h2>
                    <div className="flex justify-start">
                        <ul className="pt-2 pb-4 space-y-1 sm:text-sm text-xs">
                            <li className="rounded-sm">
                                <a href="/admin/profile" className="flex items-center p-2 space-x-3 text-emerald-500 hover:text-emerald-700 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="sm:w-6 w-5 sm:h-6 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                    <span>Home</span>
                                </a>
                            </li>
                            <li className="rounded-sm">
                                <a href="inbox" className="flex items-center p-2 space-x-3 text-emerald-500 hover:text-emerald-700 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="sm:w-6 w-5 sm:h-6 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                    <span>Inbox</span>
                                </a>
                            </li>
                            <li className="rounded-sm relative">
                                <Menu>
                                    <Menu.Button className="flex items-center p-2 space-x-3 text-emerald-500 hover:text-emerald-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-packages" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M7 16.5l-5 -3l5 -3l5 3v5.5l-5 3z"></path>
                                            <path d="M2 13.5v5.5l5 3"></path>
                                            <path d="M7 16.545l5 -3.03"></path>
                                            <path d="M17 16.5l-5 -3l5 -3l5 3v5.5l-5 3z"></path>
                                            <path d="M12 19l5 3"></path>
                                            <path d="M17 16.5l5 -3"></path>
                                            <path d="M12 13.5v-5.5l-5 -3l5 -3l5 3v5.5"></path>
                                            <path d="M7 5.03v5.455"></path>
                                            <path d="M12 8l5 -3"></path>
                                        </svg>
                                        <span>Products</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mt-1">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </Menu.Button>
                                    <Menu.Items className='flex flex-col px-5 w-full focus:outline-none'>
                                        {links.map((link) => (
                                            <Menu.Item key={link.href} as={Fragment} >
                                                {({ active }) => (
                                                    <a
                                                        href={link.href}
                                                        className={`${active ? 'text-emerald-700 lg:text-sm md:text-xs p-2' : 'text-emerald-600 lg:text-sm md:text-xs p-2'
                                                            }`}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-point-filled inline-block mr-2" width="15" height="15" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                            <path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" strokeWidth="0" fill="currentColor"></path>
                                                        </svg>
                                                        {link.label}
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </Menu.Items>
                                </Menu>
                            </li>
                            <li className="rounded-sm">
                                <a href="oders" className="flex items-center p-2 space-x-3 text-emerald-500 hover:text-emerald-700 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="sm:w-6 w-5 sm:h-6 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>
                                    <span>Oders</span>
                                </a>
                            </li>
                            <li className="rounded-sm">
                                <a href="/admin/customers" className="flex items-center p-2 space-x-3 text-emerald-500 hover:text-emerald-700 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="sm:w-6 w-5 sm:h-6 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                    <span>Customers</span>
                                </a>
                            </li>
                            <li className="rounded-sm">
                                <a href="AdminSetting" className="flex items-center p-2 space-x-3 text-emerald-500 hover:text-emerald-700 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="sm:w-6 w-5 sm:h-6 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>Settings</span>
                                </a>
                            </li>
                            <li className="rounded-sm">
                                <a onClick={handleLogout} className="flex items-center p-2 space-x-3 text-red-500 hover:text-red-700 cursor-pointer rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="sm:w-6 w-5 sm:h-6 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                    </svg>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* from div start */}
                <div className='w-full p-4'>
                    <div className="pb-2 text-center">
                        <h2 className="text-2xl text-emerald-600">Add New Product</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex lg:flex-row flex-col justify-between gap-2">
                            <div className="">
                                {/* Product Name */}
                                <div className="mb-4">
                                    <label htmlFor="productName" className="block text-sm font-semibold mb-1">
                                        Product Name<span className="text-red-500">*</span>:
                                    </label>
                                    <input
                                        type="text"
                                        id="productName"
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                        className="w-full px-3 py-2 text-emerald-700 dark:text-white border-emerald-500 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                                        placeholder='Your Product Name'
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="slug" className="block text-sm font-semibold mb-1">
                                        Slug<span className="text-red-500">*(Unique)</span>:
                                    </label>
                                    <input
                                        type="text"
                                        id="slug"
                                        value={slug}
                                        onChange={(e) => setSlug(e.target.value)}
                                        className="w-full px-3 py-2 text-emerald-700 dark:text-white border-emerald-500 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                                        placeholder='Ex: product_name_345'
                                        required
                                    />
                                </div>
                                <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="category" className="block text-sm font-semibold mb-1">
                                            Category<span className="text-red-500">*</span>:
                                        </label>
                                        <select
                                            id="category"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full px-3 py-2 text-emerald-700 dark:text-white border-emerald-500 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                                            required
                                        >
                                            <option value="">Select a category</option>
                                            {categoryDetails && categoryDetails?.map((item, index) => (
                                                <option
                                                    key={index}
                                                    value={item.category}
                                                >
                                                    {item.category}
                                                </option>
                                            ))}
                                            {/*Fetch from a data source */}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="subCategory" className="block text-sm font-semibold mb-1">
                                            Sub Category<span className="text-red-500">*</span>:
                                        </label>
                                        <input
                                            type="text"
                                            id="subCategory"
                                            value={subCategory}
                                            onChange={(e) => setSubCategory(e.target.value)}
                                            className="w-full px-3 py-2 text-emerald-700 dark:text-white border-emerald-500 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                                            placeholder='Ex: Baby Toy'
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="image" className="block text-sm font-semibold mb-1">
                                        Product Image<span className="text-red-500">*(Size: 900x900px)</span>:
                                    </label>
                                    <input
                                        type="file"
                                        id="image"
                                        value={image}
                                        accept="image/*"
                                        onChange={(e) => setImage(e.target.value)}
                                        className="w-full px-3 py-2 text-emerald-700 dark:text-white border-emerald-500 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                                        required
                                    />
                                </div>
                                <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-4">
                                    <div>
                                        <label htmlFor="price" className="block text-sm font-semibold mb-1">
                                            Price<span className="text-red-500">*</span>:
                                        </label>
                                        <input
                                            type="text"
                                            id="price"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            className="w-full px-3 py-2 text-emerald-700 dark:text-white border-emerald-500 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                                            placeholder='Amount in BDT'
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="discountPrice" className="block text-sm font-semibold mb-1">
                                            Discount Price<span className="text-red-500">*</span>:
                                        </label>
                                        <input
                                            type="text"
                                            id="discountPrice"
                                            value={discountPrice}
                                            onChange={(e) => setDiscountPrice(e.target.value)}
                                            className="w-full px-3 py-2 text-emerald-700 dark:text-white border-emerald-500 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                                            placeholder='Amount in BDT'
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="brand" className="block text-sm font-semibold mb-1">
                                            Brand<span className="text-red-500">*</span>:
                                        </label>
                                        <select
                                            id="brand"
                                            value={brand}
                                            onChange={(e) => setBrand(e.target.value)}
                                            className="w-full px-3 py-2 text-emerald-700 dark:text-white border-emerald-500 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                                            required
                                        >
                                            <option value="">None</option>
                                            {allBrands && allBrands?.map((item, index) => (
                                                <option
                                                    key={index}
                                                    value={item.brand}
                                                >
                                                    {item.brand}
                                                </option>
                                            ))}
                                            {/* Fetch from a data source */}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="countInStock," className="block text-sm font-semibold mb-1">
                                            In Stock<span className="text-red-500">*</span>:
                                        </label>
                                        <input
                                            type="number"
                                            id="countInStock,"
                                            value={countInStock}
                                            onChange={(e) => setCountInStock(e.target.value)}
                                            className="w-full px-3 py-2 text-emerald-700 dark:text-white border-emerald-500 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                                            placeholder='In Stock'
                                            required
                                        />
                                    </div>
                                </div>
                                {/* product variation start */}
                                <div className='mb-4 p-4 border border-emerald-500'>
                                    <h3 className='font-semibold text-lg mb-1'>Product Variation</h3>
                                    <hr className='border-emerald-400' />
                                    {/*Product color start */}
                                    <div className='my-4'>
                                        <label htmlFor="colorEnabled," className="block text-sm font-semibold mb-1">
                                            Colour:
                                        </label>
                                        <Switch
                                            checked={colorEnabled}
                                            onChange={setColorEnabled}
                                            className={`${colorEnabled ? 'bg-emerald-600' : 'bg-slate-600'}
                                            relative inline-flex h-[28px] w-[56px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
                                        >
                                            <span className="sr-only">Use setting</span>
                                            <span
                                                aria-hidden="true"
                                                className={`${colorEnabled ? 'translate-x-7' : 'translate-x-0'}pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out`}
                                            />
                                        </Switch>
                                    </div>

                                    {colorEnabled ? (
                                        <>
                                            <div className='py-2'>
                                                <label htmlFor="image2" className="block text-sm font-semibold mb-1">
                                                    Product Image<span className="text-red-500">(Size: 900x900px)</span>:
                                                </label>
                                                <input
                                                    type="file"
                                                    id="image2"
                                                    value={image2}
                                                    accept="image/*"
                                                    onChange={(e) => setImage2(e.target.value)}
                                                    className="w-full px-3 py-2 text-emerald-700 dark:text-white border-emerald-500 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                                                />
                                            </div>
                                            <div className='py-2'>
                                                <label htmlFor="image3" className="block text-sm font-semibold mb-1">
                                                    Product Image<span className="text-red-500">(Size: 900x900px)</span>:
                                                </label>
                                                <input
                                                    type="file"
                                                    id="image3"
                                                    value={image3}
                                                    accept="image/*"
                                                    onChange={(e) => setImage3(e.target.value)}
                                                    className="w-full px-3 py-2 text-emerald-700 dark:text-white border-emerald-500 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                                                />
                                            </div>
                                            <div className='py-2'>
                                                <label htmlFor="image4" className="block text-sm font-semibold mb-1">
                                                    Product Image<span className="text-red-500">(Size: 900x900px)</span>:
                                                </label>
                                                <input
                                                    type="file"
                                                    id="image4"
                                                    value={image4}
                                                    accept="image/*"
                                                    onChange={(e) => setImage4(e.target.value)}
                                                    className="w-full px-3 py-2 text-emerald-700 dark:text-white border-emerald-500 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                                                />
                                            </div>
                                        </>
                                    ) : null}
                                    {/*Product color end */}
                                    {/* Attributes start */}
                                    <label htmlFor="attribute" className="block text-sm font-semibold mt-2 mb-1">
                                        Attributes:
                                    </label>
                                    <select
                                        id="attribute"
                                        value={attribute}
                                        onChange={(e) => setAttribute(e.target.value)}
                                        className="w-full px-3 py-2 text-emerald-700 dark:text-white border-emerald-500 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                                        required
                                    >
                                        <option value="">None</option>
                                        <option value="Category 1">Category 1</option>
                                        <option value="Category 2">Category 2</option>
                                        {/* Add more options dynamically or fetch from a data source */}
                                    </select>
                                    {attribute ? (
                                        <>
                                            <label htmlFor="selectedAttributes" className="block text-sm font-semibold mt-2 mb-1">
                                                {attribute}:
                                            </label>
                                            <Select
                                                isMulti
                                                name="colors"
                                                options={options}
                                                className="basic-multi-select text-emerald-700  border-emerald-500 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                                                classNamePrefix="select"
                                            />
                                        </>
                                    ) : null}
                                    {/* Attributes end */}
                                </div>
                                {/* product variation end */}
                                {/* Description start */}
                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-sm font-semibold mb-1">
                                        Description<span className="text-red-500">*</span>:
                                    </label>
                                    <textarea
                                        type="text"
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full h-60 px-3 py-2 text-emerald-700 dark:text-white border-emerald-500 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                                        placeholder='Write Your Product Description'
                                        required
                                    />
                                </div>
                                {/* Description end */}
                            </div>
                            {/* right side bar */}
                            <div className="mb-1 lg:w-1/2 w-full lg:ml-4 ml-0 py-2">
                                {/* switch for cod */}
                                <div className='border rounded-md border-emerald-500 p-2 my-4'>
                                    <div className='p-1'>
                                        <h3 className='font-semibold text-lg mb-1'>
                                            Cash On Delivery
                                            <span className='text-red-600 text-xs'>(Active this state if needed)</span>
                                        </h3>
                                    </div>
                                    <hr className='border-emerald-600 mb-4' />
                                    <div className='mb-4 flex justify-start gap-x-32'>
                                        <label htmlFor="cashOnDelivery," className="text-sm font-semibold mt-1">
                                            Status:
                                        </label>
                                        <Switch
                                            checked={cashOnDelivery}
                                            onChange={setCashOnDelivery}
                                            className={`relative inline-flex h-[28px] w-[56px] cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 ${cashOnDelivery ? 'bg-emerald-600' : 'bg-slate-600'}`}
                                        >
                                            <span className="sr-only">Use setting</span>
                                            <span
                                                aria-hidden="true"
                                                className={`inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${cashOnDelivery ? 'translate-x-7' : 'translate-x-0'} pointer-events-none`}
                                            />
                                        </Switch>
                                    </div>
                                </div>
                                {/* switch for cod end */}
                                {/* switch for World Wide Delivery */}
                                <div className='border rounded-md border-emerald-500 p-2 my-4'>
                                    <div className='p-1'>
                                        <h3 className='font-semibold text-lg mb-1'>
                                            World Wide Delivery
                                            <span className='text-red-600 text-xs'>(Active this state if needed)</span>
                                        </h3>
                                    </div>
                                    <hr className='border-emerald-600 mb-4' />
                                    <div className='mb-4 flex justify-start gap-x-32'>
                                        <label htmlFor="worldWideDelivery," className="text-sm font-semibold mt-1">
                                            Status:
                                        </label>
                                        <Switch
                                            checked={worldWideDelivery}
                                            onChange={setWorldWideDelivery}
                                            className={`relative inline-flex h-[28px] w-[56px] cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 ${worldWideDelivery ? 'bg-emerald-600' : 'bg-slate-600'}`}
                                        >
                                            <span className="sr-only">Use setting</span>
                                            <span
                                                aria-hidden="true"
                                                className={`inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${worldWideDelivery ? 'translate-x-7' : 'translate-x-0'} pointer-events-none`}
                                            />
                                        </Switch>
                                    </div>
                                </div>
                                {/* switch for World Wide Delivery */}
                                {/* Switch for featured product start */}
                                <div className='border rounded-md border-emerald-500 p-2 my-4'>
                                    <div className='p-1'>
                                        <h3 className='font-semibold text-lg mb-1'>
                                            Featured Product
                                            <span className='text-red-600 text-xs'>(Active this state if needed)</span>
                                        </h3>
                                    </div>
                                    <hr className='border-emerald-600 mb-4' />
                                    <div className='mb-4 flex justify-start gap-x-32'>
                                        <label htmlFor="featuredProduct," className="block text-sm font-semibold mt-1">
                                            Status:
                                        </label>
                                        <Switch
                                            checked={featuredProduct}
                                            onChange={setFeaturedProduct}
                                            className={`relative inline-flex h-[28px] w-[56px] cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 ${featuredProduct ? 'bg-emerald-600' : 'bg-slate-600'}`}
                                        >
                                            <span className="sr-only">Use setting</span>
                                            <span
                                                aria-hidden="true"
                                                className={`inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${featuredProduct ? 'translate-x-7' : 'translate-x-0'} pointer-events-none`}
                                            />
                                        </Switch>
                                    </div>
                                </div>
                                {/* Switch for featured product end */}
                                {/* Switch for Flash Deal start */}
                                <div className='border rounded-md border-emerald-500 p-2 my-4'>
                                    <div className='p-1'>
                                        <h3 className='font-semibold text-lg mb-1'>
                                            Flash Deal
                                            <span className='text-red-600 text-xs'>(Active this state if needed)</span>
                                        </h3>
                                    </div>
                                    <hr className='border-emerald-600 mb-4' />
                                    <div className='mb-4 flex justify-start gap-x-32'>
                                        <label htmlFor="flashDeal," className="block text-sm font-semibold mt-1">
                                            Status:
                                        </label>
                                        <Switch
                                            checked={flashDeal}
                                            onChange={setFlashDeal}
                                            className={`relative inline-flex h-[28px] w-[56px] cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 ${flashDeal ? 'bg-emerald-600' : 'bg-slate-600'}`}
                                        >
                                            <span className="sr-only">Use setting</span>
                                            <span
                                                aria-hidden="true"
                                                className={`inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${flashDeal ? 'translate-x-7' : 'translate-x-0'} pointer-events-none`}
                                            />
                                        </Switch>
                                    </div>
                                </div>
                                {/* Switch for featured product end */}
                                {/* right side bar end */}
                            </div>
                        </div>
                        {/* Submit Button */}
                        <div className="mb-4 text-center">
                            <button
                                type="submit"
                                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded px-4 py-2"
                            >
                                Upload Product
                            </button>
                        </div>
                    </form>
                </div>
                {/* from div end */}

            </div>
            <Footer />
            {/* Drawer start */}
            {isDrawerOpen && (
                <>
                    <div className="fixed top-0 h-screen w-screen flex flex-row justify-start z-[2001]">
                        <div onClick={handleToggleDrawer} className="flex-1 "></div>

                        <Drawer isOpen={isDrawerOpen} onClose={handleToggleDrawer}>
                            <h2 className="text-xl font-bold text-emerald-600">Dashboard</h2>
                            <div className="flex justify-start">
                                <ul className="pt-2 pb-4 space-y-1 sm:text-sm text-xs">
                                    <li className="rounded-sm">
                                        <a href="/admin/profile" className="flex items-center p-2 space-x-3 text-emerald-500 hover:text-emerald-700 rounded-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="sm:w-6 w-5 sm:h-6 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                            </svg>
                                            <span>Home</span>
                                        </a>
                                    </li>
                                    <li className="rounded-sm">
                                        <a href="inbox" className="flex items-center p-2 space-x-3 text-emerald-500 hover:text-emerald-700 rounded-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="sm:w-6 w-5 sm:h-6 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                            </svg>
                                            <span>Inbox</span>
                                        </a>
                                    </li>
                                    <li className="rounded-sm relative">
                                        <Menu>
                                            <Menu.Button className="flex items-center p-2 space-x-3 text-emerald-500 hover:text-emerald-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-packages" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <path d="M7 16.5l-5 -3l5 -3l5 3v5.5l-5 3z"></path>
                                                    <path d="M2 13.5v5.5l5 3"></path>
                                                    <path d="M7 16.545l5 -3.03"></path>
                                                    <path d="M17 16.5l-5 -3l5 -3l5 3v5.5l-5 3z"></path>
                                                    <path d="M12 19l5 3"></path>
                                                    <path d="M17 16.5l5 -3"></path>
                                                    <path d="M12 13.5v-5.5l-5 -3l5 -3l5 3v5.5"></path>
                                                    <path d="M7 5.03v5.455"></path>
                                                    <path d="M12 8l5 -3"></path>
                                                </svg>
                                                <span>Products</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mt-1">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </Menu.Button>
                                            <Menu.Items className='flex flex-col px-5 w-full focus:outline-none'>
                                                {links.map((link) => (
                                                    <Menu.Item key={link.href} as={Fragment} >
                                                        {({ active }) => (
                                                            <a
                                                                href={link.href}
                                                                className={`${active ? 'text-emerald-700 p-2' : 'text-emerald-600 p-2'
                                                                    }`}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-point-filled inline-block mr-2" width="15" height="15" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                                    <path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" strokeWidth="0" fill="currentColor"></path>
                                                                </svg>
                                                                {link.label}
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </Menu.Items>
                                        </Menu>
                                    </li>
                                    <li className="rounded-sm">
                                        <a href="oders" className="flex items-center p-2 space-x-3 text-emerald-500 hover:text-emerald-700 rounded-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="sm:w-6 w-5 sm:h-6 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                            </svg>
                                            <span>Oders</span>
                                        </a>
                                    </li>
                                    <li className="rounded-sm">
                                        <a href="/admin/customers" className="flex items-center p-2 space-x-3 text-emerald-500 hover:text-emerald-700 rounded-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="sm:w-6 w-5 sm:h-6 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                            </svg>
                                            <span>Customers</span>
                                        </a>
                                    </li>
                                    <li className="rounded-sm">
                                        <a href="AdminSetting" className="flex items-center p-2 space-x-3 text-emerald-500 hover:text-emerald-700 rounded-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="sm:w-6 w-5 sm:h-6 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span>Settings</span>
                                        </a>
                                    </li>
                                    <li className="rounded-sm">
                                        <a onClick={handleLogout} className="flex items-center p-2 space-x-3 text-red-500 hover:text-red-700 cursor-pointer rounded-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="sm:w-6 w-5 sm:h-6 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                            </svg>
                                            <span>Logout</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </Drawer>
                    </div>
                </>
            )}
            {/* Drawer end */}
        </>
    )
}

export default AddProduct;
export async function getServerSideProps() {
    try {
        const productRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENPOINT}/product`);
        const productData = await productRes.json();

        const categoryRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENPOINT}/category`);
        const categoryData = await categoryRes.json();

        const searchRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENPOINT}/product/name`);
        const searchData = await searchRes.json();

        const brandRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENPOINT}/brand`);
        const brandData = await brandRes.json();

        return {
            props: {
                productDetails: productData,
                categoryDetails: categoryData,
                searchData: searchData,
                allBrands: brandData,
            },
        };
    } catch (error) {
        console.error('Error fetching products data:', error);
        return {
            props: {
                productDetails: null,
                categoryDetails: null,
                searchData: null,
                allBrands: null,
            },
        };
    }
}