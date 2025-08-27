import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Productitem from "@/components/Productitem";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Search = ({ productDetails, categoryDetails, searchData }) => {
  const router = useRouter();
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const productName = router.query.name?.toLowerCase();

    if (productName && productDetails) {
      //check for productDetails
      const productSearchResults = productDetails.filter((item) => {
        return item.products.some((product) =>
          product.name.toLowerCase().includes(productName)
        );
      });

      setProductData(productSearchResults);
    }
  }, [router.query.name, productDetails]);

  const customBreadcrumbs = [
    { href: "/", label: "Home" },
    { label: "Search Results" },
  ];

  return (
    <>
      <Header
        title="Search"
        categoryDetails={categoryDetails}
        searchData={searchData}
      />
      <Breadcrumb customBreadcrumbs={customBreadcrumbs} />
      <div className="min-h-screen">
        <div>
          {productData && productData?.length > 0 ? (
            <div className="container px-4 py-4 m-auto">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
                {productData?.map((item) =>
                  item?.products?.map((product) => (
                    <Productitem product={product} key={product.name} />
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="container h-screen mx-auto flex flex-col justify-center items-center">
              <img
                src="/searchError.webp"
                alt="Not Found!"
                className="w-80 h-64 object-contain"
              />
              <h2 className="text-4xl font-semibold text-red-600">Sorry!</h2>
              <p className="text-2xl font-bold text-emerald-500">
                Product Not Found!
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Search;

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
