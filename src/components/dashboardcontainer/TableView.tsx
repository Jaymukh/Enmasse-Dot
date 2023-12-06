// External libraries
import { AiOutlineInfoCircle } from 'react-icons/ai';

// CSS
import '../../styles/main.css';

// Components
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import { Card, CardSize, CardVariant } from '../ui/card/Card';
import Table, { TableSize } from '../ui/table/Table';
import NoVisualData from './NoVisualData';

// Utilities
import { TableHeaderProps } from '../../constants';
import InfoPanel from '../ui/InfoPanel';

interface TableViewProps {
    data: any;
    headerData: TableHeaderProps;
    breakdownType?: string
}

const TableView: React.FC<TableViewProps> = ({ data, headerData, breakdownType }) => {
    return (
        <div>
            <Card size={CardSize.default} variant={CardVariant.contained} classname='p-3'>
                <div className='d-flex align-items-center m-0 p-0 mb-3'>
                    <Heading
                        title={(breakdownType && headerData?.ID === 'metric-breakdown') ? `${breakdownType} ${headerData.NAME}` : `${headerData.NAME}`}
                        type={TypographyType.h5}
                        colour={TypographyColor.dark}
                        classname='text-start px-1 my-0'
                    />
                    <InfoPanel fontSize={15} text='Hi ! This is info text.' />
                </div>

                {(data && data?.length > 0)
                    ? <Table headers={headerData} data={data} size={TableSize.medium} breakdownType={breakdownType} />
                    : <NoVisualData displayImage={true} />}
            </Card>
        </div>
    );
};

export default TableView;