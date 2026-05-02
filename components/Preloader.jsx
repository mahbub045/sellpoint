const Preloader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 dark:bg-black/60 flex justify-center items-center z-50">
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
