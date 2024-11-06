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

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  const [search, setSearch] = useState('');
  const [sortColumn, setSortColumn] = useState({
    column: 'id',
    orderBy: 'desc',
  });

  async function getProducts() {
    const url = `http://localhost:3000/products?_page=${currentPage}&_limit=${pageSize}&q=${search}&_sort=${sortColumn.column}&_order=${sortColumn.orderBy}`;
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        let totalCount = res.headers.get('X-Total-Count');
        setTotalPages(Math.ceil(totalCount / pageSize));
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
  }, [currentPage, search, sortColumn]);

  async function handleDelete(id: number) {
    try {
      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error();
      }
      getProducts();
    } catch (error) {
      alert('Unable to delete the product');
    }
  }

  // pagination functionality
  let paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <li
        className={i === currentPage ? 'page-item active' : 'page-item'}
        key={i}
      >
        <a
          className="page-link"
          href={'?page=' + i}
          onClick={(event) => {
            event.preventDefault();

            setCurrentPage(i);
          }}
        >
          {i}
        </a>
      </li>
    );
  }

  // search functionality
  function handleSearch(event: any) {
    event.preventDefault();

    let text = event.target.search.value;
    setSearch(text);
    setCurrentPage(1);
  }

  // sort functionality
  function sortTable(column: string) {
    let orderBy = 'desc';

    if (column === sortColumn.column) {
      // reverse orderBy
      if (sortColumn.orderBy === 'asc') orderBy = 'desc';
      else orderBy = 'asc';
    }

    setSortColumn({ column: column, orderBy: orderBy });
  }

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
        <div className="col">
          <div className="col">
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                name="search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th style={{ cursor: 'pointer' }} onClick={() => sortTable('id')}>
              ID{' '}
              <SortArrow
                column="id"
                sortColumn={sortColumn.column}
                orderBy={sortColumn.orderBy}
              />
            </th>
            <th style={{ cursor: 'pointer' }} onClick={() => sortTable('name')}>
              Name{' '}
              <SortArrow
                column="name"
                sortColumn={sortColumn.column}
                orderBy={sortColumn.orderBy}
              />
            </th>
            <th
              style={{ cursor: 'pointer' }}
              onClick={() => sortTable('brand')}
            >
              Brand{' '}
              <SortArrow
                column="brand"
                sortColumn={sortColumn.column}
                orderBy={sortColumn.orderBy}
              />
            </th>
            <th
              style={{ cursor: 'pointer' }}
              onClick={() => sortTable('category')}
            >
              Category{' '}
              <SortArrow
                column="category"
                sortColumn={sortColumn.column}
                orderBy={sortColumn.orderBy}
              />
            </th>
            <th
              style={{ cursor: 'pointer' }}
              onClick={() => sortTable('price')}
            >
              Price{' '}
              <SortArrow
                column="price"
                sortColumn={sortColumn.column}
                orderBy={sortColumn.orderBy}
              />
            </th>
            <th>Image</th>
            <th
              style={{ cursor: 'pointer' }}
              onClick={() => sortTable('createdAt')}
            >
              Created At{' '}
              <SortArrow
                column="createdAt"
                sortColumn={sortColumn.column}
                orderBy={sortColumn.orderBy}
              />
            </th>
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
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="pagination">{paginationButtons}</ul>
    </div>
  );
}

function SortArrow({
  column,
  sortColumn,
  orderBy,
}: {
  column: string;
  sortColumn: string;
  orderBy: string;
}) {
  if (column !== sortColumn) return null;

  if (orderBy === 'asc') {
    return <i className="bi bi-arrow-up"></i>;
  }

  return <i className="bi bi-arrow-down"></i>;
}

export default ProductList;
