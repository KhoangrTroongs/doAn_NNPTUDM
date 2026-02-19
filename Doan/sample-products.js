// Sample products to add to the database
// You can use these in the Admin Dashboard

const sampleProducts = [
    {
        name: "Chocolate Fudge Cake",
        description: "Rich, moist chocolate cake with creamy fudge frosting. Perfect for chocolate lovers!",
        price: 35.99,
        originalPrice: 45.99,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop",
        category: "Chocolate",
        stock: 15
    },
    {
        name: "Strawberry Shortcake",
        description: "Light and fluffy vanilla cake layered with fresh strawberries and whipped cream.",
        price: 32.99,
        originalPrice: 42.99,
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&h=400&fit=crop",
        category: "Fruit",
        stock: 12
    },
    {
        name: "Red Velvet Cake",
        description: "Classic red velvet cake with smooth cream cheese frosting. A timeless favorite!",
        price: 38.99,
        image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=500&h=400&fit=crop",
        category: "Classic",
        stock: 20
    },
    {
        name: "Lemon Drizzle Cake",
        description: "Zesty lemon cake with a sweet citrus glaze. Light and refreshing!",
        price: 29.99,
        originalPrice: 36.99,
        image: "https://images.unsplash.com/photo-1519915212116-7cfef71f1d3e?w=500&h=400&fit=crop",
        category: "Citrus",
        stock: 18
    },
    {
        name: "Tiramisu Cake",
        description: "Italian-inspired coffee-flavored cake with mascarpone cream. Absolutely divine!",
        price: 42.99,
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&h=400&fit=crop",
        category: "Coffee",
        stock: 10
    },
    {
        name: "Vanilla Bean Cake",
        description: "Pure vanilla cake made with real vanilla beans. Simple elegance at its finest.",
        price: 30.99,
        image: "https://images.unsplash.com/photo-1588195538326-c5b1e5b80d9d?w=500&h=400&fit=crop",
        category: "Classic",
        stock: 25
    },
    {
        name: "Carrot Cake",
        description: "Moist carrot cake with walnuts and cream cheese frosting. A healthy indulgence!",
        price: 34.99,
        originalPrice: 39.99,
        image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=500&h=400&fit=crop",
        category: "Spice",
        stock: 14
    },
    {
        name: "Black Forest Cake",
        description: "Chocolate cake layered with cherries and whipped cream. A German classic!",
        price: 40.99,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&h=400&fit=crop",
        category: "Chocolate",
        stock: 16
    },
    {
        name: "Blueberry Cheesecake",
        description: "Creamy cheesecake topped with fresh blueberry compote. Rich and decadent!",
        price: 44.99,
        originalPrice: 52.99,
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&h=400&fit=crop",
        category: "Cheesecake",
        stock: 8
    },
    {
        name: "Matcha Green Tea Cake",
        description: "Delicate green tea flavored cake with white chocolate ganache. Unique and elegant!",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&h=400&fit=crop",
        category: "Specialty",
        stock: 12
    }
];

// Instructions:
// 1. Login as admin (username: admin, password: admin123)
// 2. Go to Admin Dashboard
// 3. Click "Add Product"
// 4. Copy and paste the values from above
// 5. Repeat for each product

console.log('Sample Products Data:');
console.log(JSON.stringify(sampleProducts, null, 2));
console.log('\nTotal products:', sampleProducts.length);
