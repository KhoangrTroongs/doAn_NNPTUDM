import { useState, useEffect } from 'react';
import { productAPI, cartAPI } from '../api';

function Products({ user }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await productAPI.getAll();
            setProducts(response.data);
        } catch (err) {
            setError('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (productId) => {
        if (!user) {
            setError('Please login to add items to cart');
            return;
        }

        if (user.role === 'admin') {
            setError('Admins cannot add items to cart');
            return;
        }

        try {
            await cartAPI.add(productId, 1);
            setSuccess('Product added to cart!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add to cart');
            setTimeout(() => setError(''), 3000);
        }
    };

    if (loading) {
        return <div className="spinner"></div>;
    }

    return (
        <div className="section">
            <div className="container">
                <h1 className="section-title">Our Premium Cakes</h1>
                {error && <div className="alert alert-error">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                {products.length === 0 ? (
                    <div className="card text-center">
                        <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍰</p>
                        <h3>No products available yet</h3>
                        <p className="text-secondary">Check back soon for delicious cakes!</p>
                    </div>
                ) : (
                    <div className="grid grid-3">
                        {products.map((product) => (
                            <div key={product._id} className="card product-card">
                                <img
                                    src={product.image || 'https://via.placeholder.com/400x300?text=Cake'}
                                    alt={product.name}
                                    className="product-image"
                                />
                                <h3 className="product-title">{product.name}</h3>
                                <p className="product-description">{product.description}</p>
                                <div className="flex-between">
                                    <div>
                                        <span className="product-price">${product.price}</span>
                                        {product.originalPrice && (
                                            <span className="product-original-price">${product.originalPrice}</span>
                                        )}
                                    </div>
                                    <span className="badge" style={{ background: 'var(--card-bg)' }}>
                                        {product.category}
                                    </span>
                                </div>
                                <div style={{ marginTop: '1rem' }}>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        Stock: {product.stock}
                                    </p>
                                </div>
                                {user && user.role === 'user' && (
                                    <button
                                        onClick={() => handleAddToCart(product._id)}
                                        className="btn btn-primary"
                                        style={{ width: '100%', marginTop: '1rem' }}
                                        disabled={product.stock === 0}
                                    >
                                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Products;
