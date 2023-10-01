import { getError } from "@/utils/error";
import { signIn, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();
    const [error, setError] = useState('');
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { redirect } = router.query;


    useEffect(() => {
        if (session) {
            if (session?.user?.isAdmin) {
                router.push(redirect || '/Admin');
            } else if ((session?.user)) {
                router.push(redirect || '/User');
            }

        }

    }, [session, router, redirect])


    // Regular expression for validating Bangladeshi phone numbers
    const bangladeshiPhoneNumberRegex = /^01[3-9]\d{8}$/;

    const submitHandler = async (formData) => {
        setIsLoading(true);
        const { phone, password } = formData;
        // Check Bangladeshi phone number pattern
        if (!phone.match(bangladeshiPhoneNumberRegex)) {
            setError('Invalid Bangladeshi Phone number');
            return;
        }
        try {
            const result = await signIn('credentials', {
                redirect: false,
                phone,
                password,
            });
            if (result.error) {
                setError("Invalid Phone number or Password")
            }
        } catch (err) {
            setError(getError(err));
        }
        setIsLoading(false);
    };

    return (
        <div className="container m-auto min-h-screen flex items-center sm:justify-between justify-center lg:px-12 md:p-5 p-5 ">
            <Head>
                <title>Login - SellPoint</title>
                <meta name="description" content="Signup page for Your Website" />
            </Head>
            <div className="sm:flex hidden">
                <img src="/login.png" alt="" className="lg:w-[540px] md:w-96 sm:w-72 lg:h-[450px] md:h-80 sm:h-56" />
            </div>

            <div className="bg-slate-100 dark:bg-white/10 p-5 rounded shadow-md shadow-emerald-400 lg:w-[400px] md:w-96 sm:w-80 w-full mx-auto bg-opacity-90">
                {/* Logo */}
                <div className="mx-auto flex justify-center">
                    <a href="/">
                        <img src="/logo.png" alt="E-commerce Logo" className=" w-[200px] h-[60px] mb-4" />
                    </a>
                </div>

                <h2 className="sm:text-2xl text-xl font-semibold mb-4">Login to Your Account</h2>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-emerald-600">
                            Phone
                        </label>
                        <input type="tel" id="phone" placeholder="01XXXXXXXXX"
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
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="dot-spinner">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        ) : (
                            'Login'
                        )}
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
                    <button className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded px-4 py-2 w-full mt-2">
                        Login with Google
                    </button>
                </div>
                <p className="mt-4 md:text-base text-[14px]">
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
