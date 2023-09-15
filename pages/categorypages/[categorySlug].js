import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Productitem from '@/components/Productitem';
import data from '@/utils/data';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CategorySlug = () => {
    const router = useRouter();
    const [categoryData, setCategoryData] = useState(null);

    useEffect(() => {
        const singleCategory = data.find(item => item.categorySlug === router.query.categorySlug);

        if (singleCategory) {
            setCategoryData(singleCategory);
        }
    }, [router.query.categorySlug]);

    return (
        <>
            <Header title={categoryData?.category} />
            <div>
                {categoryData && (
                    <div className='container px-4 py-4 m-auto'>
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
