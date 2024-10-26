import React, { useEffect, useState, useMemo } from 'react';
import { getProducts, deleteProduct } from '../api/productApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useTable } from 'react-table';
import ReactPaginate from 'react-paginate';
import '../css/ProductList.css';

function ProductList({ onEdit }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minQuantity, setMinQuantity] = useState('');
  const [maxQuantity, setMaxQuantity] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    getProducts()
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id)
        .then(() => setProducts(products.filter(product => product.id !== id)))
        .catch(error => console.error('Error deleting product:', error));
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // Filter products based on search term and additional filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMinPrice = minPrice ? product.price >= minPrice : true;
    const matchesMaxPrice = maxPrice ? product.price <= maxPrice : true;
    const matchesMinQuantity = minQuantity ? product.quantity >= minQuantity : true;
    const matchesMaxQuantity = maxQuantity ? product.quantity <= maxQuantity : true;

    return matchesSearch && matchesMinPrice && matchesMaxPrice && matchesMinQuantity && matchesMaxQuantity;
  });

  // Calculate current products to display based on pagination
  const offset = currentPage * itemsPerPage;
  const currentProducts = filteredProducts.slice(offset, offset + itemsPerPage);

  // Define columns for react-table
  const columns = useMemo(() => [
    { Header: 'Product Name', accessor: 'name' },
    { Header: 'Description', accessor: 'description' },
    { Header: 'Price', accessor: 'price' },
    { Header: 'Quantity', accessor: 'quantity' },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <div>
          <button className="edit-btn" onClick={() => onEdit(row.original)}>Edit</button>
          <button className="delete-btn" onClick={() => handleDelete(row.original.id)}>Delete</button>
        </div>
      )
    }
  ], [onEdit]);

  // Initialize react-table with currentProducts
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: currentProducts
  });

  return (
    <div className="product-list">
      <h2>Product List</h2>

      <div className="filter-options">
        <input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="filter-button" onClick={() => setFilterOpen(!filterOpen)}>
          <FontAwesomeIcon icon={faFilter} /> Filter
        </button>
        {filterOpen && (
          <div className="dropdown">
            <div>
              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="filter-input"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="filter-input"
              />
              <input
                type="number"
                placeholder="Min Quantity"
                value={minQuantity}
                onChange={(e) => setMinQuantity(e.target.value)}
                className="filter-input"
              />
              <input
                type="number"
                placeholder="Max Quantity"
                value={maxQuantity}
                onChange={(e) => setMaxQuantity(e.target.value)}
                className="filter-input"
              />
            </div>
          </div>
        )}
      </div>

      {/* Product Table */}
      <table {...getTableProps()} className="product-table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(filteredProducts.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
}

export default ProductList;
