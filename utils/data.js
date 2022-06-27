import bcrypt from 'bcryptjs'
const data = {
    users: [
        {
            name: 'admin',
            email: 'admin@admin.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true
        },
        {
            name: 'user',
            email: 'user@user.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false
        }
    ],
    products: [
        {
            name: "Free shirt",
            slug: "free-shirts",
            category: 'Shirts',
            image: 'images/shirts1.jpg',
            price: 70,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 8,
            countInStock: 20,
            description: "A popular shirt"
        },
        {
            name: "Fit shirt",
            slug: "fit-shirts",
            category: 'Shirts',
            image: 'images/shirts2.jpg',
            price: 60,
            brand: 'Nike',
            rating: 4.0,
            numReviews: 8,
            countInStock: 10,
            description: "A popular shirt"
        },
        {
            name: "Slim shirt",
            slug: "slim-shirts",
            category: 'Shirts',
            image: 'images/shirts3.jpg',
            price: 80,
            brand: 'Adidas',
            rating: 3.0,
            numReviews: 8,
            countInStock: 25,
            description: "A popular shirt"
        }, {
            name: "a shirt",
            slug: "a-shirts",
            category: 'Shirts',
            image: 'images/shirts4.jpg',
            price: 80,
            brand: 'Adidas',
            rating: 3.0,
            numReviews: 12,
            countInStock: 25,
            description: "A popular shirt"
        },
        {
            name: "Golf shirt",
            slug: "glof-shirts",
            category: 'Shirts',
            image: 'images/shirts5.jpg',
            price: 80,
            brand: 'Adidas',
            rating: 3.0,
            numReviews: 12,
            countInStock: 25,
            description: "A popular shirt"
        },
        {
            name: "ss shirt",
            slug: "ss-shirts",
            category: 'Shirts',
            image: 'images/shirts6.jpg',
            price: 80,
            brand: 'Adidas',
            rating: 3.0,
            numReviews: 12,
            countInStock: 25,
            description: "A popular shirt"
        },


    ]
};

export default data;