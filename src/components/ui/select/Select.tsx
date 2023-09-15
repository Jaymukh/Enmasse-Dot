import React from 'react';

export enum SelectVariant{
    contained,
    outline,
}

export enum SelectSize {
    small,
    large,
    default,
}

interface SelectProps<T> {
    options: T[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
    labelKey: keyof T;
    valueKey: keyof T; 
    variant: SelectVariant;
    size: SelectSize;
    disabled: boolean;
    classname?: string;
}

const Select: React.FC<SelectProps<any>> = ({ options, onChange, value, labelKey, valueKey, variant, size, disabled, classname }) => {
    return (
        <select
            className={``}
            value={value}
            onChange={onChange}
            disabled={disabled}
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