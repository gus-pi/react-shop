import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  description: string;
  imageFilename: string;
  createdAt: 'string';
};

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  async function getProducts() {
    try {
      const res = await fetch('http://localhost:3000/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new Error();
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Products</h2>
      <div className="row mb-3">
        <div className="col">
          <Link
            className="btn btn-primary me-1"
            to="/admin/products/create"
            role="button"
          >
            Create New Product
          </Link>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={getProducts}
          >
            Refresh
          </button>
        </div>
        <div className="col"></div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price</th>
            <th>Image</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.brand}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>
                <img
                  src={`http://localhost:3000/images/${product.imageFilename}`}
                  alt={product.imageFilename}
                  width="100"
                />
              </td>
              <td>{product.createdAt.slice(0, 10)}</td>
              <td style={{ width: '10px', whiteSpace: 'nowrap' }}>
                <Link
                  className="btn btn-primary btn-sm me-1"
                  to={`/admin/products/edit/${product.id}`}
                >
                  Edit
                </Link>
                <button type="button" className="btn btn-danger btn-sm">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
