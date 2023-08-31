import React, { useState } from 'react';
import '../App.css';
import Header from './headercontainer/Header';
import MapContainer from './mapcontainer/MapContainer';
import AccountContainer from './accountcontainer/AccountContainer';
import OverlayContainer from './OverlayContainer';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import DashBoard from './dashboardcontainer/DashBoard';
import FamilyContainer from './familyContainer/FamilyContainer';

const customTheme = (outerTheme: any) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    typography: {
      fontFamily: `"Poppins", sans-serif`,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-brandBorderColor': '#E0E3E7',
            '--TextField-brandBorderHoverColor': '#B2BAC2',
            '--TextField-brandBorderFocusedColor': '#111827',
            '& label.Mui-focused': {
              color: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: 'var(--TextField-brandBorderColor)',
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderHoverColor)',
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            '&:before, &:after': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            '&:before': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
    },
  });

function MainContainer() {
  const outerTheme = useTheme();

  const [overlay, setOverlay] = useState(true);
  const [mapDisplay, setMapDisplay] = useState(true);
  const [visiblePanel, setVisiblePanel] = useState(0);
  const [visibleDashboard, setVisibleDashboard] = useState(false);
  const [familyInfoDisplay, setFamilyInfoDisplay] = useState(false);

  const handleOverlay = (overlay: boolean) => {
    setOverlay(overlay);
  };

  const handleMapDisplay = (flag: boolean) => {
    setMapDisplay(flag);
  };

  const handleVisiblePanel = (index: number) => {
    setVisiblePanel(index);
  };

  const handleDisplayDashboard = (flag: boolean) => {
    setVisibleDashboard(flag);
  };

  const handlePopupClick = () => {
    setFamilyInfoDisplay(true);
  };

  return (
    <>
      <ThemeProvider theme={customTheme(outerTheme)}>
        <div className='w-100 primary-bg'>
          <Header
            handleMapDisplay={handleMapDisplay}
            handleVisiblePanel={handleVisiblePanel}
            handleDisplayDashboard={handleDisplayDashboard}
          />
          {mapDisplay && !visibleDashboard && !familyInfoDisplay ? (
            <MapContainer
              handleDisplayDashboard={handleDisplayDashboard}
              handlePopupClick={handlePopupClick}
            />
          ) : visibleDashboard && !familyInfoDisplay ? (
            <DashBoard
              handleMapDisplay={handleMapDisplay}
              handleDisplayDashboard={handleDisplayDashboard}
            />
          ) : !familyInfoDisplay ? (
            <AccountContainer
              handleMapDisplay={handleMapDisplay}
              handleDisplayDashboard={handleDisplayDashboard}
              handleVisiblePanel={handleVisiblePanel}
              visiblePanel={visiblePanel}
            />
          ) : (
            <FamilyContainer />
          )}
        </div>
        {overlay ? (
          <div className='overlay d-flex flex-wrap justify-content-center align-items-center'>
            <OverlayContainer handleOverlay={handleOverlay} />
          </div>
        ) : (
          ''
        )}
      </ThemeProvider>
    </>
  );
}

export default MainContainer;
