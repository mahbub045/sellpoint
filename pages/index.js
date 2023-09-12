import Carousel from '@/components/Carousel';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Productitem from '@/components/Productitem';
import data from '@/utils/data';

export default function Home() {
  return (
    <>
      <Header title='SellPoint' />
      <Carousel />
      <div className='my-2 container px-4 m-auto'>
        <h2 className='text-3xl font-semibold'>Clothing</h2>
      </div>
      <div className='container px-4 m-auto grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5'>
        {data.products.map((product) => (
          <Productitem product={product} key={product.slug} />
        ))}
      </div>
      <Footer />
    </>
  )
}
