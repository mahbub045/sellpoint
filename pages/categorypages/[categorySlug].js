import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Productitem from '@/components/Productitem';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CategorySlug = ({ productDetails, categoryDetails, searchData }) => {
    const router = useRouter();
    const [categoryData, setCategoryData] = useState(null);


    useEffect(() => {
        const singleCategory = productDetails?.find((item) => item.categorySlug === router.query.categorySlug);

        if (singleCategory) {
            setCategoryData(singleCategory);
        }
    }, [router.query.categorySlug, productDetails]);

    return (
        <>
            <Header title={categoryData?.category} categoryDetails={categoryDetails} searchData={searchData} />
            <div>
                {categoryData && (
                    <div className='container min-h-screen px-4 py-4 m-auto'>
                        <div className='flex justify-center'>
                            <h2 className='text-3xl font-semibold pb-4'>{categoryData?.category}</h2>
                        </div>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5'>
                            {categoryData?.products?.map(product => (
                                <Productitem product={product} key={product.slug} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default CategorySlug;

export async function getServerSideProps() {
    try {
        const productRes = await fetch(`http://sellpoint-api.vercel.app/api/v1/product`);
        const productData = await productRes.json();

        const categoryRes = await fetch(`http://sellpoint-api.vercel.app/api/v1/category`);
        const categoryData = await categoryRes.json();

        const searchRes = await fetch(`http://sellpoint-api.vercel.app/api/v1/product/name`);
        const searchData = await searchRes.json();
        return {
            props: {
                productDetails: productData,
                categoryDetails: categoryData,
                searchData: searchData,
            },
        };
    } catch (error) {
        console.error('Error fetching products data:', error);
        return {
            props: {
                productDetails: null,
                categoryDetails: null,
                searchData: null
            },
        };
    }
}

