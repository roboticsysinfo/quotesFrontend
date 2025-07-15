import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboard } from '../redux/slices/userSlice';
import { Link } from 'react-router-dom';


const UserLeaderBoard = () => {

  const dispatch = useDispatch();
  const { leaderboard, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  console.log("leaderboard", leaderboard);


  return (
    <div className="container">

      <div className='row d-flex justify-content-center mt-5'>
        <div className='col-lg-10 col-xs-12 col-sm-12'>

          <div className='card'>
            <div className='card-body'>

              <h5>🏆 Leaderboard</h5>

              <hr />

              {loading && <p>Loading Leaderboard...</p>}
              {error && <p className="error">{error}</p>}

              {!loading && leaderboard.length === 0 && <p>No users on Leaderboard.</p>}

              {!loading && leaderboard.length > 0 && (
                <table className="leaderboard-table mt-3 ">
                  <thead className='table-info'>
                    <tr>
                      <th>Rank</th>
                      <th>Profile</th>
                      <th>Name</th>
                      <th>Points</th>
                      <th>Referral Code</th>
                      <th>Points History</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((user) => (
                      <tr key={user.referralCode}>
                        <td>
                          {user.rank === 1
                            ? '🥇'
                            : user.rank === 2
                              ? '🥈'
                              : user.rank === 3
                                ? '🥉'
                                : `#${user.rank}`}
                        </td>
                        <td>
                          <img
                            src={user?.userImage ? `${process.env.REACT_APP_UPLOADS_URL}${user?.userImage}` : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                            alt="User"
                            className="user-img"
                          />
                        </td>
                        <td>{user.name}</td>
                        <td>{user.points}</td>
                        <td>{user.referralCode}</td>
                        <td>
                          <Link to={`/points-transaction-history/${user.id}`} className='btn btn-sm btn-primary' >
                            View Points History
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default UserLeaderBoard;
