import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Store } from "@/utils/Store";
import Cookies from "js-cookie";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

const User = () => {
    const [userDetails, setUserDetails] = useState();
    const { data: session } = useSession();
    const { dispatch } = useContext(Store);
    const router = useRouter();
    const id = session?.user?._id;

    const fetchData = async (id) => {
        // const response = await fetch(`https://sp-demo045.netlify.app/api/users/${id}`);
        const response = await fetch(`http://localhost:3000/api/users/${id}`);
        const data = await response.json();
        return data;
    }
    if (!userDetails?.address) {
        fetchData(id).then((result) => {
            setUserDetails(result);
        });
    }
    const handleLogout = () => {
        Cookies.remove('cart');
        dispatch({ type: 'CART_RESET' })
        signOut({ callbackUrl: '/login' });
    };
    return (
        <>
            <Header title={`${session?.user?.name}`} />
            <div className="container mx-auto min-h-screen flex flex-col sm:flex-row">
                <div className="bg-slate-200 dark:bg-slate-950 shadow border-r border-slate-400 dark:border-stone-500 rounded p-2 w-full sm:w-1/4">
                    {/* ... Dashboard menu code ... */}
                    <div className="flex md:justify-start justify-center">
                        <h2 className="sm:text-xl text-lg font-bold text-emerald-600">Dashboard</h2>
                    </div>
                    <div className="flex md:justify-start justify-center">
                        <ul className="pt-2 pb-4 space-y-1 sm:text-sm text-xs">
                            <li className="rounded-sm">
                                <a href="User" className="flex items-center p-2 space-x-3 text-emerald-500 hover:text-emerald-700 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="sm:w-6 w-5 sm:h-6 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                    <span>My Account</span>
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
                            <li className="rounded-sm">
                                <a href="UserOders" className="flex items-center p-2 space-x-3 text-emerald-500 hover:text-emerald-700 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="sm:w-6 w-5 sm:h-6 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>
                                    <span>My Oders</span>
                                </a>
                            </li>
                            <li className="rounded-sm">
                                <a href="MyReviews" className="flex items-center p-2 space-x-3 text-emerald-500 hover:text-emerald-700 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="sm:w-6 w-5 sm:h-6 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                    </svg>

                                    <span>My Reviews</span>
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
                <div className="container p-2 mx-auto md:mt-5 mt-2">
                    {/* ... Manage My Account code ... */}
                    <div className="pb-2">
                        <h2 className="md:text-2xl sm:text-xl text-base text-emerald-600">Manage My Account</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
                        <div className="w-full px-4 py-5 border border-emerald-300 rounded-lg shadow-md shadow-emerald-600">
                            <div className="text-sm font-medium text-emerald-500 truncate">
                                Personal Profile
                            </div>
                            <div className="mt-1 text-sm dark:text-white">
                                <p>{userDetails?.name}</p>
                                <p>{userDetails?.email}</p>
                                <p>{userDetails?.phone}</p>
                            </div>
                        </div>
                        <div className="w-full px-4 py-5 border border-emerald-300 rounded-lg shadow-md shadow-emerald-600">
                            <div className="text-sm font-medium text-emerald-500 truncate">
                                Address Book
                            </div>
                            <div className="mt-1 text-sm dark:text-white">
                                <p>{userDetails?.name}</p>
                                <p>{userDetails?.address}</p>
                                <p>{userDetails?.phone}</p>
                            </div>
                        </div>
                        <div className="w-full px-4 py-5 border border-emerald-300 rounded-lg shadow-md shadow-emerald-600">
                            <div className="text-sm font-medium text-emerald-500 truncate">
                                Total Orders
                            </div>
                            <div className="mt-1 text-3xl font-semibold dark:text-white">
                                102
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-4 mx-auto">
                <div className="p-2">
                    <h2 className="text-xl text-emerald-600">Recent Orders</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse border border-emerald-600">
                        {/* ... table content ... */}
                        <thead>
                            <tr className="bg-emerald-500 text-white">
                                <th className="px-6 py-3">Order #</th>
                                <th className="px-6 py-3">Placed On</th>
                                <th className="px-6 py-3">Items</th>
                                <th className="px-6 py-3">Total Cost</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Replace the following rows with your actual order data */}
                            <tr className=" text-center">
                                <td className="border px-6 py-4">#12345</td>
                                <td className="border px-6 py-4">2023-09-05</td>
                                <td className="border px-6 py-4">3 items</td>
                                <td className="border px-6 py-4">$100.00</td>
                                <td className="border px-6 py-4">
                                    <button className="bg-emerald-500 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg">View</button>
                                </td>
                            </tr>
                            <tr className=" text-center">
                                <td className="border px-6 py-4">#12346</td>
                                <td className="border px-6 py-4">2023-09-04</td>
                                <td className="border px-6 py-4">2 items</td>
                                <td className="border px-6 py-4">$75.00</td>
                                <td className="border px-6 py-4">
                                    <button className="bg-emerald-500 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg">View</button>
                                </td>
                            </tr>
                            {/* Add more rows for each order */}
                        </tbody>


                    </table>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default User;
