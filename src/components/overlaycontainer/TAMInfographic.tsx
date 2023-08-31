import React from 'react';
import img6 from '../../utils/images/img6.png';

interface TAMInfographicProps {
  handleInfographic: (value: number) => void;
  handleOverlay: (overlay: boolean) => void;
}

const TAMInfographic: React.FC<TAMInfographicProps> = ({ handleInfographic, handleOverlay }) => {

  return (
    <div className=''>
      <div className='bg-black-opacity d-flex flex-row justify-content-center'>
        <div className='d-flex flex-column justify-content-right TotalAdressableMarket-div-2'>
          <h5 className='color-white justify-content-start'>Total Addressable Market (TAM)</h5>
          {/* <h2 className='color-white'>Entrepreneurial households</h2> */}
          <p className='color-white'>Total Addressable Market (TAM) refers to the total revenue opportunity available for you to act upon</p>
          <div className='d-flex justify-content-between '>
            <button className='border-0 bg-transparent text-white px-4 py-2 rounded-1' onClick={() => handleOverlay(false)}>Skip</button>
            <button className="btn btn-light btn-height" onClick={() => handleOverlay(false)}>Next</button>
          </div>
        </div>
        <span className='' style={{ width: '300px', height: '300px', border: '1px solid white' }}></span>
        {/* <img src={img6} alt="TAM Infographic" width="300" height="300" className='TotalAdressableMarketImg' /> */}
      </div>
    </div>
  );
}

export default TAMInfographic;
