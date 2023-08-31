import { FiArrowRight } from 'react-icons/fi';

const FamilyDetails = () => {
    return (
        <div className='my-4 ms-4'>
            <h4 className='text-start fs-1125'>India</h4>
            <div className='row mt-3 mx-0'>
                <img className='col-2 pe-0 ps-0'></img>
                <div className='col-10 white-bg py-4 px-4'>
                    <div className='d-flex flex-row'>
                        <h6 className='fs-18'>Ashe Family</h6>
                        <p className='ms-3 fs-14'>Kutch, Gujarat, India</p>
                    </div>
                    <div className='d-flex flex-row'>
                        <h6 className='fs-14'>05</h6>
                        <p className='ms-2 me-4 grey-para fs-11'>Family members</p>
                        <h6 className='ms-2 fs-14'>$10,500</h6>
                        <p className='ms-2 me-4 grey-para fs-11'>Household Spend</p>
                        <h6 className='ms-2 fs-14'>$9,000</h6>
                        <p className='ms-2 me-4 grey-para fs-11'>Household Income</p>
                    </div>
                    <p className='text-start fs-12'>The Ashe family lives in India. Suvarna is 45 years old and she is a housewife. Her husband Ravindra is 53 years old and he owns a small business. They live along with their mother who is a retired woman and 2 sons. Hirabai, their mother, is 72 years old. Chandan, their son, is 26 years old and he helps them with their…</p>
                    <div className='d-flex justify-content-start'>
                        <button className='rounded text-start ps-0 border-0 fs-12 white-bg fw-bold green-text' >View all families<FiArrowRight className='ms-2' /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FamilyDetails;