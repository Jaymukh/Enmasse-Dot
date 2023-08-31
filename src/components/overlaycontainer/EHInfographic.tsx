import React from 'react';
import img4 from '../../utils/images/img4.png';

interface EHInfographicProps {
  handleInfographic: (value: number) => void;
  handleOverlay: (overlay: boolean) => void;
}

const EHInfographic: React.FC<EHInfographicProps> = ({ handleInfographic, handleOverlay }) => {

  return (
    <div className=''>
      <div className='bg-black-opacity d-flex flex-row justify-content-center'>
        <div className='d-flex flex-column justify-content-center EHinfograpic-div-2'>
          <h5 className='color-white justify-content-start'>Region of Potent Entrepreneurial households</h5>
          <p className='color-white'>Entrepreneurial households: represent households with its members engaged in opportunities of potential growth and economic activities</p>
          <div className='d-flex justify-content-between '>
            <button className='border-0 bg-transparent text-white px-4 py-2 rounded-1' onClick={() => handleOverlay(false)}>Skip</button>
            <button className="btn btn-light btn-height" onClick={() => handleInfographic(2)}>Next</button>
          </div>
        </div>
        <img src={img4} alt="Girl in a jacket" width="300" height="300" className='imgBorderRadiousinfograpic' />
      </div>
    </div>
  );
}

export default EHInfographic;
