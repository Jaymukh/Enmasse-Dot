import React from 'react';

interface SelectProps<T> {
    options: T[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
    labelKey: keyof T;
    valueKey: keyof T;
    classname?: string;
}

const Select: React.FC<SelectProps<any>> = ({ options, onChange, value, labelKey, valueKey, classname }) => {
    return (
        <select
            className={``}
            value={value}
            onChange={onChange}
        >
            {options.map((option: any, key: number) => (
                <option key={key} value={option[valueKey] as any}>
                    {option[labelKey]}
                </option>
            ))}
        </select>
    );
}

export default Select;