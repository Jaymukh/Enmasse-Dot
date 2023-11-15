import React, { useState, useEffect } from 'react';
import '../App.css';
import '../styles/main.css';
import Select, { SelectSize } from './ui/select/Select';
import { useRecoilValue } from 'recoil';
import { mapFeatureState } from '../states/MapFeatureState';
import { useSettingsService } from '../services';
import { AllSettingsState, UserSettingsState } from '../states';

const options = [
    {
        currency: "US Dollar",
        symbol: "$"
    },
    {
        currency: "Indian Rupee",
        symbol: '₹'
    }
];

export default function InsightBar() {
    const [visible, setVisible] = useState(true);
    const [currency, setCurrency] = useState("US Dollar");
    const mapFeatures = useRecoilValue(mapFeatureState);
    // all settings's data
    const settingsService = useSettingsService();
    const settings = useRecoilValue(AllSettingsState);
    const usersettings = useRecoilValue(UserSettingsState);

    const handleChangeCurrency = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrency(event.target.value);
    }

    //function to get all the user's setting
    useEffect(() => {
        settingsService.getAllSettings();
        settingsService.getUserSettings();
    }, []);

    return (
        <div className='sideBar-parent-expended py-4 px-0 z-index-1' style={{ overflow: 'auto', overflowX: 'hidden', position: 'inherit' }} >
            <div className='row d-flex justify-content-between align-items-center px-3'>
                <div className='col-6 d-flex justify-content-start'>
                    <h6 className='ms-1 fs-16'>EnMasses Thesis</h6>
                </div>
                <div className='col-6'>
                    <Select
                        options={settings?.currencies}
                        value={usersettings?.currency}
                        labelKey='name'
                        valueKey='symbol'
                        size={SelectSize.small}
                        name='currency'
                    />
                </div>
            </div>
            <>
                <h6 className='fs-16 text-start px-3 my-1 ms-1'>{mapFeatures.cifData?.properties?.region}</h6>
                <div className="row d-flex justify-content-center py-2 mx-0 px-4">
                    <div className='row data-card px-3 d-flex flex-row mx-0 my-2'>
                        <div className='col-sm-11 col-md-11 col-lg-6 col-xl-6 mx-0 px-0 my-0 py-2 border-end d-flex flex-column align-items-start text-start' >
                            <h6 className='fs-14'>{mapFeatures.cifData?.properties?.totalHouseholds ? mapFeatures.cifData?.properties?.totalHouseholds : "__"}</h6>
                            <p className='fs-12 m-0'>Total Households</p>
                        </div>
                        <div className='col-sm-11 col-md-11	col-lg-6 col-xl-6 mx-0 px-0 my-0 py-2 ps-3 d-flex flex-column align-items-start text-start'>
                            <h6 className='fs-14'>{mapFeatures.cifData?.properties?.totalPopulation ? mapFeatures.cifData?.properties?.totalPopulation : "__"}</h6>
                            <p className='fs-12 m-0'>Total Population</p>
                        </div>
                    </div>
                    <div className='row data-card d-flex flex-row mx-0 my-2 px-0'>
                        <div className='col-12 p-0 d-flex flex-column align-items-center justify-content-center text-start py-2 border-bottom'>
                            <h6 className='text-left fs-18 m-0'>{mapFeatures.cifData?.properties?.enMassesThesis?.totalAddressableMarket ? mapFeatures.cifData?.properties?.enMassesThesis?.totalAddressableMarket : "__"}</h6>
                            <p className='fs-12 m-0'>Total Addressable Market</p>
                        </div>
                        <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 my-0 py-2 d-flex flex-column align-items-start justify-content-center text-start border-end' >
                            <h6 className='fs-14 m-0'>{mapFeatures.cifData?.properties?.enMassesThesis?.numberOfEntrepreneurialHouseholds ? mapFeatures.cifData?.properties?.enMassesThesis?.numberOfEntrepreneurialHouseholds : "__"}</h6>
                            <p className='fs-12 m-0'>Number of Entrepreneurial Households (EH)</p>
                        </div>
                        <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 my-0 py-2 d-flex flex-column align-items-start text-start'>
                            <h6 className='fs-14 m-0'>{mapFeatures.cifData?.properties?.EHSpend?.averageAnnualEHSpend ? mapFeatures.cifData?.properties?.EHSpend?.averageAnnualEHSpend : "__"}</h6>
                            <p className='fs-12 m-0'>Median Annual EH Household Spend</p>
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
}