import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <section className="hero">
                <div className="container">
                    <h1 className="hero-title">Welcome to Cake Store</h1>
                    <p className="hero-subtitle">
                        Indulge in our premium selection of handcrafted cakes
                    </p>
                    <div className="flex-center gap-2" style={{ marginTop: '2rem' }}>
                        <Link to="/products" className="btn btn-primary">
                            Browse Products
                        </Link>
                        <Link to="/register" className="btn btn-secondary">
                            Get Started
                        </Link>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <h2 className="section-title">Why Choose Us?</h2>
                    <div className="grid grid-3">
                        <div className="card text-center">
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎂</div>
                            <h3>Premium Quality</h3>
                            <p className="text-secondary">
                                Only the finest ingredients for the perfect taste
                            </p>
                        </div>
                        <div className="card text-center">
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚚</div>
                            <h3>Fast Delivery</h3>
                            <p className="text-secondary">
                                Fresh cakes delivered right to your doorstep
                            </p>
                        </div>
                        <div className="card text-center">
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⭐</div>
                            <h3>Customer Satisfaction</h3>
                            <p className="text-secondary">
                                Thousands of happy customers worldwide
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
