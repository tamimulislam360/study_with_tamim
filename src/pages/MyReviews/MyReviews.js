import React, { useContext, useEffect, useState } from 'react';
import { FaEdit, FaStar, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useTitle from '../../hooks/useTitle';

import { notify } from '../../utilities/notify';

const MyReviews = () => {
    useTitle('My Reviews')
    const { user } = useContext(AuthContext)
    const [reviews, setReviews] = useState([])

    // load all reviews based on specific user email
    useEffect(() => {
        fetch(`http://localhost:5000/reviews?email=${user.email}`)
        .then(res => res.json())
        .then(data => setReviews(data))
    },[user.email, reviews])


    // delete a review
    const deleteReview = (id) => {
        fetch(`http://localhost:5000/reviews/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if (data.deletedCount === 1) {
                notify('Succesfully deleted')
                const remaining = reviews.filter(review => review._id !== id)
                setReviews(remaining)
            }
        })
    }

    return (
       
        <div className="sm:p-3 p-2 mb-20 overflow-x-hidden">
            <h2 className="text-2xl font-bold text-center border mt-3">You have {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:p-3">
                {
                    reviews.map(review => {
                        const {_id, courseName, courseImage, userReview} = review
                        return (
                            <div key={_id} className="border p-2 h-fit shadow-xl">
                                
                                <div className="flex gap-3 mb-8">
                                
                                    
                                        <img
                                        
                                        src={courseImage}
                                        alt={courseName}
                                        className="w-16 h-16 rounded" />
                                    
                                    <div className='w-full'>
                                        <h2 className="text-xl font-bold">{courseName}</h2>
                                        <div className="flex items-center justify-between mt-2 mx-1">
                                            <div className="flex items-center gap-2 text-orange-500">
                                                <FaStar/>
                                                <FaStar/>
                                                <FaStar/>
                                                <FaStar/>
                                                <FaStar/>
                                            </div>
                                        <div className="flex items-center gap-2">
                                            <Link className="tooltip" data-tip="Edit Review"><FaEdit /></Link>
                                            <Link onClick={() => deleteReview(_id)} className="tooltip" data-tip="Delete Review"><FaTrashAlt/></Link>
                                            
                                        </div>
                                        </div>
                                    </div>
                                </div>

                                <p>{userReview}</p>
                            </div>
                        )
                    })
                }
                
            </div>
                {
                    reviews.length === 0 && <>
                        <p className="text-xl font-bold text-center mt-40">No reviews were added</p>
                        <p className="text-center mt-3">See <Link to="/services" className="text-violet-600">Services</Link> and add review</p>
                    </>
            }
            
            
            </div>
        
        
    );
};

export default MyReviews;