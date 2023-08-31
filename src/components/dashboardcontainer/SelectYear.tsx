import { useState } from 'react';

const SelectYear = () => {
    const options = [];
    const currentYear = new Date().getFullYear();

    for (let year = currentYear - 10; year <= currentYear; year++) {
        options.push({ key: year, value: year.toString() });
    }

    const [selectedYear, setSelctedYear] = useState(currentYear);

    const handleChangeYear = (event) => {
        const value = event.target.value;
        setSelctedYear(value);
    }

    return (
        <div>
            <select className='select-year px-2 py-1 fs-12' value={selectedYear} onChange={handleChangeYear}>
                {options.map((option) => <option key={option.key} value={option.value}>{option.value}</option>)}
            </select>
        </div>
    )
}

export default SelectYear;