import Drawer from '@/components/Drawer';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Store } from '@/utils/Store';
import { Menu } from '@headlessui/react';
import Cookies from 'js-cookie';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Fragment, useContext, useState } from "react";
import ReactPaginate from 'react-paginate';
import AddCategory from './AddCategory';

const Categories = ({ categoryDetails, searchData }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();
    const { dispatch } = useContext(Store);

    const handleToggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    // Function to open the Add Category modal
    const openAddCategory = () => {
        setIsAddCategoryOpen(true);
    };
    // Function to close the Add Category modal
    const closeAddCategory = () => {
        setIsAddCategoryOpen(false);
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

    /////category search//////
    //For category search state
    const [searchCategory, setSearchCategory] = useState('');
    const [dataToShow, setDataToShow] = useState('');

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchCategory(value);

        const filteredData = categoryDetails.map((item) => {
            let filteredCategories = [];

            if (Array.isArray(item.categories)) {
                filteredCategories = item.categories.filter((category) =>
                    category.toLowerCase().includes(value)
                );
            }

            return {
                ...item,
                categories: filteredCategories,
            };
        });

        setDataToShow(filteredData);
    };
    /////category search end//////

    ////////for table pagination///////
    const [currentPage, setCurrentPage] = useState(0);
    const categoriesPerPage = 10; // Number of categories to display per page

    const indexOfLastProduct = (currentPage + 1) * categoriesPerPage;
    const indexOfFirstProduct = indexOfLastProduct - categoriesPerPage;
    const currentCategories = categoryDetails
        .flat() // Flatten the array of categories
        .filter((item) =>
            item.category.toLowerCase().includes(searchCategory.toLowerCase())
        ); // Filter categories based on search query

    const paginatedCategories = currentCategories.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );
    const totalPages = Math.ceil(currentCategories.length / categoriesPerPage);

    // Function to handle page change
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
    ////////for table pagination end///////

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
                <div className="w-full p-4">
                    <div className="pb-2 flex justify-between">
                        <div>
                            <h2 className="text-2xl text-emerald-600">All Category</h2>
                        </div>
                        {/* Category Search start */}
                        <div className="relative w-full md:w-auto">
                            <input
                                type="text"
                                placeholder="Search by Name"
                                value={searchCategory}
                                onChange={handleSearch}
                                className="text-emerald-700 dark:text-white border-emerald-500 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm w-full md:w-auto"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-500 dark:text-white"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        {/* Category Search end */}
                        <div>
                            <button
                                onClick={openAddCategory}
                                className="primary-button dark:text-black flex sm:text-base text-xs ml-auto"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Add New Category
                            </button>
                        </div>
                        {/* Render the CartModal if isCartModalOpen is true */}
                        {isAddCategoryOpen && <AddCategory onClose={closeAddCategory} />}
                    </div>
                    <div className="flex flex-col">
                        <div className="overflow-x-auto">
                            <div className="inline-block min-w-full py-2">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-center text-sm font-light">
                                        <thead className="border-b font-medium dark:border-emerald-500">
                                            <tr>
                                                <th scope="col" className="px-6 py-4">#</th>
                                                <th scope="col" className="px-6 py-4">Category Name</th>
                                                <th scope="col" className="px-6 py-4">Category Slug</th>
                                                <th scope="col" className="px-6 py-4">
                                                    Action
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-settings inline-block ml-1" width="15" height="15" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paginatedCategories && paginatedCategories?.map((item, index) => (
                                                <tr className="border-b transition duration-300 ease-in-out hover:bg-emerald-50 dark:hover:bg-neutral-900 dark:border-emerald-500"
                                                    key={index}
                                                >
                                                    <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">{item.category}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">{item.categorySlug}</td>
                                                    <td className="whitespace-nowrap px-6 py-4 flex justify-center gap-4">
                                                        <a href="" className='dark:text-white' title='Edit'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 hover:text-emerald-600 transition">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                            </svg>
                                                        </a>
                                                        <button
                                                            title='Delete'
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 hover:text-red-600 transition">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                        </button>

                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {/* pagination serial number */}
                                    <ReactPaginate
                                        previousLabel={
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                            </svg>
                                        }
                                        nextLabel={
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                            </svg>
                                        }
                                        breakLabel={'...'}
                                        pageCount={totalPages}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={handlePageClick}
                                        containerClassName={'flex justify-end items-center gap-x-1 my-8'}
                                        pageLinkClassName={' px-3 py-1 rounded-md dark:text-white text-black transition-all duration-300 border border-gray-400'}
                                        activeClassName={'bg-emerald-500 text-white  px-0 py-1 rounded-md transition-all duration-300 hover:bg-emerald-600'}
                                        previousClassName={'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 px-3 py-1 rounded-md transition-all duration-300'}
                                        nextClassName={'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 px-3 py-1 rounded-md mx-1 transition-all duration-300'}
                                        disabledClassName={'text-gray-400 dark:text-gray-600 px-3 py-1 rounded-md cursor-not-allowed'}
                                    />
                                    {/* pagination serial number end */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

export default Categories;

export async function getServerSideProps() {
    try {
        const categoryRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENPOINT}/category`);
        const categoryData = await categoryRes.json();

        const searchRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENPOINT}/product/name`);
        const searchData = await searchRes.json();
        return {
            props: {
                categoryDetails: categoryData,
                searchData: searchData,
            },
        };
    } catch (error) {
        console.error('Error fetching products data:', error);
        return {
            props: {
                categoryDetails: null,
                searchData: null
            },
        };
    }
}