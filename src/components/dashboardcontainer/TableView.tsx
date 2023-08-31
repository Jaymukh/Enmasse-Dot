import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi';
import { headers } from '../../utils/constants/Constants';
import { dashboardTableData } from '../../utils/constants/Constants';


const TableView = () => {
    return (
        <div className='white-bg pt-4 pb-5 dashboard-col px-4 ms-4'>
            <h2 className="text-start fs-14 mb-3">State wise metric breakdown</h2>
            <div className='dashboard-table-container'>
                <table>
                    <thead>
                        <tr>
                            {headers.map((item, index) => (
                                <th className='fs-14 text-start'>
                                    <div className='d-flex flex-row align-items-center'>
                                        <p className='pt-3 pe-2'>{item}</p>
                                        <div className='d-flex flex-column pb-2'>
                                            <button className='border-0 bg-transparent table-header-btn'>
                                                <BiSolidUpArrow fontSize={12} color='#CDCDCD' />
                                            </button>
                                            <button className='border-0 bg-transparent table-header-btn'>
                                                <BiSolidDownArrow fontSize={12} color='#367A2B' />
                                            </button>
                                        </div>
                                    </div>
                                </th>))}
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