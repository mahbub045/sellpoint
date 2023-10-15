"use client";
import CheckoutWizard from "@/components/CheckoutWizard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Store } from "@/utils/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function ShippingScreen({ categoryDetails, searchData }) {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { shippingAddress } = cart;
    const { handleSubmit, register, formState: { errors }, setValue } = useForm();

    useEffect(() => {
        setValue('fullName', shippingAddress.fullName);
        setValue('phone', shippingAddress.phone);
        setValue('address', shippingAddress.address);
        setValue('district', shippingAddress.district);
        setValue('division', shippingAddress.division);
    }, [setValue, shippingAddress])

    const submitHandler = ({ fullName, phone, address, district, division }) => {
        dispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: { fullName, phone, address, district, division },
        });
        Cookies.set(
            'cart',
            JSON.stringify({
                ...cart,
                shippingAddress: { fullName, phone, address, district, division }
            })
        );
        router.push('/payment');
    };
    return (
        <>
            <Header title="Shipping Address" categoryDetails={categoryDetails} searchData={searchData} />
            <div className="container mx-auto px-4 py-2">
                <CheckoutWizard activeStep={1} />
                <form className="max-w-screen-md mx-auto bg-slate-100 dark:bg-slate-950 px-4 py-2 shadow-md shadow-emerald-600 rounded-md" onSubmit={handleSubmit(submitHandler)}>
                    <h2 className="text-xl text-emerald-600 font-medium text-center">Shipping Address</h2>
                    <p className="mb-4 text-center">If needed, you can change your delivery information.</p>
                    {/* full name */}
                    <div className="mb-4">
                        <label className="text-emerald-600 font-semibold" htmlFor="fullName">Full Name</label>
                        <input className="w-full px-3 py-2 text-emerald-700 bg-white border-emerald-200 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm" id="fullName" placeholder="Please enter full name" autoFocus
                            {...register("fullName", {
                                required: "Please enter full name!"
                            })}
                        />
                        {errors.fullName && (
                            <div className="text-red-500">{errors.fullName.message}</div>
                        )}
                    </div>
                    {/* Phone */}
                    <div className="mb-4">
                        <label className="text-emerald-600 font-semibold" htmlFor="phone">Phone Number</label>
                        <input className="w-full px-3 py-2 text-emerald-700 bg-white border-emerald-200 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm" id="phone" placeholder="Please enter your active phone number!" autoFocus
                            {...register("phone", {
                                required: "Please enter your active phone number!"
                            })}
                        />
                        {errors.phone && (
                            <div className="text-red-500">{errors.phone.message}</div>
                        )}
                    </div>
                    {/* Address */}
                    <div className="mb-4">
                        <label className="text-emerald-600 font-semibold" htmlFor="address">Address</label>
                        <textarea className="w-full px-3 py-2 text-emerald-700 bg-white border-emerald-200 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm" id="address" placeholder="Please enter details address!" autoFocus
                            {...register("address", {
                                required: "Please enter details address!"
                            })} />
                        {errors.address && (
                            <div className="text-red-500">{errors.address.message}</div>
                        )}
                    </div>
                    {/* District */}
                    <div className="mb-4">
                        <label className="text-emerald-600 font-semibold" htmlFor="district">District</label>
                        <input className="w-full px-3 py-2 text-emerald-700 bg-white border-emerald-200 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm" id="district" placeholder="Your district" autoFocus
                            {...register("district", {
                                required: "Your district"
                            })}
                        />
                        {errors.district && (
                            <div className="text-red-500">{errors.district.message}</div>
                        )}
                    </div>
                    {/* Division */}
                    <div className="mb-4">
                        <label className="text-emerald-600 font-semibold" htmlFor="division">Division</label>
                        <input className="w-full px-3 py-2 text-emerald-700 bg-white border-emerald-200 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 text-sm" id="division" placeholder="Your division" autoFocus
                            {...register("division", {
                                required: "Your division"
                            })}
                        />
                        {errors.division && (
                            <div className="text-red-500">{errors.division.message}</div>
                        )}
                    </div>
                    <div className="flex justify-center">
                        <button className="w-32 primary-button font-semibold dark:text-black">
                            Next
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[18px] h-[18px] inline-block">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    )
}

ShippingScreen.auth = true;

export async function getServerSideProps() {
    try {
        const categoryRes = await fetch(`http://sellpoint-api.vercel.app/api/v1/category`);
        const categoryData = await categoryRes.json();

        const searchRes = await fetch(`http://sellpoint-api.vercel.app/api/v1/product/name`);
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
