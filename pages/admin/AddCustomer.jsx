'use client';
import { useForm } from 'react-hook-form';

const AddCustomer = ({ onClose }) => {
    const { handleSubmit, control, register, watch, formState: { errors } } = useForm();

    // Regular expression for validating Bangladeshi phone numbers
    const bangladeshiPhoneNumberRegex = /^01[3-9]\d{8}$/;

    const onSubmit = (e) => {
        // Check matches the Bangladeshi phone number pattern
        if (!e.phone.match(bangladeshiPhoneNumberRegex)) {
            setError('Invalid Bangladeshi Phone number');
            return;
        }
        // Perform actions with form data, like sending to an API, etc.
        // console.log('Category:', category);
        // console.log('Category Slug:', categorySlug);
    }

    return (
        <div className="fixed mt-0 inset-5 flex items-center justify-center z-50">
            <div className="bg-black opacity-60 inset-0 fixed"></div>
            <div className="bg-white/95 dark:bg-black/95 border border-emerald-600 shadow-lg shadow-emerald-600 p-4 rounded-md z-50 relative max-w-md w-full">
                <div className="flex justify-end">
                    <button onClick={onClose} className='rounded-lg hover:text-red-600 p-1 hover:bg-slate-200' >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div>
                    <div className="text-center">
                        <h2 className="font-semibold text-xl text-emerald-600 mb-8">Add New Customer</h2>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="my-4">
                            <label htmlFor="name" className="mr-[38px]" >
                                Name
                                <span className="text-red-500">*</span>:
                            </label>
                            <input type="text" id="name" placeholder="Enter Your Full Name"
                                {...register('name', {
                                    required: 'Please Enter Your Full Name!',
                                })}
                                className="w-3/5 px-3 py-2 text-emerald-700 dark:text-white border-emerald-500 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                            />
                        </div>
                        <div className="my-4">
                            <label htmlFor="phone" className="mr-9" >
                                Phone
                                <span className="text-red-500">*</span>:
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                placeholder="Enter Your Phone Number"
                                {...register('phone', {
                                    required: 'Please Enter Your Phone Number!',
                                    pattern: {
                                        value: bangladeshiPhoneNumberRegex,
                                        message: 'Invalid Bangladeshi Phone number format',
                                    },
                                })}
                                className="w-3/5 px-3 py-2 text-emerald-700 dark:text-white border-emerald-500 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                            />
                            {errors.phone && (
                                <div className="text-red-500 ">{errors.phone.message}</div>
                            )}
                        </div>
                        <div className="my-4">
                            <label htmlFor="email" className="mr-11" >
                                Email
                                <span className="text-red-500">*</span>:
                            </label>
                            <input
                                type="email"
                                id="name"
                                placeholder="Enter Your Valid Email"
                                {...register('name', {
                                    required: 'Please Enter Your Valid Email!',
                                })}
                                className="w-3/5 px-3 py-2 text-emerald-700 dark:text-white border-emerald-500 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                            />
                        </div>
                        <div className="my-4">
                            <label htmlFor="password" className="mr-4" >
                                Password
                                <span className="text-red-500">*</span>:
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter password"
                                {...register('password', {
                                    required: 'Please Enter Valid Password!',
                                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                                })}
                                className="w-3/5 px-3 py-2 text-emerald-700 dark:text-white border-emerald-500 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                            />
                            {errors.password && (
                                <div className="text-red-500 ">{errors.password.message}</div>
                            )}
                        </div>
                        <div className="text-center">
                            <button type="submit" className="primary-button dark:text-black">Submit</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCustomer;