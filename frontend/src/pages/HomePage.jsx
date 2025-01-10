
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={{ backgroundColor: '#f7fafc', minHeight: '100vh', padding: '10px' }}>
      {/* Header Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px 10px',
        flexWrap: 'wrap',
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#38b2ac', marginBottom: '10px' }}>
          Career Bridge 
        </h1>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '10px 20px',
              border: '1px solid #38b2ac',
              background: 'none',
              color: '#38b2ac',
              borderRadius: '5px',
              cursor: 'pointer',
            }}>
              Login
            </button>
          </Link>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '10px 20px',
              border: 'none',
              background: '#38b2ac',
              color: 'white',
              borderRadius: '5px',
              cursor: 'pointer',
            }}>
              Register
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content Section */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '20px',
        padding: '10px',
        flexWrap: 'wrap',
      }}>
        {/* Left Content */}
        <div style={{
          flex: 1,
          marginRight: '20px',
          marginBottom: '20px',
          minWidth: '300px',
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#4a5568',
            lineHeight: '1.2',
          }}>
            Turn Your Dreams into Reality, Apply for Jobs Easily from Home *
          </h2>
        
          <p style={{
            fontSize: '18px',
            color: '#4a5568',
            marginTop: '10px',
          }}>
            Say goodbye to long queues and missed chances. Forget waiting at CSC centers for hours. With Career Bridge, simply upload your documents, and let our team take care of your job applications online. Save time, skip the hassle, and focus on your future!.
          </p>
          <Link to="/login" style={{ textDecoration: 'none' }}> <button style={{
            padding: '15px 30px',
            background: '#38b2ac',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            marginTop: '10px',
            cursor: 'pointer',
          }}>
            Get Started
          </button>
          </Link>
        </div>

        {/* Right Content */}
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          minWidth: '300px',
        }}>
          <img
            src="https://www.believeinmind.com/wp-content/uploads/2022/07/6-reasons-to-Believe-In-Your-Dreams-%E2%80%93-Not-Letting-others-Steal.jpg"
            alt="Rural Job Helper"
            style={{ borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', maxWidth: '90%', height: 'auto' }}
          />
        </div>
      </div>

      {/* Responsive Design */}
      <style>
        {`
          @media (max-width: 768px) {
            div {
              flex-direction: row !important;
            }

            h2 {
              font-size: 22px !important;
            }
           p {
  font-size: 15px !important;
              }
            button {
              width: 100%;
            }

            img {
              max-width: 100% !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default HomePage;
