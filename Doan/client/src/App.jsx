import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Cart from './pages/Cart';
import AdminDashboard from './pages/AdminDashboard';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        if (token && userData) {
            setUser(JSON.parse(userData));
        }
        setLoading(false);
    }, []);

    const handleLogin = (userData, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    if (loading) {
        return <div className="spinner"></div>;
    }

    return (
        <Router>
            <div className="App">
                <Navbar user={user} onLogout={handleLogout} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/login"
                        element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
                    />
                    <Route
                        path="/register"
                        element={user ? <Navigate to="/" /> : <Register />}
                    />
                    <Route path="/products" element={<Products user={user} />} />
                    <Route
                        path="/cart"
                        element={user && user.role === 'user' ? <Cart /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/admin"
                        element={user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
