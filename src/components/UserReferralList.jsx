import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReferralDetails } from "../redux/slices/userPointsSlice";
import { useParams } from "react-router-dom";

const UserReferralList = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { referralDetails, loading, error } = useSelector((state) => state.userPoints);

  useEffect(() => {
    if (id) {
      dispatch(getReferralDetails(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-4">{error}</div>;
  }

  return (
    <div className="container mt-4">
      {/* Cards Row */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Referral Code</h5>
              <p className="card-text fw-bold">
                {referralDetails?.referralCode || "-"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Referral Shares</h5>
              <p className="card-text fw-bold text-primary">
                {referralDetails?.referralShares || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Invites Accepted</h5>
              <p className="card-text fw-bold text-success">
                {referralDetails?.referralDownloads || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Referred Users</h5>
              <p className="card-text fw-bold text-warning">
                {referralDetails?.referredUsers?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-header fw-bold">Referred Users registered via your Referral Code</div>
        <div className="card-body p-0">
          <table className="table table-striped mb-0">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Referral Code</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {referralDetails?.referredUsers?.length > 0 ? (
                referralDetails.referredUsers.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.referralCode}</td>
                    <td>{user.createdAtFormatted}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-muted">
                    No referred users yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserReferralList;
