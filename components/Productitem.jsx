import Link from "next/link";

const Productitem = ({ product }) => {
    return (
        <>
            <Link legacyBehavior href={`/product/${product.slug}`}>
                <div className='card h-fit group cursor-pointer'>
                    <div className='relative overflow-hidden'>
                        <img src={product.image} alt={product.name} className='object-cover w-full h-52' />
                    </div>
                    <div className='flex flex-col items-center justify-center p-5'>
                        <h2 className='text-lg font-medium dark:text-white'>{product.name}</h2>
                        <p className='mb-2 dark:text-white'>{product.brand}</p>
                        <p className='font-bold inline-block dark:text-white'><span className='font-extrabold'>৳ </span>{product.discountPrice}</p>
                        <del className='font-bold text-red-600 opacity-60'><span className='font-extrabold'>৳ </span>{product.price}</del>
                    </div>
                </div>
            </Link>
        </>
    )
};

export default Productitem;
