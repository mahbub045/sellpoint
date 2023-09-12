const data = {
    users: [
        {
            fullname: 'Kamal Udddin',
            phone: '01700000000',
            address: 'Mirpur, Dhaka',
            password: '123456',
            isAdmin: true,
        },
        {
            fullname: 'Rana Khan',
            phone: '01700000001',
            address: 'Dhanmondi, Dhaka',
            password: '123456',
            isAdmin: false,
        },
        {
            fullname: 'Jannati Akter',
            phone: '01700000002',
            address: 'Savar, Dhaka',
            password: '123456',
            isAdmin: false,
        },
    ],
    products: [
        {
            name: 'Free Shirt',
            slug: 'free-shirt',
            category: 'Shirts',
            image: '/images/shirt1.jpg',
            discountPrice: 1500,
            price: 2000,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 8,
            countInStock: 10,
            description: 'A popular shirt Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum itaque ex officiis corrupti quidem nam sint molestiae vero quia iste tempore accusamus quam nemo rerum blanditiis autem molestias dolorum ad dignissimos, iure odio mollitia repellat numquam. Maxime impedit earum quisquam excepturi quod molestiae, doloribus omnis commodi cupiditate! Beatae rerum sequi eligendi iure ad sed esse quibusdam in natus, pariatur saepe nemo odit aliquam rem quaerat labore sunt ratione quidem voluptatem odio ea magnam animi incidunt! Esse necessitatibus quam accusantium officia temporibus, ut fugit reiciendis excepturi veritatis eos sequi expedita eveniet saepe repellendus ad quisquam deserunt nesciunt quaerat harum! Distinctio soluta iste aperiam quasi, vero perspiciatis architecto amet quibusdam, molestias doloremque rerum. Error doloremque omnis, minus ipsam, quas, aperiam inventore ipsum iusto ut enim recusandae placeat unde esse obcaecati hic odit quisquam nemo consectetur ducimus quos officia necessitatibus facere eius veniam. Nesciunt illum architecto qui eligendi, tempore itaque in quae corporis sapiente quaerat, cum blanditiis fuga cumque rerum tenetur neque? Quis, atque! Itaque excepturi quaerat pariatur libero ipsa totam, eaque, inventore quisquam nulla repellendus id voluptate quod officiis similique eligendi nostrum, laudantium beatae. Itaque numquam soluta minus eos? Placeat sunt cumque rerum sit, assumenda et, deleniti itaque laudantium expedita consequatur iusto officia. Sunt obcaecati minus deleniti quas nihil animi atque inventore dolorum soluta ullam repudiandae suscipit vero praesentium nulla vel rem cum possimus est aut, molestiae, quo neque fugiat architecto voluptates! Dolorem, placeat at est rem excepturi facilis eaque fugit quae, nemo, animi ex ipsum eligendi. Debitis nihil exercitationem quam quis accusamus reprehenderit ipsa veniam quisquam, possimus doloribus. Iste repellat magnam ab dolores! Fuga dolores reprehenderit illo quis quisquam consequatur blanditiis nesciunt ipsum facilis qui iste iure earum laudantium tempora temporibus error doloribus, perspiciatis quaerat distinctio, ad sit aliquid laborum voluptas. Qui omnis dolor in quam totam accusantium! Incidunt, quibusdam facilis.',
        },
        {
            name: 'Fit Shirt',
            slug: 'fit-shirt',
            category: 'Shirt',
            image: '/images/shirt2.jpg',
            discountPrice: 1300,
            price: 1750,
            brand: 'Adiddas',
            rating: 4.8,
            numReviews: 20,
            countInStock: 10,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut, unde quo? Adipisci eaque mollitia saepe perspiciatis et est magnam sunt distinctio temporibus alias, nisi expedita iste corporis exercitationem nulla quasi rem ullam quas? Minus, dolorum maiores? Rerum debitis, itaque corrupti atque quidem sit eligendi maiores fugit voluptatum dolor ex corporis fuga, sapiente reiciendis repellat esse similique eveniet minus vitae tempora! Doloribus quae quo, ab sit magni odio laboriosam delectus quis. Maiores eius ipsa nulla at optio est consequatur ducimus maxime voluptate quae veritatis laboriosam dolores, ex animi? Dolore provident et, molestiae sapiente eius voluptatem neque voluptatibus blanditiis placeat molestias optio.'
        },
        {
            name: 'Slim Shirt',
            slug: 'slim-shirt',
            category: 'Shirt',
            image: '/images/shirt3.jpg',
            discountPrice: 1266,
            price: 1650,
            brand: 'Reaymon',
            rating: 4.4,
            numReviews: 12,
            countInStock: 30,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae a placeat est, et minima delectus velit! Quia explicabo ex quam et animi nulla, impedit minus ut magnam nisi suscipit. Repudiandae est voluptate, consectetur recusandae velit fugit in corrupti alias ea quaerat nisi eum quidem officia odit deleniti, voluptas rerum. Architecto, vero. Consectetur delectus perferendis repellendus dicta ullam officia ipsam assumenda possimus architecto ut vitae veniam reprehenderit nesciunt, quisquam fugit soluta facilis aliquid saepe! Nemo voluptate voluptates eveniet esse tempore ex labore exercitationem doloribus maiores et laborum autem, fuga facilis laboriosam odio! Eius repellat voluptatum vero nemo totam eos, ratione atque.'
        },
        {
            name: 'Golf Pants',
            slug: 'golf-pants',
            category: 'Pants',
            image: '/images/pants1.jpg',
            discountPrice: 1500,
            price: 1750,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 8,
            countInStock: 0,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt esse eos cum, nulla expedita aut quisquam numquam laborum non rerum doloribus. Tenetur est atque saepe dolor quidem asperiores culpa sequi, non vero voluptates quae quia tempore eos facere modi distinctio, soluta iure, voluptatem mollitia quo voluptate impedit omnis incidunt iste? Explicabo a vel quasi eius, sapiente distinctio sequi voluptatibus libero, rerum autem in, quas maiores veniam eos dignissimos architecto iusto esse ad quos atque. Dolorum dicta voluptas sequi enim reiciendis quibusdam. Possimus voluptatum ipsum maxime non iure vel mollitia at enim blanditiis natus quibusdam, eligendi voluptate temporibus inventore impedit harum.'
        },
        {
            name: 'Fit Pants',
            slug: 'fit-pants',
            category: 'Pants',
            image: '/images/pants2.jpg',
            discountPrice: 1900,
            price: 2100,
            brand: 'Oliver',
            rating: 4.5,
            numReviews: 8,
            countInStock: 20,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro perferendis excepturi enim dignissimos. Odio dolorem quod excepturi esse est. Error, doloremque ratione quisquam adipisci, praesentium quae accusamus laboriosam perspiciatis quod nisi maxime nemo quam minima eligendi porro numquam unde animi beatae. Ducimus nostrum distinctio dolores, explicabo, fugit eveniet consectetur rerum atque vel commodi est! Nisi a aliquid eos nihil assumenda dolore dolorem vel non temporibus illo vero sint aut quam minima beatae ullam animi optio, impedit praesentium ea nesciunt dolorum, cupiditate sunt? Autem vero illum iste magni esse rerum? Facilis deserunt corporis qui reiciendis ullam totam amet explicabo voluptatibus consequatur?'
        },
        {
            name: 'Classic Pants',
            slug: 'classic-pants',
            category: 'Pants',
            image: '/images/pants3.jpg',
            discountPrice: 2100,
            price: 2500,
            brand: 'Raymon',
            rating: 4.5,
            numReviews: 8,
            countInStock: 20,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, labore? Facilis quas praesentium iusto reprehenderit magni facere, et consequatur eum molestiae. Ipsa similique odio incidunt facilis optio nobis id iste ipsam. Exercitationem, molestiae nostrum sequi mollitia illo dolores, nihil explicabo libero tempora ipsum eligendi possimus assumenda minima? Laudantium facere quas error quos hic doloribus eveniet ratione eligendi aliquid repellendus libero, quasi quam cumque labore reprehenderit obcaecati quidem praesentium nihil eaque nisi maxime, sint asperiores inventore! Eum, adipisci? A molestias deserunt aliquid enim odit. Perferendis repellendus nisi labore eos rerum. Quidem sit ipsa ducimus cumque commodi optio cum. Ut, at fuga!'
        },
        {
            name: 'Free Shirt',
            slug: 'free-shirt',
            category: 'Shirts',
            image: '/images/shirt1.jpg',
            discountPrice: 1320,
            price: 1570,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 8,
            countInStock: 20,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum aliquid corrupti ut alias sequi maxime molestiae itaque, unde dolorem cumque necessitatibus, omnis quidem doloremque, amet nesciunt. Libero officia voluptatem ea voluptate nihil voluptatibus magni tempora distinctio dicta quia sunt quam, modi voluptas neque enim illum quod eum incidunt ipsum fugit autem? Eveniet magnam nam quis, nobis sint laboriosam tempora quia quasi consequuntur accusamus fugit ab, dolorum labore natus eligendi laborum commodi dolore? Nulla vel eveniet minima velit alias culpa, sequi delectus, harum eligendi quasi unde ad possimus molestiae ducimus nostrum praesentium obcaecati ipsam blanditiis esse? Vitae quae modi cum aperiam.',
        },
        {
            name: 'Fit Shirt',
            slug: 'fit-shirt',
            category: 'Shirt',
            image: '/images/shirt2.jpg',
            discountPrice: 1500,
            price: 1800,
            brand: 'Adiddas',
            rating: 4.8,
            numReviews: 20,
            countInStock: 0,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti excepturi rerum cumque possimus quae similique eaque totam tempora dolorem ipsa. Molestiae dolore voluptates iste natus omnis adipisci repellendus sed earum minus ipsa, laudantium temporibus. Aut doloribus voluptas saepe velit qui at ea est harum voluptatum, labore praesentium necessitatibus nemo nihil totam mollitia culpa facilis quam iure! Unde exercitationem magnam, laudantium quod cum tempore, sequi soluta consequatur nostrum ratione reprehenderit provident. Tenetur vitae cupiditate quos eaque quasi quod a doloribus, vero quam tempora enim? Excepturi ipsa repellat sit similique distinctio accusantium voluptates ex, expedita iusto quia inventore aspernatur tempora sapiente quod!'
        },
    ]
};
export default data;

