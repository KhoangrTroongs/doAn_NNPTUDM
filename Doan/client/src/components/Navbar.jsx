import { Link } from 'react-router-dom';

function Navbar({ user, onLogout }) {
    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link to="/" className="navbar-brand">
                    🍰 Cake Store
                </Link>
                <ul className="navbar-menu">
                    <li>
                        <Link to="/" className="navbar-link">Home</Link>
                    </li>
                    <li>
                        <Link to="/products" className="navbar-link">Products</Link>
                    </li>
                    {user ? (
                        <>
                            {user.role === 'admin' ? (
                                <li>
                                    <Link to="/admin" className="navbar-link">
                                        Admin Dashboard
                                    </Link>
                                </li>
                            ) : (
                                <li>
                                    <Link to="/cart" className="navbar-link">
                                        🛒 Cart
                                    </Link>
                                </li>
                            )}
                            <li>
                                <span className={`badge ${user.role === 'admin' ? 'badge-admin' : 'badge-user'}`}>
                                    {user.username}
                                </span>
                            </li>
                            <li>
                                <button onClick={onLogout} className="btn btn-secondary">
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login" className="btn btn-primary">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className="btn btn-secondary">
                                    Register
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
