import Head from 'next/head';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

const Signup = () => {
    // Regular expression for validating Bangladeshi phone numbers
    const bangladeshiPhoneNumberRegex = /^01[3-9]\d{8}$/;

    const { handleSubmit, control, register, watch, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // Check matches the Bangladeshi phone number pattern
        if (!data.phone.match(bangladeshiPhoneNumberRegex)) {
            setError('Invalid Bangladeshi Phone number');
            return;
        }
        // Store the signup data in local storage
        localStorage.setItem('users', JSON.stringify(data));
        window.location.href = '/login';
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: 'url("/images/background-image.jpg")',
            }}>
            <Head>
                <title>Signup - SellPoint</title>
                <meta name="description" content="Signup page for SellPoint" />
            </Head>
            <div className="bg-white dark:bg-black/70 p-8 rounded shadow-md bg-opacity-90 w-96">
                <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-emerald-600">
                            Full Name
                        </label>
                        <input type="text" id="name" placeholder="Enter your full name"
                            {...register('name', {
                                required: 'Please enter your name',
                            })}
                            className="w-full px-3 py-2 text-emerald-700 bg-white border-emerald-200 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-emerald-600">
                            Phone
                        </label>
                        <input type="tel" id="phone" placeholder="Enter Bangladeshi phone number"
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
                        <label htmlFor="email" className="block text-emerald-600">
                            Email Address
                        </label>
                        <input type="email" id="email" placeholder="Enter your email address"
                            {...register('email', {
                                required: 'Please enter your email address',
                            })}
                            className="w-full px-3 py-2 text-emerald-700 bg-white border-emerald-200 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                        />
                        {errors.email && (
                            <div className="text-red-500 ">{errors.email.message}</div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-emerald-600">
                            Password
                        </label>
                        <input type="password" id="password" placeholder="Enter password"
                            {...register('password', {
                                required: 'Please enter password',
                                minLength: { value: 6, message: 'Password must be at least 6 characters' }
                            })}
                            className="w-full px-3 py-2 text-emerald-700 bg-white border-emerald-200 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                        />
                        {errors.password && (
                            <div className="text-red-500 ">{errors.password.message}</div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-emerald-600">
                            Confirm Password
                        </label>
                        <input type="password" id="confirmPassword" placeholder="Confirm password"
                            {...register('confirmPassword', {
                                required: 'Please confirm your password',
                                validate: (value) => value === watch('password') || 'Passwords do not match'
                            })}
                            className="w-full px-3 py-2 text-emerald-700 bg-white border-emerald-200 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                        />
                        {errors.confirmPassword && (
                            <div className="text-red-500 ">{errors.confirmPassword.message}</div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded px-4 py-2 w-full"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 sm:text-base text-[15px]">
                    Already have an account?{' '}
                    <Link legacyBehavior href="/login">
                        <a className="text-blue-500 hover:underline">Login here</a>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
