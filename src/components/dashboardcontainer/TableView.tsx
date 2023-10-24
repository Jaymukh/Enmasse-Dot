import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi';
import { headers } from '../../utils/constants/Constants';
import { dashboardTableData } from '../../utils/constants/Constants';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';


const TableView = () => {
    return (
        <div className='white-bg pt-4 pb-5 dashboard-col p-3'>
            <Heading
                title='State wise metric breakdown'
                type={TypographyType.h4}
                colour={TypographyColor.dark}
                classname='text-start mb-3 px-1'
            />
            <div className='dashboard-table-container mx-1'>
                <table>
                    <thead>
                        <tr>
                            {headers.map((item, index) => (
                                <th className='fs-14 text-start'>
                                    <div className='d-flex flex-row align-items-center'>
                                        <p className='pt-3 pe-2'>{item}</p>
                                        <div className='d-flex flex-column'>
                                            <button className='border-0 bg-white py-0'>
                                                <BiSolidUpArrow fontSize={9} />
                                            </button>
                                            <button className='border-0 bg-white py-0'>
                                                <BiSolidDownArrow fontSize={9} color='#367A2B' />
                                            </button>
                                        </div>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dashboardTableData.map((item, index) => (
                            <tr key={index}>
                                <td className='fs-14 table-state-row'>{item.state}</td>
                                <td className='fs-14'>{item.households}</td>
                                <td className='fs-14'>{item.medianAnnualEHSpend}</td>
                                <td className='fs-14'>{item.medianAnnualEHIncome}</td>
                                <td className='fs-14'>{item.EMrank}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableView;