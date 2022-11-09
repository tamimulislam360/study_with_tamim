import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthProvider';

const SocialLogin = () => {
    const { signInWithGoogle } = useContext(AuthContext)
    
    const handleGoogleSignIn = (e) => {
        e.preventDefault();
        signInWithGoogle()
        .then(res => {
            const user = res.user
            console.log(user);
        })
        .catch(err => console.error(err))
    }
    return (
        <button onClick={handleGoogleSignIn} className="btn btn-outline btn-primary rounded-full gap-2 btn-sm mt-2 font-bold">
            <FaGoogle className="" />
            Sign in with Google
        </button>
    );
};

export default SocialLogin;