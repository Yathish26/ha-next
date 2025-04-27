'use client'; // <-- Important for client-side components

import { GoogleLogin } from '@react-oauth/google';

const GoogleSignIn = ({ onSuccess, onFailure }) => {
  return (
    <div>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onFailure}
        logo="https://developers.google.com/identity/images/g-logo.png" 
      />
    </div>
  );
};

export default GoogleSignIn;
