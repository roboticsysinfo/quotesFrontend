import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchAllUsers,
    deleteUserById,
} from '../redux/slices/userSlice';
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from 'react-router-dom';

const UsersList = () => {

    const dispatch = useDispatch();
    const { users, loading } = useSelector((state) => state.users);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    const handleDelete = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUserById(userId));
        }
    };

    const filteredUsers = users
        .filter((user) =>
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Newest first

    return (
        <div className='card h-100 p-0 radius-12' style={{ padding: '20px' }}>

            <div className='card-header d-flex justify-content-between align-items-center'>
                <h6 className='text-dark mb-0'>User List</h6>
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ borderRadius: 8, padding: '8px', marginBottom: '16px', width: '600', border: '1px solid #efefef' }}
                />
            </div>

            {loading ? (
                <p>Loading users...</p>
            ) : (



                <div className='card-body'>

                    <table className='table table-bordred' style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: '#f4f4f4' }}>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Points</th>
                                <th>Referral Code</th>
                                <th>Created At</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user, index) => (
                                    <tr key={user._id}>
                                        <td>{index + 1}</td>
                                        <td>{user.name || '-'}</td>
                                        <td>{user.email || '-'}</td>
                                        <td>{user.points || 0}</td>
                                        <td>{user.referralCode || '-'}</td>
                                        <td>{new Date(user.createdAt).toLocaleString()}</td>
                                        <td>
                                            <Link
                                                to={`/referral-list/${user._id}`}
                                                className="btn btn-sm btn-primary"
                                            >
                                                View Referrals
                                            </Link>
                                            {' '}
                                            <button onClick={() => handleDelete(user._id)} style={{ color: 'red' }}>
                                                <RiDeleteBin6Line />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="7" style={{ textAlign: 'center' }}>No users found</td></tr>
                            )}
                        </tbody>
                    </table>

                </div>




            )}
        </div>
    );
};

export default UsersList;
