import React, { useEffect } from 'react'
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { fetchAllUsers } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { fetchQuotes } from '../../redux/slices/quotesSlice';
const UnitCountOne = () => {

    const dispatch = useDispatch();

    const totalUsers = useSelector(state => state.users.users.length);
    const imageQuoteCount = useSelector(state =>
        state.quotes.quotes.filter(q => q.type === 'image').length
    );

    const videoQuoteCount = useSelector(state =>
        state.quotes.quotes.filter(q => q.type === 'video').length
    );

    useEffect(() => {
        dispatch(fetchAllUsers());
        dispatch(fetchQuotes());
    }, [dispatch]);

    return (
        <div className="row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4">
            <div className="col">
                <div className="card shadow-none border bg-gradient-start-1 h-100">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">Total Users</p>
                                <h6 className="mb-0">{totalUsers}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="gridicons:multiple-users"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* card end */}
            </div>
            <div className="col">
                <div className="card shadow-none border bg-gradient-start-2 h-100">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">
                                    Total Image Quotes
                                </p>
                                <h6 className="mb-0">{imageQuoteCount}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="fa-solid:award"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* card end */}
            </div>

            <div className="col">
                <div className="card shadow-none border bg-gradient-start-3 h-100">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">
                                    Total Video Quotes
                                </p>
                                <h6 className="mb-0">{videoQuoteCount}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-info rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="fluent:people-20-filled"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* card end */}
            </div>

            
        </div>

    )
}

export default UnitCountOne