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
      <div>
        {
          data && data?.map((item, index) => (
            <div className='container px-4 py-4 m-auto' key={index}>
              <div className='flex justify-between'>
                <h2 className='text-3xl font-semibold pb-4'>{item.category}</h2>
                <a href={`/categorypages/${item.categorySlug}`} className='text-emerald-600 hover:underline'>See more...</a>
              </div>
              <div className=' grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5'>
                {item?.products?.slice(0, 5).map((product) => (
                  <Productitem product={product} key={product.slug} />
                ))}
              </div>
            </div>
          ))
        }
      </div>
      <Footer />
    </>
  )
}
