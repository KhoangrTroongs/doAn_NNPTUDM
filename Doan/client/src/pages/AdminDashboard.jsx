import { useState, useEffect } from 'react';
import { productAPI } from '../api';

function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        image: '',
        category: '',
        stock: '',
    });

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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            if (editingProduct) {
                await productAPI.update(editingProduct._id, formData);
                setSuccess('Product updated successfully!');
            } else {
                await productAPI.create(formData);
                setSuccess('Product created successfully!');
            }
            fetchProducts();
            setShowModal(false);
            resetForm();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Operation failed');
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            originalPrice: product.originalPrice || '',
            image: product.image,
            category: product.category,
            stock: product.stock,
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            await productAPI.delete(id);
            setSuccess('Product deleted successfully!');
            fetchProducts();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Failed to delete product');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            originalPrice: '',
            image: '',
            category: '',
            stock: '',
        });
        setEditingProduct(null);
    };

    const openCreateModal = () => {
        resetForm();
        setShowModal(true);
    };

    if (loading) {
        return <div className="spinner"></div>;
    }

    return (
        <div className="section">
            <div className="container">
                <div className="flex-between mb-3">
                    <h1 className="section-title" style={{ margin: 0 }}>Admin Dashboard</h1>
                    <button onClick={openCreateModal} className="btn btn-primary">
                        + Add Product
                    </button>
                </div>

                {error && <div className="alert alert-error">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <div className="grid grid-2">
                    {products.map((product) => (
                        <div key={product._id} className="card">
                            <div className="flex gap-2">
                                <img
                                    src={product.image || 'https://via.placeholder.com/150'}
                                    alt={product.name}
                                    style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
                                />
                                <div style={{ flex: 1 }}>
                                    <h3>{product.name}</h3>
                                    <p className="text-secondary">{product.description}</p>
                                    <p><strong>Price:</strong> ${product.price}</p>
                                    <p><strong>Category:</strong> {product.category}</p>
                                    <p><strong>Stock:</strong> {product.stock}</p>
                                    <div className="flex gap-1" style={{ marginTop: '1rem' }}>
                                        <button onClick={() => handleEdit(product)} className="btn btn-secondary">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(product._id)} className="btn btn-danger">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {showModal && (
                    <div className="modal-overlay" onClick={() => setShowModal(false)}>
                        <div className="modal" onClick={(e) => e.stopPropagation()}>
                            <h2 className="mb-2">{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-input"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        name="description"
                                        className="form-textarea"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        className="form-input"
                                        value={formData.price}
                                        onChange={handleChange}
                                        step="0.01"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Original Price (optional)</label>
                                    <input
                                        type="number"
                                        name="originalPrice"
                                        className="form-input"
                                        value={formData.originalPrice}
                                        onChange={handleChange}
                                        step="0.01"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Image URL</label>
                                    <input
                                        type="text"
                                        name="image"
                                        className="form-input"
                                        value={formData.image}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Category</label>
                                    <input
                                        type="text"
                                        name="category"
                                        className="form-input"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Stock</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        className="form-input"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="flex gap-1">
                                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                                        {editingProduct ? 'Update' : 'Create'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="btn btn-secondary"
                                        style={{ flex: 1 }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;
