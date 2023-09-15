import userData from "@/utils/userData";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Login = ({ user }) => {
    const [error, setError] = useState('');
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();

    // Regular expression for validating Bangladeshi phone numbers
    const bangladeshiPhoneNumberRegex = /^01[3-9]\d{8}$/;

    const submitHandler = (formData) => {
        const { phone, password } = formData;

        // Check Bangladeshi phone number pattern
        if (!phone.match(bangladeshiPhoneNumberRegex)) {
            setError('Invalid Bangladeshi Phone number');
            return;
        }

        const findUserForLogin = (phone, password) => {
            for (const categoryData of userData) {
                if (categoryData.users) {
                    for (const user of categoryData.users) {
                        if (user.phone === phone && user.password === password) {
                            return user;
                        }
                    }
                }
            }
            return null; // Return null if no matching user is found
        };
        const user = findUserForLogin(phone, password);
        if (user) {
            if (user.isAdmin) {
                router.push('/Admin');
            } else {
                router.push('/User');
            }
        } else {
            {
                const storedUser = JSON.parse(localStorage.getItem('users'));
                if (storedUser && storedUser.phone === phone && storedUser.password === password) {
                    router.push('/User');
                } else {
                    setError('Invalid Phone number or Password');
                }
            }
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: 'url("/images/background-image.jpg")',
            }}>
            <Head>
                <title>Login - SellPoint</title>
                <meta name="description" content="Signup page for Your Website" />
            </Head>
            <div className="bg-white dark:bg-black/70 p-8 rounded shadow-md w-96 mx-auto bg-opacity-90">
                {/* Logo */}
                <a href="/">
                    <img src="/logo.png" alt="E-commerce Logo" className="mx-auto w-[200px] h-[60px] mb-4" />
                </a>
                <h2 className="text-2xl font-semibold mb-4">Login to Your Account</h2>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-emerald-600">
                            Phone
                        </label>
                        <input type="tel" id="phone" placeholder="Enter your phone number"
                            {...register('phone', {
                                required: 'Please enter your phone number!',
                                pattern: {
                                    value: bangladeshiPhoneNumberRegex,
                                    message: 'Invalid Bangladeshi Phone number format',
                                },
                            })}
                            className="w-full px-3 py-2 text-emerald-700 bg-white border-emerald-200 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                        />
                        {errors.phone && (
                            <div className="text-red-500 ">{errors.phone.message}</div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-emerald-600">
                            Password
                        </label>
                        <input type="password" id="password" placeholder="Enter password"
                            {...register('password', {
                                required: 'Please enter password',
                                minLength: { value: 6, message: 'Password is more than 5 Characters!' }
                            })}
                            className="w-full px-3 py-2 text-emerald-700 bg-white border-emerald-200 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                        />
                        {errors.password && (
                            <div className="text-red-500 ">{errors.password.message}</div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded px-4 py-2 w-full"
                    >
                        Login
                    </button>
                    {error && (
                        <div className="text-red-500 ">{error}</div>
                    )}
                </form>
                <div className="mt-4">
                    <a href="/forgot-password" className="text-blue-500 hover:underline">
                        Forgot Password?
                    </a>
                </div>
                <div className="mt-4">
                    <p>Or</p>
                    <button className="custom-gradient text-white font-semibold rounded px-4 py-2 w-full mt-2">
                        Login with Google
                    </button>
                </div>
                <p className="mt-4 sm:text-base text-[15px]">
                    <span>Don&apos;t have an account? </span>
                    <a href="/signup" className="text-blue-500 hover:underline">
                        Sign up here.
                    </a>
                </p>
            </div>
        </div>
    );
};

export default dynamic(() => Promise.resolve(Login), { ssr: false });
