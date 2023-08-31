import React from 'react';

interface LandingPageProps {
  handleInfographic: (value: number) => void;
  handleOverlay: (overlay: boolean) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ handleInfographic, handleOverlay }) => {

  return (
    <div>
      <h4 className='text-white mb-3'>
        Hello! Welcome to Enmasse | D.O.T.S
      </h4>
      <div className='d-flex flex-column px-5 mx-5'>
        <button className='transparent-btn border border-white bg-transparent text-white px-4 py-2 rounded-1 mx-5 my-2' onClick={() => handleInfographic(1)}>
          Start Exploring
        </button>
        <button
          className='transparent-btn border-0 bg-transparent text-white px-4 py-2 rounded-1'
          onClick={() => handleOverlay(false)}
        >
          Skip
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
