import React from 'react';
import styles from "./Select.module.css";

export enum SelectSize {
    small,
    large,
}

interface SelectProps<T> {
    options: T[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
    labelKey: keyof T;
    valueKey: keyof T; 
    size: SelectSize;
    disabled?: boolean;
    classname?: string;
}

const getSizeClass = (size: SelectSize) => {
    let classname = size === SelectSize.small ? `${styles.select_small}` : `${styles.select_large}`;
    return classname;
}

const Select = ({ options, onChange, value, labelKey, valueKey, disabled, classname, size }: SelectProps<any>) => {
    return (
        <select
            className={`${getSizeClass(size)} ${classname} w-100`}
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