"use client";
import Breadcrumb from "@/components/Breadcrumb";
import CheckoutWizard from "@/components/CheckoutWizard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Store } from "@/utils/Store";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function ShippingScreen({ categoryDetails, searchData }) {
  const router = useRouter();
  const { data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const [userDetails, setUserDetails] = useState();
  const id = session?.user?._id;
  const url = process.env.NEXT_PUBLIC_URL;

  const fetchData = async (id) => {
    const response = await fetch(`${url}/api/users/${id}`);
    const data = await response.json();
    return data;
  };
  if (!userDetails?.phone) {
    fetchData(id).then((result) => {
      setUserDetails(result);
    });
  }

  // Add a new state to manage the input values
  const [fullNameValue, setFullNameValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [addressValue, setAddressValue] = useState("");

  // Set input values when userDetails is available
  useEffect(() => {
    if (userDetails) {
      setFullNameValue(userDetails.name || "");
      setPhoneValue(userDetails.phone || "");
      setAddressValue(userDetails.address || "");
    }
  }, [userDetails]);

  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("phone", shippingAddress.phone);
    setValue("address", shippingAddress.address);
    setValue("district", shippingAddress.district);
    setValue("division", shippingAddress.division);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, phone, address, district, division }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, phone, address, district, division },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: { fullName, phone, address, district, division },
      })
    );
    router.push("/payment");
  };

  const customBreadcrumbs = [
    { href: "/", label: "Home" },
    { label: "Cart" },
    { label: "Shipping Address" },
  ];

  return (
    <>
      <Header
        title="Shipping Address"
        categoryDetails={categoryDetails}
        searchData={searchData}
      />
      <Breadcrumb customBreadcrumbs={customBreadcrumbs} />
      <div className="container mx-auto px-4 py-2">
        <CheckoutWizard activeStep={1} />
        <form
          className="max-w-screen-md mx-auto bg-slate-100 dark:bg-slate-950 px-4 py-2 shadow-md shadow-emerald-600 rounded-md"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h2 className="sm:text-xl text-base text-emerald-600 font-medium text-center">
            Shipping Address
          </h2>
          <p className="sm:text-base text-sm mb-4 text-center">
            If needed, you can change your delivery information.
          </p>

          {/* -------------------name and phone---------------------- */}
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-3 mb-4">
            {/* name */}
            <div>
              <label
                className="sm:text-base text-sm text-emerald-600 font-semibold"
                htmlFor="fullName"
              >
                Full Name*
              </label>
              <input
                className="w-full px-3 py-2 text-emerald-700 bg-white border-emerald-200 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 sm:text-base text-xs"
                id="fullName"
                placeholder="Please enter full name"
                autoFocus
                {...register("fullName", {
                  required: "Please enter full name!",
                })}
                value={fullNameValue}
                onChange={(e) => setFullNameValue(e.target.value)}
              />
              {errors.fullName && (
                <div className="text-red-500">{errors.fullName.message}</div>
              )}
            </div>
            {/* phone */}
            <div>
              <label
                className="sm:text-base text-sm text-emerald-600 font-semibold"
                htmlFor="phone"
              >
                Phone Number*
              </label>
              <input
                className="w-full px-3 py-2 text-emerald-700 bg-white border-emerald-200 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 sm:text-base text-xs"
                id="phone"
                placeholder="Please enter your active phone number!"
                autoFocus
                {...register("phone", {
                  required: "Please enter your active phone number!",
                })}
                value={phoneValue}
                onChange={(e) => setPhoneValue(e.target.value)}
              />
              {errors.phone && (
                <div className="text-red-500">{errors.phone.message}</div>
              )}
            </div>
          </div>
          {/* -------------------name and phone----------------------- */}
          {/* Address */}
          <div className="mb-4">
            <label
              className="sm:text-base text-sm text-emerald-600 font-semibold"
              htmlFor="address"
            >
              Address*
            </label>
            <textarea
              className="w-full px-3 py-2 text-emerald-700 bg-white border-emerald-200 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 sm:text-base text-xs"
              id="address"
              placeholder="Please enter details address!"
              autoFocus
              {...register("address", {
                required: "Please enter details address!",
              })}
              value={addressValue}
              onChange={(e) => setAddressValue(e.target.value)}
            />
            {errors.address && (
              <div className="text-red-500">{errors.address.message}</div>
            )}
          </div>
          {/* ---------------district and division----------------- */}
          <div className="grid grid-cols-2 gap-5 mb-4">
            {/* Division */}
            <div>
              <label
                className="sm:text-base text-sm text-emerald-600 font-semibold"
                htmlFor="division"
              >
                Division*
              </label>
              <select
                className="w-full px-3 py-2 text-emerald-700 bg-white border-emerald-200 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 sm:text-base text-xs"
                id="division"
                {...register("division", {
                  required: "Please select your division",
                })}
              >
                <option value="" disabled>
                  Select Division
                </option>
                <option value="Barishal">Barishal</option>
                <option value="Chattogram">Chattogram</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Khulna">Khulna</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Mymensingh">Mymensingh</option>
                <option value="Sylhet">Sylhet</option>
              </select>
              {errors.division && (
                <div className="text-red-500">{errors.division.message}</div>
              )}
            </div>
            {/* District */}
            <div>
              <label
                className="sm:text-base text-sm text-emerald-600 font-semibold"
                htmlFor="district"
              >
                District*
              </label>
              <select
                className="w-full px-3 py-2 text-emerald-700 bg-white border-emerald-200 rounded-md focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40 sm:text-base text-xs"
                id="district"
                {...register("district", {
                  required: "Please select your district",
                })}
              >
                <option value="" disabled>
                  Select District
                </option>
                <option value="Dhaka">Dhaka</option>
                <option value="Faridpur">Faridpur</option>
                <option value="Gazipur">Gazipur</option>
                <option value="Gopalganj">Gopalganj</option>
                <option value="Jamalpur">Jamalpur</option>
                <option value="Kishoreganj">Kishoreganj</option>
                <option value="Madaripur">Madaripur</option>
                <option value="Manikganj">Manikganj</option>
                <option value="Munshiganj">Munshiganj</option>
                <option value="Mymensingh">Mymensingh</option>
                <option value="Narayanganj">Narayanganj</option>
                <option value="Narsingdi">Narsingdi</option>
                <option value="Netrokona">Netrokona</option>
                <option value="Rajbari">Rajbari</option>
                <option value="Shariatpur">Shariatpur</option>
                <option value="Sherpur">Sherpur</option>
                <option value="Tangail">Tangail</option>
                <option value="Bogra">Bogra</option>
                <option value="Joypurhat">Joypurhat</option>
                <option value="Naogaon">Naogaon</option>
                <option value="Natore">Natore</option>
                <option value="Nawabganj">Nawabganj</option>
                <option value="Pabna">Pabna</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Sirajgonj">Sirajgonj</option>
                <option value="Dinajpur">Dinajpur</option>
                <option value="Gaibandha">Gaibandha</option>
                <option value="Kurigram">Kurigram</option>
                <option value="Lalmonirhat">Lalmonirhat</option>
                <option value="Nilphamari">Nilphamari</option>
                <option value="Panchagarh">Panchagarh</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Thakurgaon">Thakurgaon</option>
                <option value="Barguna">Barguna</option>
                <option value="Barisal">Barisal</option>
                <option value="Bhola">Bhola</option>
                <option value="Jhalokati">Jhalokati</option>
                <option value="Patuakhali">Patuakhali</option>
                <option value="Pirojpur">Pirojpur</option>
                <option value="Bandarban">Bandarban</option>
                <option value="Brahmanbaria">Brahmanbaria</option>
                <option value="Chandpur">Chandpur</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Comilla">Comilla</option>
                <option value="Cox's Bazar">Cox&apos;s Bazar</option>
                <option value="Feni">Feni</option>
                <option value="Khagrachari">Khagrachari</option>
                <option value="Lakshmipur">Lakshmipur</option>
                <option value="Noakhali">Noakhali</option>
                <option value="Rangamati">Rangamati</option>
                <option value="Habiganj">Habiganj</option>
                <option value="Maulvibazar">Maulvibazar</option>
                <option value="Sunamganj">Sunamganj</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Bagerhat">Bagerhat</option>
                <option value="Chuadanga">Chuadanga</option>
                <option value="Jessore">Jessore</option>
                <option value="Jhenaidah">Jhenaidah</option>
                <option value="Khulna">Khulna</option>
                <option value="Kushtia">Kushtia</option>
                <option value="Magura">Magura</option>
                <option value="Meherpur">Meherpur</option>
                <option value="Narail">Narail</option>
                <option value="Satkhira">Satkhira</option>
              </select>
              {errors.district && (
                <div className="text-red-500">{errors.district.message}</div>
              )}
            </div>
          </div>
          {/* ---------------district and division----------------- */}
          <div className="flex justify-center">
            <button className="w-32 primary-button font-semibold dark:text-black">
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-[18px] h-[18px] inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

ShippingScreen.auth = true;

export async function getServerSideProps() {
  try {
    const categoryRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_ENPOINT}/category`
    );
    const categoryData = await categoryRes.json();

    const searchRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_ENPOINT}/product/name`
    );
    const searchData = await searchRes.json();
    return {
      props: {
        categoryDetails: categoryData,
        searchData: searchData,
      },
    };
  } catch (error) {
    console.error("Error fetching products data:", error);
    return {
      props: {
        categoryDetails: null,
        searchData: null,
      },
    };
  }
}
