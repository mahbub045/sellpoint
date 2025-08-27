"use client";
import Breadcrumb from "@/components/Breadcrumb";
import CartModal from "@/components/CartModal";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Store } from "@/utils/Store";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const generateStars = (rating) => {
  const maxRating = 5;
  const starCount = Math.floor(rating); // Get the integer part of the rating
  const stars = [];

  // Create SVG elements for each star based on the rating
  for (let i = 0; i < maxRating; i++) {
    if (i < starCount) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          fill="yellow"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-3 h-3 inline-block text-yellow-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      );
    } else {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          fill="gray" // Change color for remaining stars
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-3 h-3 inline-block text-gray-400" // Change class for styling
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      );
    }
  }

  return stars;
};
// Create SVG elements for each star based on the rating end

const ProductScreen = ({ productDetails, categoryDetails, searchData }) => {
  const { data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const [product, setProduct] = useState();
  const [activeStatesColorFamily, setActiveStatesColorFamily] = useState([
    false,
    false,
    false,
  ]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("S");
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
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

  // fetch product by slug start
  useEffect(() => {
    const findSingleProduct = () => {
      const singleProduct = productDetails?.map((item) =>
        item?.products?.find((i) => {
          if (i.slug == router.query.slug) {
            setProduct(i);
          }
        })
      );
    };

    findSingleProduct();
  }, [router.query.slug, productDetails]);
  // fetch product by slug start
  //calculate discount
  const [discount, setDiscount] = useState(null);
  useEffect(() => {
    if (product?.price) {
      const discountPercentage = Math.ceil(
        ((product.price - product.discountPrice) / product.price) * 100
      );
      setDiscount(discountPercentage);
    }
  }, [product]);
  //calculate discount end
  // Generate stars
  const stars = generateStars(product?.rating || 0);

  const handleColorButtonClick = (index) => {
    const newActiveStatesColorFamily = activeStatesColorFamily.map(
      (state, i) => i === index
    );
    setActiveStatesColorFamily(newActiveStatesColorFamily);
  };
  const handleSizeButtonClick = (value) => {
    setSelectedSize(value);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const increaseQuantity = () => {
    if (quantity < product.countInStock) {
      setQuantity(quantity + 1);
    }
  };

  // Function to open the cart modal
  const openCartModal = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const newQuantity = quantity; // You may want to use quantity instead of redefining it here
    if (product.countInStock < newQuantity) {
      alert("Sorry, Product is out of stock");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity: newQuantity },
    });
    setIsCartModalOpen(true);
  };

  // Function to close the cart modal
  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const newQuantity = quantity; // You may want to use quantity instead of redefining it here
    if (product.countInStock < newQuantity) {
      alert("Sorry, Product is out of stock");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity: newQuantity },
    });
  };

  // Create breadcrumbs for product page
  const customBreadcrumbs = [
    { href: "/", label: "Home" },
    { href: "/categories", label: "Categories" },
    {
      href: `/categorypages/${product?.categorySlug}`,
      label: product?.category || "Category",
    },
    { label: product?.name || "Product" },
  ];

  return (
    <>
      <Header
        title={product?.name}
        categoryDetails={categoryDetails}
        searchData={searchData}
      />
      <Breadcrumb customBreadcrumbs={customBreadcrumbs} />
      <div className="container mx-auto p-2">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative overflow-hidden">
            <img
              src={product?.image}
              alt={product?.name}
              className="w-full h-[500px] object-cover hover:cursor-zoom-in transition-transform transform hover:scale-150"
            />
          </div>
          <div className="flex flex-col">
            {/* Product Info */}
            <ul className="mb-2">
              <li className="mb-2">
                <h1 className="text-2xl leading-7">{product?.name}</h1>
              </li>
              <li className="text-sm">
                <span className="font-semibold">
                  Sub Category: {product?.subCategory}
                </span>
              </li>
              <li className="text-sm">
                <span className="font-semibold">Brand: </span>
                {product?.brand}
              </li>
              <li className="text-sm">
                <span className="font-semibold">Rating: </span>
                {stars} {/* Display generated stars */}
                <span className="text-xs">({product?.numReviews})</span>
              </li>
            </ul>
            {/* Price */}
            <div className="my-2">
              <h1 className="text-3xl font-semibold">
                <span className="font-extrabold">৳ </span>
                {product?.discountPrice}
              </h1>
              <del className="text-red-600">
                <span className="font-extrabold">৳ </span>
                {product?.price}
              </del>
              <p className="inline-block ml-2 text-sm font-semibold">
                -{discount && discount}% Off
              </p>
            </div>
            <hr className="my-0 border-gray-300 dark:border-gray-800" />
            {/* Color Family */}
            <div className="my-2">
              <h4 className="font-semibold mb-1">Color Family</h4>
              <div className="flex gap-2">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    type="button"
                    className={`relative w-14 h-14 rounded-full overflow-hidden ${
                      activeStatesColorFamily[index]
                        ? "border-2 border-emerald-600"
                        : ""
                    }`}
                    onClick={() => handleColorButtonClick(index)}
                  >
                    <img
                      src={product?.image}
                      alt={product?.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            {/* Size */}
            <div className="my-2">
              <h4 className="font-semibold">Size</h4>
              <div className="flex gap-2">
                <button
                  type="button"
                  className={`px-3 ${
                    selectedSize === "S"
                      ? "bg-emerald-500"
                      : "bg-gray-300 dark:text-black"
                  } rounded`}
                  onClick={() => handleSizeButtonClick("S")}
                >
                  S
                </button>
                <button
                  type="button"
                  className={`px-3 ${
                    selectedSize === "M"
                      ? "bg-emerald-500"
                      : "bg-gray-300 dark:text-black"
                  } rounded`}
                  onClick={() => handleSizeButtonClick("M")}
                >
                  M
                </button>
                <button
                  type="button"
                  className={`px-3 ${
                    selectedSize === "XL"
                      ? "bg-emerald-500"
                      : "bg-gray-300 dark:text-black"
                  } rounded`}
                  onClick={() => handleSizeButtonClick("XL")}
                >
                  XL
                </button>
                <button
                  type="button"
                  className={`px-3 ${
                    selectedSize === "2XL"
                      ? "bg-emerald-500"
                      : "bg-gray-300 dark:text-black"
                  } rounded`}
                  onClick={() => handleSizeButtonClick("2XL")}
                >
                  2XL
                </button>
                <button
                  type="button"
                  className={`px-3 ${
                    selectedSize === "3XL"
                      ? "bg-emerald-500"
                      : "bg-gray-300 dark:text-black"
                  } rounded`}
                  onClick={() => handleSizeButtonClick("3XL")}
                >
                  3XL
                </button>
              </div>
            </div>
            {/* Quantity */}
            <div className="my-2">
              <h4 className="font-semibold">Quantity</h4>
              {product?.countInStock > 0 ? (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="px-5 py-1 font-bold bg-emerald-200 text-black rounded"
                    onClick={decreaseQuantity}
                  >
                    -
                  </button>
                  <input
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    type="text"
                    className="w-28 px-4 py-1 text-center border border-gray-300 rounded"
                    value={quantity}
                    readOnly
                  />
                  <button
                    type="button"
                    className="px-5 py-1 font-bold bg-emerald-400 text-black rounded"
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                </div>
              ) : (
                <div>
                  <button className="bg-slate-400 rounded px-10 py-1 opacity-70">
                    Out Of Stock
                  </button>
                </div>
              )}
            </div>
            {/* Buy Now and Add to Cart buttons */}
            <div className="mt-5 flex flex-col md:flex-row md:justify-between font-semibold">
              <button
                className="w-full md:w-72 mb-2 md:mb-0 md:mr-2 p-2 bg-slate-400 hover:bg-slate-500 dark:text-black rounded"
                onClick={openCartModal}
              >
                Buy Now
              </button>
              {isCartModalOpen && <CartModal onClose={closeCartModal} />}
              <button
                className="w-full md:w-72 p-2 primary-button dark:text-black"
                onClick={addToCartHandler}
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div className="px-5">
            {/* Delivery Information */}
            <div className="my-2">
              <h5 className="font-semibold">Delivery Address</h5>
              <p className="-mt-[2px] text-[10px] text-gray-400 dark:text-gray-700">
                (To Change Address Go To Your Profile!)
              </p>
              {/* address start */}
              {!userDetails ? (
                <p className="text-slate-400 dark:text-slate-600 flex justify-start items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-map-pin-off w-4 h-4"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9.442 9.432a3 3 0 0 0 4.113 4.134m1.445 -2.566a3 3 0 0 0 -3 -3" />
                    <path d="M17.152 17.162l-3.738 3.738a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 0 1 -.476 -10.794m2.18 -1.82a8.003 8.003 0 0 1 10.91 10.912" />
                    <path d="M3 3l18 18" />
                  </svg>
                  <span className="ml-1 text-sm">
                    No Delivery Address Found
                  </span>
                </p>
              ) : (
                <p className="text-sm flex justify-start items-center text-emerald-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  {userDetails.address}
                </p>
              )}
              {/* address end */}
            </div>
            <hr className="border-gray-300 dark:border-gray-800" />
            <div className="my-2">
              <h5 className="font-semibold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 inline-block mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                  />
                </svg>
                COD
              </h5>
              {/* ////////////////// */}
              <p className="flex justify-start items-center text-emerald-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-cash w-4 h-4"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 9m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
                  <path d="M14 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" />
                </svg>
                <span className="ml-1 text-sm">Cash On Delivery Available</span>
              </p>
              <p className="flex justify-start items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-cash-off w-4 h-4"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M13 9h6a2 2 0 0 1 2 2v6m-2 2h-10a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2" />
                  <path d="M12.582 12.59a2 2 0 0 0 2.83 2.826" />
                  <path d="M17 9v-2a2 2 0 0 0 -2 -2h-6m-4 0a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" />
                  <path d="M3 3l18 18" />
                </svg>
                <span className="ml-1 text-sm">
                  Cash On Delivery Not Available
                </span>
              </p>
              {/* ////////////////// */}
            </div>
            <hr className="border-gray-300 dark:border-gray-800" />
            <div className="my-2">
              <h5 className="font-semibold">Service</h5>
              {/* World Wide delivery or BD delivery Start */}
              <p className="flex justify-start items-center text-emerald-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-world w-4 h-4"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                  <path d="M3.6 9h16.8" />
                  <path d="M3.6 15h16.8" />
                  <path d="M11.5 3a17 17 0 0 0 0 18" />
                  <path d="M12.5 3a17 17 0 0 1 0 18" />
                </svg>
                <span className="ml-1 text-sm">
                  World Wide Delivery Available
                </span>
              </p>
              <p className="flex justify-start items-center text-emerald-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-flag w-4 h-4"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 5a5 5 0 0 1 7 0a5 5 0 0 0 7 0v9a5 5 0 0 1 -7 0a5 5 0 0 0 -7 0v-9z" />
                  <path d="M5 21v-7" />
                </svg>
                <span className="ml-1 text-sm">Delivery Inside Bangladesh</span>
              </p>
              {/* World Wide delivery or BD delivery End */}
              {/* 7 Days Returns start */}
              <p className="flex justify-start items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>
                <span className="ml-1 text-sm">7 Days Returns</span>
              </p>
              <p className="text-[9px] text-gray-400 dark:text-gray-700 ml-5 -mt-[2px]">
                Change of mind is not applicable!
              </p>
              {/* 7 Days Returns End */}
              {/* Warranty Start */}
              <p className="flex justify-start items-center text-emerald-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-shield-check-filled w-4 h-4"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M11.998 2l.118 .007l.059 .008l.061 .013l.111 .034a.993 .993 0 0 1 .217 .112l.104 .082l.255 .218a11 11 0 0 0 7.189 2.537l.342 -.01a1 1 0 0 1 1.005 .717a13 13 0 0 1 -9.208 16.25a1 1 0 0 1 -.502 0a13 13 0 0 1 -9.209 -16.25a1 1 0 0 1 1.005 -.717a11 11 0 0 0 7.531 -2.527l.263 -.225l.096 -.075a.993 .993 0 0 1 .217 -.112l.112 -.034a.97 .97 0 0 1 .119 -.021l.115 -.007zm3.71 7.293a1 1 0 0 0 -1.415 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                    strokeWidth="0"
                    fill="currentColor"
                  />
                </svg>
                <span className="ml-1 text-sm">Warranty Available</span>
              </p>
              <p className="flex justify-start items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-shield-off w-4 h-4 "
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M17.67 17.667a12 12 0 0 1 -5.67 3.333a12 12 0 0 1 -8.5 -15c.794 .036 1.583 -.006 2.357 -.124m3.128 -.926a11.997 11.997 0 0 0 3.015 -1.95a12 12 0 0 0 8.5 3a12 12 0 0 1 -1.116 9.376" />
                  <path d="M3 3l18 18" />
                </svg>
                <span className="ml-1 text-sm">Warranty Not Available</span>
              </p>
              {/* Warranty End */}
            </div>
          </div>
        </div>
        <div className="my-2">
          <h1 className="font-semibold text-xl py-4">Description:</h1>
          <p>{product?.description}</p>
        </div>
        <hr className="border-emerald-300 mt-6" />
        <div className="my-2">
          <h1 className="text-xl font-semibold py-4">Coustomer Reviews</h1>
          <div className="pb-5">
            <div>
              <span className="font-semibold">Rating: </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="yellow"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 inline-block text-yellow-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
              <span>{product?.rating}</span>
            </div>
            <button className="text-emerald-600 font-semibold hover:underline">
              Noman Ali
            </button>
            <p className="text-xs font-semibold opacity-80">02-12-2020</p>
            <p className="my-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa
              modi fugiat temporibus, molestiae dignissimos omnis eveniet dicta
              est quas suscipit saepe optio tempora iure ut pariatur quo,
              officiis sed quis autem consectetur provident quaerat. Provident
              aliquam aspernatur nisi natus dignissimos? Tenetur itaque quisquam
              maxime est ratione nostrum omnis molestias. Atque?
            </p>
          </div>
          <hr />
          {/* 2 */}
          <div className="pb-5">
            <div>
              <span className="font-semibold">Rating: </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="yellow"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 inline-block text-yellow-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
              <span>{product?.rating}</span>
            </div>
            <button className="text-emerald-600 font-semibold hover:underline">
              Rana Khan
            </button>
            <p className="text-xs font-semibold opacity-80">02-12-2020</p>
            <p className="my-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa
              modi fugiat temporibus, molestiae dignissimos omnis eveniet dicta
              est quas suscipit saepe optio tempora iure ut pariatur quo,
              officiis sed quis autem consectetur provident quaerat. Provident
              aliquam aspernatur nisi natus dignissimos? Tenetur itaque quisquam
              maxime est ratione nostrum omnis molestias. Atque?
            </p>
          </div>
          <hr />
          {/* 3 */}
          <div className="pb-5">
            <div>
              <span className="font-semibold">Rating: </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="yellow"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 inline-block text-yellow-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
              <span>{product?.rating}</span>
            </div>
            <button className="text-emerald-600 font-semibold hover:underline">
              Jannati Akter
            </button>
            <p className="text-xs font-semibold opacity-80">02-12-2020</p>
            <p className="my-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa
              modi fugiat temporibus, molestiae dignissimos omnis eveniet dicta
              est quas suscipit saepe optio tempora iure ut pariatur quo,
              officiis sed quis autem consectetur provident quaerat. Provident
              aliquam aspernatur nisi natus dignissimos? Tenetur itaque quisquam
              maxime est ratione nostrum omnis molestias. Atque?
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductScreen;

export async function getServerSideProps() {
  try {
    const productRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_ENPOINT}/product`
    );
    const productData = await productRes.json();

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
        productDetails: productData,
        categoryDetails: categoryData,
        searchData: searchData,
      },
    };
  } catch (error) {
    console.error("Error fetching products data:", error);
    return {
      props: {
        productDetails: null,
        categoryDetails: null,
        searchData: null,
      },
    };
  }
}
