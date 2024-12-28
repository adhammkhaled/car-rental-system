import React from 'react';
import LoginForm from '../components/Auth/LoginForm'; // LoginForm component

const LoginPage = () => {
  return (
    <div>
      <div className='homepage-background'></div>
      <LoginForm /> {/* Render the LoginForm component */}
    </div>
  );
};

export default LoginPage;
