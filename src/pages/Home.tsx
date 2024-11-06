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

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;

  const [search, setSearch] = useState('');
  const [sortColumn, setSortColumn] = useState({
    column: 'id',
    orderBy: 'desc',
  });

  const [filterParams, setFilterParams] = useState({
    brand: '',
    category: '',
  });

  async function getProducts() {
    let url = `http://localhost:3000/products?_page=${currentPage}&_limit=${pageSize}&q=${search}&_sort=${sortColumn.column}&_order=${sortColumn.orderBy}`;

    if (filterParams.brand) {
      url = url + '&brand=' + filterParams.brand;
    }

    if (filterParams.category) {
      url = url + '&category=' + filterParams.category;
    }

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
  }, [currentPage, search, sortColumn, filterParams]);

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

  function handleBrandFilter(e: any) {
    let brand = e.target.value;
    setFilterParams({ ...filterParams, brand: brand });
  }

  function handleCategoryFilter(e: any) {
    let category = e.target.value;
    setFilterParams({ ...filterParams, category: category });
  }

  return (
    <>
      <div style={{ backgroundColor: '#08618d', minHeight: '200px' }}>
        <div className="container text-white py-5">
          <div className="row align-items-center g-5">
            <div className="col-md-6">
              <h1 className="mb-5 display-2">
                <strong>Best Store of Electronics</strong>
              </h1>
              <p>
                Find a large selection of newest electronic devices from most
                popular brands and with affordable prices.
              </p>
            </div>
            <div className="col-md-6 text-center">
              <img src="/images/hero.png" className="img-fluid" alt="hero" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light">
        <div className="container py-5">
          <div className="row mb-5 g-2">
            <div className="col-md-6">
              <h4>Products</h4>
            </div>
            <div className="col-md-2">
              <select className="form-select" onChange={handleBrandFilter}>
                <option value="">All Brands</option>
                <option value="Samsung">Samsung</option>
                <option value="Apple">Apple</option>
                <option value="Nokia">Nokia</option>
                <option value="HP">HP</option>
              </select>
            </div>
            <div className="col-md-2">
              <select className="form-select" onChange={handleCategoryFilter}>
                <option value="">All Categories</option>
                <option value="Phones">Phones</option>
                <option value="Computers">Computers</option>
                <option value="Accessories">Accessories</option>
                <option value="Printers">Printers</option>
                <option value="Cameras">Cameras</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-md-2">
              <select className="form-select">
                <option value="0">Order By Newest</option>
                <option value="1">Price: Low to High</option>
                <option value="2">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="row mb-5 g-3">
            {products.map((product, index) => {
              return (
                <div className="col-md-3 col-sm-6" key={index}>
                  <ProductItem product={product} />
                </div>
              );
            })}
          </div>

          <ul className="pagination">{paginationButtons}</ul>
        </div>
      </div>
    </>
  );
}

export default Home;

function ProductItem({ product }: { product: Product }) {
  return (
    <div className="rounded border shadow p-4 text-center h-100">
      <img
        src={`http://localhost:3000/images/${product.imageFilename}`}
        className="img-fluid"
        alt="..."
        style={{ height: '220px', objectFit: 'contain' }}
      />
      <hr />
      <h4 className="py-2">{product.name}</h4>
      <p>
        Brand: {product.brand}, Category: {product.category} <br />
        {product.description.substr(0, 48) + '...'}
      </p>
      <h4 className="mb-2">{product.price}$</h4>
      <Link
        className="btn btn-primary btn-sm m-2"
        to={'/products/' + product.id}
        role="button"
      >
        Details
      </Link>
    </div>
  );
}
