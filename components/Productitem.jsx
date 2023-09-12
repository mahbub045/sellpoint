
const Productitem = ({ product }) => {
    return (
        <a href={`/product/${product.slug}`}>
            <div className='card glow-effect h-fit group'>
                <div className='relative overflow-hidden'>
                    <img src={product.image} alt={product.name} className='object-cover w-full h-52 rounded shadow' />
                    <div className='absolute h-full w-full bg-black/20 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100'>
                        <button className='bg-white rounded-full px-1 py-1 text-black hover:bg-black hover:text-white duration-[0.7s]' type='button' title='View'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center p-5'>
                    <h2 className='text-lg font-semibold'>{product.name}</h2>
                    <p className='mb-2'>{product.brand}</p>
                    <p className='font-bold inline-block'><span className='font-extrabold'>৳ </span>{product.discountPrice}</p>
                    <del className='font-bold text-red-600 opacity-60'><span className='font-extrabold'>৳ </span>{product.price}</del>
                </div>
            </div>
        </a>
    )
}
export default Productitem;