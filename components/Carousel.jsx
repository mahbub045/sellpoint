import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const Carousel = () => {
    const settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    };


    const slides = [
        {
            id: 1,
            imageSrc: '/images/banner1.jpg',
        },
        {
            id: 2,
            imageSrc: '/images/banner2.jpg',
        },
        {
            id: 3,
            imageSrc: '/images/banner3.jpg',
        },
        // Add more slides as needed
    ];

    return (
        <div className="h-96 sm:h-72 md:h-[650px] lg:h-[800px] xl:h-[950px] w-full overflow-hidden">
            <Slider {...settings}>
                {slides.map((slide) => (
                    <div key={slide.id} className="h-64 sm:h-48 md:h-[550px] lg:h-[700px] xl:h-[800px]">
                        <img
                            src={slide.imageSrc}
                            alt={slide.caption}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;
