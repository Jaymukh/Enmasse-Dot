import { useState } from 'react';
import { Card, CardSize, CardVariant } from '../ui/card/Card';
import NavTab from '../ui/navtab/NavTab';
import BarGraph from './BarGraph';

const BarGraphContainer = () => {
    const tabItems = [
        { key: 0, label: 'Healthcare', active: true, id: 'healthcare' },
        { key: 1, label: 'Agri Market', active: false, id: 'agri_markets' },
        { key: 2, label: 'Education', active: false, id: 'education' },
        { key: 3, label: 'Financial Solutions', active: false, id: 'financial_solutions' },
    ];

    const [selected, setSelected] = useState(tabItems[0].key);

    const handleTabClick = (item: number) => {
        setSelected(item);
    }

    return (
        <div className='h-100'>
            <Card size={CardSize.default} variant={CardVariant.bordered} classname='p-3 h-100'>
                <NavTab navItems={tabItems} selected={selected} handleTabClick={handleTabClick} />
                <BarGraph selected={tabItems[selected].label} />
            </Card>
        </div>
    )
}

export default BarGraphContainer;