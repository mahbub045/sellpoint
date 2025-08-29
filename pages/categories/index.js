import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Productitem from "@/components/Productitem";
import { useSession } from "next-auth/react";

const Categories = ({ productDetails, categoryDetails, searchData }) => {
  const { data: session } = useSession();

  const customBreadcrumbs = [
    { href: "/", label: "Home" },
    { label: "All Categories" },
  ];

  return (
    <>
      <Header
        title="All Categories"
        categoryDetails={categoryDetails}
        searchData={searchData}
      />
      <Breadcrumb customBreadcrumbs={customBreadcrumbs} />
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8">
          Shop by Categories
        </h1>

        {productDetails && productDetails.length > 0 ? (
          <div className="space-y-12">
            {productDetails.map(
              (category, index) =>
                category.products &&
                category.products.length > 0 && (
                  <div key={index} className="category-section">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-semibold text-emerald-600">
                        {category.category}
                      </h2>
                      <a
                        href={`/categories/${category.categorySlug}`}
                        className="text-emerald-600 hover:text-emerald-800 hover:underline text-sm font-medium"
                      >
                        View All ({category.products.length}) →
                      </a>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                      {category.products.slice(0, 10).map((product) => (
                        <Productitem product={product} key={product.slug} />
                      ))}
                    </div>

                    {category.products.length > 10 && (
                      <div className="text-center mt-6">
                        <a
                          href={`/categories/${category.categorySlug}`}
                          className="inline-block bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition-colors"
                        >
                          View All {category.products.length} Products in{" "}
                          {category.category}
                        </a>
                      </div>
                    )}
                  </div>
                )
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No categories or products available at the moment.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Categories;

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
      `${process.env.NEXT_PUBLIC_BACKEND_ENPOINT}/product`
    );
    const searchData = await searchRes.json();

    return {
      props: {
        productDetails: productData || [],
        categoryDetails: categoryData || [],
        searchData: searchData || [],
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        productDetails: [],
        categoryDetails: [],
        searchData: [],
      },
    };
  }
}
