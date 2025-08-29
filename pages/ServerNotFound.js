import Header from "@/components/Header";
import { useEffect, useState } from "react";

const ServerNotFound = ({ categoryDetails, searchData }) => {
  const [progress, setProgress] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);

    // Simulated progress bar animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 65) {
          clearInterval(interval);
          return 65;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header
        title="Under Development"
        categoryDetails={categoryDetails}
        searchData={searchData}
      />

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Content Container */}
        <div className="flex flex-col items-center justify-center min-h-screen px-4 ">
          <div
            className={`text-center max-w-4xl transition-all duration-1000 ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Construction Icon with Animation */}
            <div className="relative mt-5 mb-8">
              <div className="text-8xl md:text-9xl animate-bounce">🚧</div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-emerald-400 rounded-full animate-ping"></div>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-emerald-400 via-teal-500 to-green-600 bg-clip-text text-transparent">
                Under Development
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
              We&apos;re working hard to bring you something amazing! <br />
              Our team is crafting the perfect experience for you.
            </p>

            {/* Progress Bar */}
            <div className="w-full max-w-md mx-auto mb-8">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-100 ease-out relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[
                {
                  icon: "🎨",
                  title: "Beautiful Design",
                  desc: "Modern & Clean UI",
                },
                {
                  icon: "⚡",
                  title: "Fast Performance",
                  desc: "Optimized Speed",
                },
                {
                  icon: "📱",
                  title: "Mobile Ready",
                  desc: "Responsive Layout",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 transition-all duration-500 hover:bg-opacity-20 hover:scale-105 ${
                    animate
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="text-white font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/"
                className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-full hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="mr-2">🏠</span>
                Go Home
                <span className="inline-block transition-transform group-hover:translate-x-1 duration-200 ml-2">
                  →
                </span>
              </a>

              <button
                onClick={() => window.location.reload()}
                className="group px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-emerald-900 transition-all duration-300"
              >
                <span className="mr-2">🔄</span>
                Refresh Page
              </button>
            </div>

            {/* Coming Soon Badge */}
            <div className="mt-12">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full text-white font-medium shadow-lg">
                <div className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse"></div>
                Coming Soon - Stay Tuned!
              </div>
            </div>

            {/* Estimated Time */}
            <p className="text-gray-400 text-sm mt-6 mb-10">
              Estimated completion:{" "}
              <span className="text-emerald-400 font-semibold">Soon™</span>
            </p>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-16"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-current text-white opacity-10"
            ></path>
          </svg>
        </div>
      </div>
    </>
  );
};

export default ServerNotFound;

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
