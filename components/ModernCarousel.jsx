import { useEffect, useState } from "react";

const ModernCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      backgroundImage: "/images/banner1.jpg",
      backgroundColor: "linear-gradient(135deg, #f4e4c8 0%, #e8d5b8 100%)",
      title: "FASHION FORWARD",
      mainHeading: "CARRY IN STYLE",
      subtitle: "Bags That Speak Style",
      discount: {
        text: "UP TO",
        percent: "70%",
        suffix: "OFF",
      },
      buttonText: "Shop Now",
      buttonLink: "/categories",
      products: [
        { image: "/images/products/bag1.jpg", alt: "Brown Bag" },
        { image: "/images/products/bag2.jpg", alt: "Black Bag" },
        { image: "/images/products/bag3.jpg", alt: "Leather Bag" },
        { image: "/images/products/bag4.jpg", alt: "Leather Pink" },
      ],
    },
    {
      id: 2,
      backgroundImage: "/images/banner2.jpg",
      backgroundColor: "linear-gradient(135deg, #ffd54f 0%, #ff8f00 100%)",
      title: "PAYDAY SALE",
      mainHeading: "MEGA DEALS",
      subtitle: "Free Delivery & Best Prices",
      discount: {
        text: "UP TO",
        percent: "80%",
        suffix: "OFF",
      },
      buttonText: "SHOP NOW",
      buttonLink: "/categories",
      dateRange: "24-31 AUG",
      badge: "FREE DELIVERY",
      saleText: "SALE IS LIVE NOW",
    },
    {
      id: 3,
      backgroundImage: "/images/banner3.jpg",
      backgroundColor: "linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)",
      title: "SUMMER COLLECTION",
      mainHeading: "NEW ARRIVALS",
      subtitle: "Fresh Styles for the Season",
      discount: {
        text: "STARTING",
        percent: "৳499",
        suffix: "",
      },
      buttonText: "Explore Now",
      buttonLink: "/categories",
      products: [
        { image: "/images/products/babyGirl.jpg", alt: "Baby Girl" },
        { image: "/images/products/suit.jpg", alt: "Black Suit" },
        { image: "/images/products/tShirt.jpg", alt: "T-Shirt" },
        { image: "/images/products/babyBoy.jpg", alt: "Baby Boy" },
      ],
    },
  ];

  const totalSlides = slides.length;

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume after 10 seconds
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return (
    <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] overflow-hidden">
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="w-full h-full flex-shrink-0 relative"
            style={{ background: slide.backgroundColor }}
          >
            {/* Background Pattern/Image */}
            {slide.backgroundImage && (
              <div className="absolute inset-0 opacity-20">
                <img
                  src={slide.backgroundImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Slide Content */}
            <div className="relative z-10 h-full flex items-center justify-between px-8 md:px-16">
              {/* Left Content */}
              <div className="flex-1 max-w-xl">
                {/* Small Title */}
                <p className="text-xs md:text-sm font-bold tracking-wider text-orange-600 uppercase mb-2">
                  {slide.title}
                </p>

                {/* Main Heading */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-amber-900 leading-tight mb-4">
                  {slide.mainHeading}
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-xl lg:text-2xl text-amber-800 font-medium mb-6">
                  {slide.subtitle}
                </p>

                {/* Date Range (for sale slide) */}
                {slide.dateRange && (
                  <div className="bg-red-600 text-white px-4 py-2 rounded-lg inline-block mb-4 font-bold">
                    {slide.dateRange}
                  </div>
                )}

                {/* CTA Button */}
                <div>
                  <a
                    href={slide.buttonLink}
                    className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl text-lg"
                  >
                    {slide.buttonText}
                  </a>
                </div>
              </div>

              {/* Right Content - Discount Circle & Products */}
              <div className="flex-1 flex justify-end items-center relative">
                {/* Discount Circle */}
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-orange-500 rounded-full flex flex-col items-center justify-center text-white shadow-2xl">
                    <span className="text-xs md:text-sm font-bold">
                      {slide.discount.text}
                    </span>
                    <span className="text-2xl md:text-3xl lg:text-4xl font-black">
                      {slide.discount.percent}
                    </span>
                    <span className="text-xs md:text-sm font-bold">
                      {slide.discount.suffix}
                    </span>
                  </div>
                </div>

                {/* Product Images (for bag slide) */}
                {slide.products && (
                  <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
                    <div className="grid grid-cols-2 gap-20">
                      {slide.products.map((product, idx) => (
                        <div
                          key={idx}
                          className="w-24 h-24 bg-white rounded-lg shadow-lg p-2"
                        >
                          <img
                            src={product.image}
                            alt={product.alt}
                            className="w-full h-full object-cover rounded"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Top Right Badge */}
            {slide.badge && (
              <div className="absolute top-8 right-8 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                {slide.badge}
              </div>
            )}

            {/* Sale Live Text */}
            {slide.saleText && (
              <div className="absolute bottom-8 right-8 text-2xl font-black text-blue-600">
                {slide.saleText}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 z-20"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 z-20"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? "bg-orange-500 scale-125"
                : "bg-white bg-opacity-60 hover:bg-opacity-80"
            }`}
          />
        ))}
      </div>

      {/* Download App Section (matching the reference) */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-white rounded-lg p-3 shadow-lg hidden md:block">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">📱</span>
          </div>
          <span className="text-sm font-semibold text-gray-800">
            Download the App
          </span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center space-x-1">
            <span className="text-yellow-500 text-xs">⭐⭐⭐⭐⭐</span>
            <span className="text-xs text-gray-600">4.8 Rated</span>
          </div>
          <div className="text-xs text-emerald-600 font-medium">
            ✓ Free Delivery
          </div>
          <div className="text-xs text-pink-600 font-medium">
            ⏰ Limited Time
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernCarousel;
