import { FiArrowRight } from 'react-icons/fi';
import { Card, CardSize, CardVariant } from '../ui/card/Card';
import Navale from '../../utils/images/Navale.png'
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import { ProgressBar } from '../ui/progressbar/ProgressBar';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import '../../styles/main.css';

const FamilyDetails = () => {
    return (
        <div className='mx-0'>
            <div className='row d-flex justify-content-between align-items-center py-2 m-0'>
                <div className='col-4 p-0'>
                    <Heading
                        title='India'
                        type={TypographyType.h3}
                        colour={TypographyColor.dark}
                        classname='text-start'
                    />
                </div>
                <div className='col-5 d-flex align-items-center justify-content-around py-2 coverage-div'>
                    <h6 className='w-auto fs-14 text-end m-0 text-nowrap pe-2'>EI Coverage</h6>
                    <AiOutlineInfoCircle fontSize={35} color='#606060' className='me-2' />
                    <ProgressBar />
                    <p className='w-auto fs-12 m-0 text-end text-nowrap ps-2'>100 out Of 753 Districts</p>
                </div>
            </div>
            <Card size={CardSize.default} variant={CardVariant.bordered} classname='mx-0 mt-2 row'>
                {/* <div className='row mt-3 mx-0'> */}
                <img className='col-2 pe-0 ps-0 rounded-start' src={Navale}></img>
                <div className='col-10 white-bg py-4 px-4 rounded-end'>
                    <div className='d-flex flex-row'>
                        <h6 className='fs-16'>Ashe Family</h6>
                        <p className='ms-3 fs-12'>Kutch, Gujarat, India</p>
                    </div>
                    <div className='d-flex flex-row'>
                        <h6 className='fs-14 green-text'>$900</h6>
                        <p className='ms-2 me-4 grey-para fs-10'>Annual Household Spend on Education</p>
                    </div>
                    <p className='text-start fs-12'>The Ashe family lives in India. Suvarna is 45 years old and she is a housewife. Her husband Ravindra is 53 years old and he owns a small business. They live along with their mother who is a retired woman and 2 sons. Hirabai, their mother, is 72 years old. Chandan, their son, is 26 years old and he helps them with their…</p>
                    <div className='d-flex justify-content-start'>
                        <button className='rounded text-start ps-0 border-0 fs-10 white-bg fw-bold green-text' >View all families<FiArrowRight className='ms-2' fontSize={18} /></button>
                    </div>
                </div>
                {/* </div> */}
            </Card>
        </div>
    )
}

export default FamilyDetails;