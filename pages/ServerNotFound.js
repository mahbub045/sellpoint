import Footer from '@/components/Footer';
import Header from '@/components/Header';

const ServerNotFound = () => {
    return (
        <>
            <Header title={'Server Down'} />
            <div className='flex flex-col items-center justify-center h-screen bg-black'>
                <div className='text-center'>
                    <h1 className='text-4xl text-white mb-4'>Server Down</h1>
                    <h1 className='text-white text-9xl'>500</h1>
                    <p className='text-xl text-white'>This page is still being built. We are sorry for the trouble. Try one more later, please.</p>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ServerNotFound;
