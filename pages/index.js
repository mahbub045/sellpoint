import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Productitem from "@/components/Productitem";

const Home = ({ productDetails, categoryDetails, searchData }) => {
  return (
    <>
      <Header
        title="SellPoint"
        categoryDetails={categoryDetails}
        searchData={searchData}
      />
      <Carousel />
      <div>
        {productDetails &&
          productDetails?.map((item, index) => (
            <div className="container px-4 py-4 m-auto" key={index}>
              {item?.products != 0 && (
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-semibold pb-4">
                    {item.category}
                  </h2>
                  <a
                    href={`/categorypages/${item.categorySlug}`}
                    className="text-emerald-600 hover:underline"
                  >
                    See more...
                  </a>
                </div>
              )}
              <div className=" grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
                {item?.products?.slice(0, 5).map((product) => (
                  <Productitem product={product} key={product.slug} />
                ))}
              </div>
            </div>
          ))}
      </div>
      <Footer />
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  try {
    const productRes = await fetch(
      `http://sellpoint-api.vercel.app/api/v1/product`
    );
    const productData = await productRes.json();

    const categoryRes = await fetch(
      `http://sellpoint-api.vercel.app/api/v1/category`
    );
    const categoryData = await categoryRes.json();

    const searchRes = await fetch(
      `http://sellpoint-api.vercel.app/api/v1/product/name`
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
