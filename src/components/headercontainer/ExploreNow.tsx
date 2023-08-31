import '../../styles/headercontainer/ExploreNow.css';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { MdOutlineTravelExplore } from 'react-icons/md';
import * as Constants from '../../utils/constants/Constants';

const ExploreNow = () => {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedshowDiv, setSelectedshowDiv] = useState<boolean>(true);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedDistrictOptions, setSelectedDistrictOptions] = useState<string[]>([]);
  const [selectedPlaceType, setSelectedPlaceType] = useState<string>('state');
  const [showExploreNowModal, setShowExploreNowModal] = useState<boolean>(false);

  const openExploreNowModal = () => {
    setShowExploreNowModal(true);
  };

  const closeExploreNowModal = () => {
    setShowExploreNowModal(false);
    setSelectedValue('');
    setInputValue('');
    setSelectedDistricts(Constants.explorePlaces);
    setSelectedDistrictOptions(Constants.explorePlaces);
    setSelectedPlaceType('state');
    setSelectedshowDiv(true);
  };

  const handleStateChange = (event: React.ChangeEvent<{}>, newValue: string | null, clear: string) => {
    // ...
  };

  const onhandleInputChange = (event: React.ChangeEvent<{}>, newInputValue: string) => {
    setInputValue('');
  };

  const clearInput = () => {
    setSelectedValue('');
    setInputValue('');
    setSelectedshowDiv(true);
    setSelectedDistricts(Constants.explorePlaces);
    setSelectedPlaceType('state');
  };

  return (
    <div>
      <button className='btn btn-black me-2' onClick={openExploreNowModal} >
        <MdOutlineTravelExplore className='me-2' fontSize={20} />
        Explore Now
      </button>
      <div className={`modal ${showExploreNowModal ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: showExploreNowModal ? 'block' : 'none', borderStyle: 'inset' }}>
        <div className="modal-dialog  modal-dialog-centered dialog-width">
          <div className="modal-content">
            <div className="modal-body d-flex flex-column justify-content-center w-auto m-3">
              <div className='d-flex flex-row justify-content-between'>
                <h5>Explore Now</h5>
                <button type="button" className="btn-close" onClick={closeExploreNowModal}></button>
              </div>
              {/* ... */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExploreNow;
