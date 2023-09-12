
const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-5 ">
            <div className="grid grid-cols-1 md:grid-cols-3 ">
                <div className="pb-5 text-center flex flex-col items-center">
                    <a href="/">
                        <img src="/footer-logo.png" alt="Company Logo" className="w-36 h-16 mb-4" />
                    </a>
                    <p className="text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo nisi voluptate quaerat nulla qui quos libero corporis voluptas voluptatum reiciendis.</p>
                </div>
                <div className="pb-5 grid max-sm:grid-cols-2 grid-cols-2">
                    <div className="text-center">
                        <h2 className="md:text-2xl text-lg font-semibold mb-4">Links</h2>
                        <ul>
                            <li><a href="#" className="text-sm text-white hover:text-emerald-600">Home</a></li>
                            <li><a href="#" className="text-sm text-white hover:text-emerald-600">About</a></li>
                            <li><a href="#" className="text-sm text-white hover:text-emerald-600">Services</a></li>
                            <li><a href="#" className="text-sm text-white hover:text-emerald-600">Contact</a></li>
                        </ul>
                    </div>
                    <div className="text-center">
                        <h2 className="md:text-2xl text-xl font-semibold mb-4">Legal</h2>
                        <ul>
                            <li><a href="#" className="text-sm text-white hover:text-emerald-600">Privacy Policy</a></li>
                            <li><a href="#" className="text-sm text-white hover:text-emerald-600">Terms & Conditions</a></li>
                            <li><a href="#" className="text-sm text-white hover:text-emerald-600">Return & Refund</a></li>
                        </ul>
                    </div>
                </div>
                <div className="pb-2 grid max-sm:grid-cols-2 grid-cols-2">


                    <div className=" text-center">
                        <h2 className="md:text-2xl text-xl font-semibold mb-4">Contact</h2>
                        <address className='text-sm'>
                            123 Main Street<br />
                            Dhaka, Bangladesh<br />
                            <a href="mailto:info@example.com" className="text-sm text-white hover:text-emerald-600">info@sellpoint.com</a><br />
                            <a href="tel:+123456789" className="text-sm text-white hover:text-emerald-600">+880 170 042 0025</a>
                        </address>
                    </div>
                    <div className=" text-center">
                        <h2 className="md:text-2xl text-xl font-semibold mb-4">Follow Us</h2>
                        <ul>
                            <li><a href="#" className="text-sm text-white hover:text-emerald-600">Facebook</a></li>
                            <li><a href="#" className="text-sm text-white hover:text-emerald-600">Twitter</a></li>
                            <li><a href="#" className="text-sm text-white hover:text-emerald-600">Instagram</a></li>
                            <li><a href="#" className="text-sm text-white hover:text-emerald-600">Linkedin</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="text-center pt-5">
                <p className="text-sm">&copy; {new Date().getFullYear()} All Rights Reserved by SellPoint</p>
            </div>
        </footer>
    )
};

export default Footer;