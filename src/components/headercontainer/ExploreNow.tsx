import '../../App.css';
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
  const [selectedDistricts, setSelectedDistricts] = useState<any>([]);
  const [selectedDistrictOptions, setSelectedDistrictOptions] = useState<string[]>([]);
  const [selectedPlaceType, setSelectedPlaceType] = useState<string>('state');
  const [showExploreNowModal, setShowExploreNowModal] = useState<boolean>(false); // explore now dialog

  // explore now dialog open and close functions
  const openExploreNowModal = () => {
    setShowExploreNowModal(true);
  };

  const closeExploreNowModal = () => {
    setShowExploreNowModal(false);
    setSelectedValue('');
    setInputValue('');
    setSelectedDistricts(Constants.explorePlaces);
    setSelectedDistrictOptions(Constants.explorePlaces.map((option) => option.state));
    setSelectedPlaceType('state');
    setSelectedshowDiv(true);
  };

  const handleStateChange = (event: React.ChangeEvent<{}>, newValue: string | null, clear: string) => {
    if (!newValue && !selectedValue) {
      setSelectedDistricts(Constants.explorePlaces); // Keep the entire array
      setSelectedDistrictOptions(Constants.explorePlaces.map((option) => option.state));
      setSelectedPlaceType('state');
      setInputValue(clear);
    } else {
      if (!newValue) {
        const index = Constants.explorePlaces.findIndex((option) => option.state === selectedValue);
        setSelectedDistricts(Constants.explorePlaces[index].districts);
      } else {
        const val = Constants.explorePlaces.some((option) => option.state === newValue) ? 'districts' : 'state';
        if (val === 'districts') {
          setSelectedValue(newValue);
          setInputValue(clear); // Clear the input value when the option is selected
          const index = Constants.explorePlaces.findIndex((option) => option.state === newValue);
          setSelectedDistricts(Constants.explorePlaces[index].districts);
          setSelectedDistrictOptions(Constants.explorePlaces[index].districts);
          setSelectedPlaceType(val);
          setSelectedshowDiv(false);
        } else {
          const districtFound = Constants.explorePlaces.some((option) =>
            option.districts.includes(newValue)
          );
          if (districtFound) {
            setSelectedDistricts([newValue]);
            setSelectedPlaceType('districts');
            setSelectedshowDiv(false);
          } else {
            setSelectedDistricts(Constants.explorePlaces); // Keep the entire array
            setSelectedDistrictOptions(Constants.explorePlaces.map((option) => option.state));
            setSelectedPlaceType('state');
            setInputValue(clear);
          }
        }
      }
    }
  };

  const onhandleInputChange = (event: React.ChangeEvent<{}>, newInputValue: string) => {
    setInputValue('');
  };

  const clearInput = () => {
    setSelectedValue('');
    setInputValue('');
    setSelectedshowDiv(true);
    setSelectedDistricts(Constants.explorePlaces); // Keep the entire array
    setSelectedPlaceType('state');
  };

  return (
    <div>
      <button className='btn btn-black me-2' onClick={openExploreNowModal}>
        <MdOutlineTravelExplore className='me-2' fontSize={20} />
        Explore Now
      </button>
      <div
        className={`modal ${showExploreNowModal ? 'show' : ''}`}
        tabIndex={-1}
        role='dialog'
        style={{ display: showExploreNowModal ? 'block' : 'none', borderStyle: 'inset' }}
      >
        <div className='modal-dialog  modal-dialog-centered dialog-width'>
          <div className='modal-content'>
            <div className='modal-body d-flex flex-column justify-content-center w-auto m-3'>
              <div className='d-flex flex-row justify-content-between'>
                <h5>Explore Now</h5>
                <button type='button' className='btn-close' onClick={closeExploreNowModal}></button>
              </div>
              <div className='modal-dialog-scrollable'>
                <p className='Dialog-p'>
                  Explore the available list of regions in our platform. Our team is working on getting more regions unlocked for you!
                </p>
                <div className='d-flex flex-row justify-content-start'>
                  <h5 className=''>{selectedValue}</h5>
                  {selectedValue && ( // Show clear button only when inputValue is not empty
                    <button type='button' className='btn-close mx-3' onClick={clearInput} />
                  )}
                </div>
                <Stack spacing={2} sx={{ width: 300 }} className=''>
                  <Autocomplete
                    id='free-solo-demo'
                    onInputChange={onhandleInputChange}
                    value={inputValue}
                    freeSolo
                    options={
                      selectedPlaceType === 'districts'
                        ? selectedDistrictOptions
                        : Constants.explorePlaces.map((option) => option.state)
                    }
                    onChange={handleStateChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Search'
                        inputProps={{
                          ...params.inputProps,
                          style: {
                            height: '1rem',
                            textAlign: 'left',
                            display: 'flex',
                            alignItems: 'center',
                          },
                        }}
                      />
                    )}
                  />
                </Stack>
                <div className='my-4'>
                  {selectedshowDiv ? (
                    // Show this div when selectedValue is true
                    <div>
                      {Constants.explorePlaces.map((item) => (
                        <div key={item.state}>
                          <h5 className='d-flex justify-content-start'>{item.state}</h5>
                          <hr></hr>
                          <div className='row'>
                            {item.districts.map((district: string) => (
                              <div className='col-4 d-flex justify-content-start' key={district}>
                                <p className='color-green'>{district}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Show this div when selectedValue is false
                    <div className='div2'>
                      <h5 className='d-flex justify-content-start'>{selectedValue}</h5>
                      <hr></hr>
                      <div className='row'>
                        {selectedDistricts.map((district: string) => (
                          <div className='col-4 d-flex justify-content-start'>
                            <p className='color-green'>{district}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreNow;
