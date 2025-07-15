import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRedeemHistory } from '../redux/slices/redeemProductSlice';
import moment from 'moment';
import { Link } from 'react-router-dom';

const RedeemProductHistoryList = () => {
  const dispatch = useDispatch();
  const { allRedeemHistory, allRedeemPagination, loading } = useSelector((state) => state.redeem);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    dispatch(fetchAllRedeemHistory({ page, limit, search }));
  }, [dispatch, page, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const totalPages = allRedeemPagination?.totalPages || 1;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0 text-white">All Redeem History</h5>
          <input
            type="text"
            placeholder="Search by name, email or bill no"
            className="form-control w-50"
            value={search}
            onChange={handleSearchChange}
          />
        </div>

        <div className="card-body bg-light">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary"></div>
            </div>
          ) : allRedeemHistory.length === 0 ? (
            <div className="alert alert-info">No redeemed products found.</div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-bordered table-hover bg-white">
                  <thead className="table-secondary">
                    <tr>
                      <th>Bill No</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Points Used</th>
                      <th>User</th>
                      <th>Redeemed On</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allRedeemHistory.map((item) => (
                      <tr key={item._id}>
                        <td>{item.billNo}</td>
                        <td className="d-flex align-items-center gap-2">
                          <img
                            src={item.snapshot.productImage}
                            alt={item.snapshot.productName}
                            style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 6 }}
                          />
                          {item.snapshot.productName}
                        </td>
                        <td>₹{item.snapshot.priceValue}</td>
                        <td>{item.snapshot.pointsUsed}</td>
                        <td>{item.snapshot.userName}</td>
                        <td>{moment(item.createdAt).format('LLL')}</td>
                        <td>
                            <Link
                                className="btn btn-sm btn-outline-primary"
                                to={`/view-invoice/${item.billNo}`}
                            >
                                View Invoice
                            </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <nav className="mt-3">
                <ul className="pagination justify-content-center">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    return (
                      <li
                        key={pageNum}
                        className={`page-item ${page === pageNum ? 'active' : ''}`}
                      >
                        <button className="page-link" onClick={() => setPage(pageNum)}>
                          {pageNum}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RedeemProductHistoryList;
