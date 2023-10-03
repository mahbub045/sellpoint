const Preloader = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-transparent flex justify-center items-center">
            <div className="preloaderWrapper">
                <div className="preloaderCircle bg-black dark:bg-white"></div>
                <div className="preloaderCircle bg-black dark:bg-white"></div>
                <div className="preloaderCircle bg-black dark:bg-white"></div>
                <div className="preloaderShadow bg-black dark:bg-white"></div>
                <div className="preloaderShadow bg-black dark:bg-white"></div>
                <div className="preloaderShadow bg-black dark:bg-white"></div>
            </div>
        </div>
    );
};

export default Preloader;
