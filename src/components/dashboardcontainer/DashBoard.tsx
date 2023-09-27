import BubbleGraph from './BubbleGraph';
import FamilyDetails from './FamilyDetails';
import LineGraph from './LineGraph';
import OverViewMap from './OverViewMap';
import ScatterGraph from './ScatterGraph';
// import TableView from './TableView';

  
  const DashBoard = () => {
    return (
        <div className='row w-100 primary-bg m-0 pb-5' style={{height: '100vh', overflow: 'auto'}}>
            <div className='col-12 p-0'>
                <FamilyDetails />
            </div>
            <div className='col-5 p-0'> 
                <OverViewMap />
            </div>
            <div className='col-7 p-0'>
                <ScatterGraph />
            </div>
            <div className='col-6 p-0'>
                <BubbleGraph />
            </div>
            <div className='col-6 p-0 my-4'>
                <LineGraph />
            </div>
            {/* <div className='col-12 p-0'>
                <TableView />
            </div> */}
        </div>
    )
}

export default DashBoard;