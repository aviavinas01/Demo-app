import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../../firebaseconfig'; // Adjust the path as needed to import your Firebase auth instance

const provider = new GoogleAuthProvider();
// Forces the user to select an account, preventing auto-login with the wrong email
provider.setCustomParameters({ prompt: 'select_account' });

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      // Send token to our Gatekeeper backend route
      const response = await axios.post(
        'https://krayaaa.onrender.com/api/users/check-user',
        {},
        { headers: { Authorization: `Bearer ${idToken}` } }
      );

      const data = response.data;

      if (data.exists) {
        // Existing user, send to dashboard or home
        navigate('/dashboard');
      } else {
        // New user from a valid university, send to complete profile
        navigate('/complete-profile', { state: { universityId: data.universityId } });
      }
    } catch (err: any) {
      console.error('Initialization error:', err);

      // 1. Network / No Internet Detection
      if (!navigator.onLine || err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        setError('Network error. Please check your internet connection and try again.');
      }
      // 2. Timeout (Backend took too long to respond)
      else if (err.code === 'ECONNABORTED') {
        setError('The server is taking too long to respond. Please try clicking confirm again.');
      }
      // 3. Specific Backend Errors (e.g., Username taken)
      else if (err.response?.status === 400 && err.response?.data?.msg === 'Username already taken') {
        setError('That username is already taken. Please choose another.');
      }
      // 4. Firebase Session Drop
      else if (err.message.includes('Session expired')) {
        setError('Your secure session expired. Please refresh the page or log in again.');
      }
      // 5. Standard Backend Error Message
      else if (err.response?.data?.msg) {
        setError(err.response.data.msg);
      }
      // 6. The Ultimate Catch-All (No deadlocks!)
      else {
        setError('We encountered a problem setting up your profile. Please try again.');
      }
    } finally {
      setIsLoading(false); // ALWAYS releases the button lock, preventing deadlocks.
    }
  };

  return (
    <div className="min-h-screen w-full bg-krayaa-dark flex items-center justify-center p-6 font-body">

      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-krayaa-gold/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row bg-[#1A130D] rounded-2xl shadow-2xl overflow-hidden border border-krayaa-cream/10">

        {/* Left Side: Branding / Marketing */}
        <div className="w-full md:w-1/2 bg-[#2B231D] p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Background Accent */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-krayaa-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <Link to="/" className="inline-block mb-12">
              {/* Fallback to text if logo isn't passed, or use your actual logo path */}
              <h2 className="font-display font-bold text-3xl text-krayaa-gold tracking-widest uppercase">
                Krayaa
              </h2>
            </Link>

            <h1 className="font-display font-bold text-5xl lg:text-6xl text-krayaa-cream leading-tight mb-6">
              The exclusive <br /> community.
            </h1>
            <p className="text-krayaa-cream/70 text-lg font-light max-w-sm mb-12">
              Connect with peers, access local resources, and engage in unfiltered discussions on your campus network.
            </p>
          </div>

          <div className="relative z-10 flex gap-6 text-krayaa-gold font-semibold tracking-widest uppercase text-sm">
            <span>✓ Learn</span>
            <span>✓ Build</span>
            <span>✓ Grow</span>
          </div>
        </div>

        {/* Right Side: Action Area */}
        <div className="w-full md:w-1/2 p-12 lg:p-16 flex flex-col justify-center bg-white">

          <div className="max-w-md w-full mx-auto">
            <h2 className="font-display font-bold text-4xl text-[#4A3525] mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-500 mb-10 font-medium">
              Sign in with your verified university email to continue.
            </p>

            {/* Error Message Display */}
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm font-medium flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0 mt-0.5">
                  <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-4 bg-white border border-gray-300 text-gray-700 font-bold text-lg py-4 px-6 rounded-xl shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                // Loading Spinner
                <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                // Google Logo
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google Icon"
                  className="w-6 h-6"
                />
              )}
              {isLoading ? 'Verifying Domain...' : 'Continue with Google'}
            </button>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <p className="text-center text-xs text-gray-400 font-medium">
                Only partnered university domains are supported. <br />
                If your university is not listed, <a href="/contact" className="text-krayaa-gold hover:underline">request access here</a>.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;