// drawer component

const Drawer = ({ isOpen, onClose, children }) => {
    const drawerClasses = isOpen ? "translate-x-0" : "-translate-x-full";
    return (
        <div
            className={`fixed top-0 left-0 bottom-0 z-[99999] w-1/2 bg-slate-200 dark:bg-slate-950 shadow border-r border-slate-400 dark:border-stone-500 transform transition-transform duration-300 ${drawerClasses}`}
        >
            <div className={`h-full flex flex-col ${drawerClasses}`}>
                <div className="px-4 py-5">
                    <div className="flex justify-between items-center">
                        <div className="pt-5 px-4 mr-3 flex m-auto">
                            <button
                                onClick={onClose}
                                type="button"
                                data-drawer-hide="drawer-body-scrolling"
                                aria-controls="drawer-body-scrolling"
                                className="text-black dark:text-white  bg-transparent   text-sm p-1  inline-flex items-center"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                    strokeWidth={1.5}
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-2 flex-grow overflow-y-auto ">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Drawer;