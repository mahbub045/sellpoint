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
        <div className="h-[650px] w-full">
            <Slider {...settings}>
                {slides.map((slide) => (
                    <div key={slide.id} className="h-[550px]">
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
