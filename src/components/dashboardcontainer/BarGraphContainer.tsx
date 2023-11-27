// External libraries
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

// CSS
import '../../styles/main.css';

// Components
import { Card, CardSize, CardVariant } from '../ui/card/Card';
import NavTab from '../ui/navtab/NavTab';
import BarGraph from './BarGraph';
import NoVisualData from './NoVisualData';
import { CoreSolutionByEH, cifState } from '../../states';

const BarGraphContainer = () => {
    const { coreSolutionsData } = useRecoilValue(cifState);

    // const tabItems = [
    //     { key: 0, label: 'Healthcare', active: true, id: 'healthcare' },
    //     { key: 1, label: 'Agri Market', active: false, id: 'agri_markets' },
    //     { key: 2, label: 'Education', active: false, id: 'education' },
    //     { key: 3, label: 'Financial Solutions', active: false, id: 'financial_solutions' },
    // ];

    const [selected, setSelected] = useState<CoreSolutionByEH | undefined>(coreSolutionsData?.coreSolutionsByEH![0] || []);

    const handleTabClick = (item: CoreSolutionByEH) => {
        setSelected(item);
    }

    useEffect(() => {
        if (coreSolutionsData?.coreSolutionsByEH?.length > 0) {
            setSelected(coreSolutionsData.coreSolutionsByEH[0]);
        }

    }, [coreSolutionsData?.coreSolutionsByEH]);
    return (
        <div className='h-100'>
            <Card size={CardSize.default} variant={CardVariant.contained} classname='p-3 h-100'>
                <NavTab navItems={coreSolutionsData?.coreSolutionsByEH} selected={selected?.type} handleTabClick={handleTabClick} />
                {(selected?.subcategory && selected?.subcategory?.length > 0) ?
                    <BarGraph selected={selected} /> :
                    <NoVisualData displayImage={true} />}
            </Card>
        </div>
    )
}

export default BarGraphContainer;