import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Productitem from "@/components/Productitem";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Search = () => {
    const router = useRouter();
    const [searchData, setSearchData] = useState(null);
    //for get productDetails
    const [productDetails, setProductDetails] = useState(null);

    //for get productDetails
    useEffect(() => {
        const fetchProductsData = async () => {
            try {
                const response = await axios.get('https://raw.githubusercontent.com/mahbub045/sellPointApi/main/productDetails.json');
                setProductDetails(response.data);
            } catch (error) {
                console.error('Error fetching products data:', error);
            }
        }
        fetchProductsData();
    }, []);
    //for get productDetails end

    useEffect(() => {
        const productName = router.query.name?.toLowerCase();

        if (productName && productDetails) { //check for productDetails
            const searchResults = productDetails.filter(item => {
                return item.products.some(product =>
                    product.name.toLowerCase().includes(productName)
                );
            });

            setSearchData(searchResults);
        }
    }, [router.query.name, productDetails]);


    return (
        <>
            <Header />
            <div className="min-h-screen">
                <div>
                    {searchData && searchData?.length > 0 ? (
                        <div className='container px-4 py-4 m-auto'>
                            <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5'>
                                {searchData?.map(item => (
                                    item?.products?.map(product => (
                                        <Productitem product={product} key={product.name} />
                                    ))
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className='container h-screen mx-auto flex flex-col justify-center items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-52 h-52">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                            <h2 className="text-3xl text-red-600">Sorry!</h2>
                            <p className='text-2xl font-bold text-emerald-500'>Product Not Found!</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Search;
