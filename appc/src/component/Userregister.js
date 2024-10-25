import React, { useState } from 'react';
import '../home.css';

const SignUp = () => {
  const [showForm, setShowForm] = useState(false);

  // Handler to toggle form visibility
  const handleSignInClick = () => {
    setShowForm(true); // Show the form when clicked
  };

  return (
    <div className="container">
      {/* Left section with posters */}
      <div className="left-section">
        <img
          src="https://imageurl.jpg" // Replace with a suitable image URL
          alt="Movie Posters"
          className="movie-posters"
        />
      </div>

      {/* Right section with either button or form */}
      <div className="right-section">
        {showForm ? (
          <div className="sign-up-form">
            <h2>Sign Up to CoWatch</h2>
            <p>Create an account and start watching together with your friends. It’s quick and easy!</p>
            
            <div className="input-container">
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Last Name" />
            </div>
            
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm-Password" />
            
            <button className="create-account-button">Create Account</button>
            
            <div className="divider">Or Sign Up with</div>
            
            <div className="social-signup">
              <button className="social-button facebook">Facebook</button>
              <button className="social-button google">Google</button>
            </div>
            
            <p className="terms">
              By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </p>
            <p className="login-link">
              Already have an account? <a href="#">Sign In now</a>
            </p>
          </div>
        ) : (
          <button className="sign-in-button" onClick={handleSignInClick}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default SignUp;
