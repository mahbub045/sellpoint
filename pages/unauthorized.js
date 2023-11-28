import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useRouter } from 'next/router';

const Unauthorized = ({ categoryDetails, searchData }) => {
    const router = useRouter();
    const { message } = router.query;
    return (
        <>
            <Header title="Unauthorized Page" categoryDetails={categoryDetails} searchData={searchData} />
            <div className='container flex flex-col items-center justify-center min-h-screen'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-red-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
                </svg>
                <h2 className="mt-4 text-center text-3xl font-semibold text-emerald-600">Access Denied</h2>
                {message &&
                    <div className='mt-1 text-center text-lg font-semibold text-red-500'>{message}</div>
                }
            </div>
            <Footer />
        </>
    )
}
export default Unauthorized;

export async function getServerSideProps() {
    try {
        const categoryRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENPOINT}/category`);
        const categoryData = await categoryRes.json();

        const searchRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENPOINT}/product/name`);
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

