import { useState, useEffect } from 'react';
import { cartAPI } from '../api';

function Cart() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await cartAPI.get();
            setCart(response.data);
        } catch (err) {
            setError('Failed to load cart');
        } finally {
            setLoading(false);
        }
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            return total + (item.product?.price || 0) * item.quantity;
        }, 0).toFixed(2);
    };

    if (loading) {
        return <div className="spinner"></div>;
    }

    return (
        <div className="section">
            <div className="container">
                <h1 className="section-title">Shopping Cart</h1>
                {error && <div className="alert alert-error">{error}</div>}

                {cart.length === 0 ? (
                    <div className="card text-center">
                        <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</p>
                        <h3>Your cart is empty</h3>
                        <p className="text-secondary">Add some delicious cakes to get started!</p>
                    </div>
                ) : (
                    <div>
                        {cart.map((item) => (
                            <div key={item._id} className="cart-item">
                                <img
                                    src={item.product?.image || 'https://via.placeholder.com/80'}
                                    alt={item.product?.name}
                                    className="cart-item-image"
                                />
                                <div className="cart-item-details">
                                    <h3 className="cart-item-title">{item.product?.name}</h3>
                                    <p className="cart-item-price">
                                        ${item.product?.price} × {item.quantity} = ${(item.product?.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))}

                        <div className="card" style={{ marginTop: '2rem' }}>
                            <div className="flex-between">
                                <h2>Total:</h2>
                                <h2 className="product-price">${calculateTotal()}</h2>
                            </div>
                            <button className="btn btn-success" style={{ width: '100%', marginTop: '1rem' }}>
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
