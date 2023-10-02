import { useTheme } from 'next-themes';

const Preloader = () => {
    const { theme } = useTheme();

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-transparent flex justify-center items-center">
            <img
                src={theme === 'dark' ? '/preloader.gif' : '/preloader_for_dark.gif'}
                alt="Loading..."
            />
        </div>
    );
};

export default Preloader;

