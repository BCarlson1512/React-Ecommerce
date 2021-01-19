import bcrypt from 'bcryptjs';
const data = {
    users: [
        {
            name: 'Admin',
            email: 'admin@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            name: 'Customer',
            email: 'customer@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        }
    ],
    products :[
        {
            title: "Web Us Logo Sticker",
            category : "Accesssories",
            brand : "Web Us",
            description: "The iconic Web Us logo, except now available in a convenient sticker format!",
            price: 2.00,
            image: "/images/BlueLogo.png",
            countInStock : 5
        },
        {
            title: "Web Us Logo Sticker Pack",
            category: "Accesssories",
            brand: "Web Us",
            description: "The iconic Web Us logo, now available in a pack of 3!",
            price: 6.00,
            image: "/images/BlueLogo.png",
            countInStock: 3
        },
        {
            title: "Web Us Hoodie",
            category : "Hoodies",
            brand : "Web Us",
            description: "You can now represent web-us, with a cozy new hoodie!",
            price: 60.00,
            image: "/images/web-us-hoodie.jpg",
            countInStock: 7
        },
    ]
}

export default data;