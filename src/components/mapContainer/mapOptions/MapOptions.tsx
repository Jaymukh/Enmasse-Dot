import '../../../App.css';
import { useState } from 'react';
import SelectBox from './SelectBox';
import { FiDownload } from 'react-icons/fi';
import { MdBookmarks } from 'react-icons/md';
import WIPDrawer from './WIPDrawer';
import { SelectChangeEvent } from '@mui/material';
import { Button, ButtonType, ButtonSize, ButtonVariant } from '../../ui/button/Button';

interface MapOptionsProps {
    handleGlobal: () => void;
    handleCountryChange: (event: SelectChangeEvent) => void;
    handleStateChange: (event: SelectChangeEvent) => void;
    handleDistrictChange: (event: SelectChangeEvent) => void;
    global: boolean;
    selectedCountry: string;
    selectedState: string;
    selectedDistrict: string;
    countries: any;
    states: any;
    districts: any;
}

function MapOptions({
    handleGlobal,
    handleCountryChange,
    handleStateChange,
    handleDistrictChange,
    global,
    selectedCountry,
    selectedState,
    selectedDistrict,
    countries,
    states,
    districts
}: MapOptionsProps) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');

    const openWIPDrawer = (title: string) => {
        setOpen(true);
        setTitle(title);
    };
    const closeWIPDrawer = () => {
        setOpen(false);
        setTitle('');
    };

    return (
        <div className='row justify-content-around align-items-center border-bottom bg-white mx-0' style={{ height: '7.5vh' }}>
            <div className='col-xl-7 col-md-7 justify-content-start d-flex flex-wrap h-100'>
                <div className='select-right-margin py-1'>
                    <button
                        className='subheader-btn global-btn px-3 text-start d-flex flex-row align-items-end'
                        onClick={handleGlobal}>
                        Global
                    </button>
                </div>
                {!global ? (
                    <div className='select-right-margin ms-2 py-1'>
                        <p className='country-text'>COUNTRY</p>
                        <SelectBox
                            handleChange={handleCountryChange}
                            options={countries}
                            selected={selectedCountry}
                            primary={false}
                        />
                    </div>
                ) : (
                    ''
                )}
                {!global && selectedCountry ? (
                    <div className='select-right-margin ms-2 py-1'>
                        <p className='country-text'>STATE</p>
                        <SelectBox
                            handleChange={handleStateChange}
                            options={states}
                            selected={selectedState}
                            primary={false}
                        />
                    </div>
                ) : (
                    ''
                )}
                {!global && selectedState ? (
                    <div className='select-right-margin ms-2 py-1'>
                        <p className='country-text'>DISTRICT</p>
                        <SelectBox
                            handleChange={handleDistrictChange}
                            options={districts}
                            selected={selectedDistrict}
                            primary={false}
                        />
                    </div>
                ) : (
                    ''
                )}
            </div>
            <div className='col-xl-5 col-md-5 d-flex flex-wrap justify-content-end align-items-center'>
                <Button
                    type={ButtonType.secondary}
                    size={ButtonSize.small}
                    variant={ButtonVariant.transparent}
                    onClick={() => openWIPDrawer("Download data")}
                >
                    <FiDownload className='me-2' fontSize={15} />
                    Download data
                </Button>
                <button
                    className='btn-white px-1'
                    onClick={() => openWIPDrawer("Bookmarks")}
                >
                    <div className='d-flex flex-wrap'>
                        <MdBookmarks className='mt-1' />
                        <p className='mx-2 my-1 fs-12'>Bookmarks</p>
                    </div>
                </button>
            </div>
            {open && <WIPDrawer open={open} title={title} closeWIPDrawer={closeWIPDrawer} />}
        </div>
    );
}

export default MapOptions;
