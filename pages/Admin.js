import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

const Admin = () => {
    const router = useRouter();
    const [formValues, setFormValues] = useState([]);
    const [totalUsers, setTotalUsers] = useState([]);
    const handleLogout = () => {
        // Perform logout actions here
        router.push('/login');
        console.log('Logged out successfully!');
    };

    useEffect(() => {
        const storedValues = localStorage.getItem('formValues');
        if (storedValues) {
            setFormValues(JSON.parse(storedValues));

            const numFields = Object.keys(JSON.parse(storedValues)).length;

            // Update the total number of users
            setTotalUsers(numFields);
        } else {
            // If there are no customers, set total users to 0
            setTotalUsers(0);
        }
    }, []);

    return (
        <>
            <Header title='Admin' />
            <div className="container m-auto flex">
                <div className="container flex flex-col h-screen p-3 shadow w-60">
                    <div className="space-y-3">
                        <div className="flex items-center">
                            <h2 className="text-xl font-bold text-emerald-600">Dashboard</h2>
                        </div>
                        <div className="flex-1">
                            <ul className="pt-2 pb-4 space-y-1 text-sm">
                                <li className="rounded-sm">
                                    <a href="Admin" className="flex items-center p-2 space-x-3 text-emerald-500 hover:text-emerald-700 rounded-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                        </svg>
                                        <span>Home</span>
                                    </a>
                                </li>
                                <li className="rounded-sm">
                                    <a href="inbox" className="flex items-center p-2 space-x-3 text-emerald-500 hover:text-emerald-700 rounded-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                        </svg>
                                        <span>Inbox</span>
                                    </a>
                                </li>
                                <li className="rounded-sm">
                                    <a href="oders" className="flex items-center p-2 space-x-3 text-emerald-500 hover:text-emerald-700 rounded-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                        </svg>
                                        <span>Oders</span>
                                    </a>
                                </li>
                                <li className="rounded-sm">
                                    <a href="Customers" className="flex items-center p-2 space-x-3 text-emerald-500 hover:text-emerald-700 rounded-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                        </svg>
                                        <span>Customers</span>
                                    </a>
                                </li>
                                <li className="rounded-sm">
                                    <a href="AdminSetting" className="flex items-center p-2 space-x-3 text-emerald-500 hover:text-emerald-700 rounded-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>Settings</span>
                                    </a>
                                </li>
                                <li className="rounded-sm">
                                    <a onClick={handleLogout} className="flex items-center p-2 space-x-3 text-red-500 hover:text-red-700 cursor-pointer rounded-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                        </svg>
                                        <span>Logout</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container pl-2 mx-auto mt-10">
                    <div className="pb-2">
                        <h2 className="text-2xl text-emerald-600">Manage My Account</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
                        <div className="w-full px-4 py-5 border border-emerald-300 rounded-lg shadow-md shadow-emerald-600">
                            <div className="text-sm font-medium text-emerald-500 truncate">
                                Total Users
                            </div>
                            <div className="mt-1 text-3xl font-semibold dark:text-white">
                                {totalUsers}
                            </div>
                        </div>
                        <div className="w-full px-4 py-5 border border-emerald-300 rounded-lg shadow-md shadow-emerald-600">
                            <div className="text-sm font-medium text-emerald-500 truncate">
                                Total Profit
                            </div>
                            <div className="mt-1 text-3xl font-semibold dark:text-white">
                                $ 40k
                            </div>
                        </div>
                        <div className="w-full px-4 py-5 border border-emerald-300 rounded-lg shadow-md shadow-emerald-600">
                            <div className="text-sm font-medium text-emerald-500 truncate">
                                Total Orders
                            </div>
                            <div className="mt-1 text-3xl font-semibold dark:text-white">
                                2k
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Admin;