import React from 'react';
import styles from "./Select.module.css";

export enum SelectSize {
    small,
    medium,
    large,
}

export enum SelectType {
    contained,
    transparent,
}

interface SelectProps<T> {
    options: T[];
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value: any;
    labelKey: keyof T;
    valueKey: keyof T;
    size: SelectSize;
    disabled?: boolean;
    classname?: string;
    name?: string;
    placeholder?: string;
}

const getSizeClass = (size: SelectSize) => {
    let className = "";
    switch (size) {
        case SelectSize.small:
            className = `${styles.select_small}`;
            break;
        case SelectSize.medium:
            className = `${styles.select_medium}`;
            break;
        case SelectSize.large:
            className = `${styles.select_large}`;
            break;
    }
    return className;
}

const Select = ({ options, onChange, value, labelKey, valueKey, disabled, classname, size, name, placeholder }: SelectProps<any>) => {
    return (
        <select
            className={`${getSizeClass(size)} ${classname} w-100`}
            value={value}
            onChange={onChange}
            disabled={disabled}
            name={name}
            placeholder={placeholder}
        >
            {placeholder && <option value="" selected disabled>SELECT</option>}
            {options?.map((option: any, key: number) => (
                <option key={key} value={option[valueKey] as any}>
                    {option[labelKey]}
                </option>
            ))}
        </select>
    );
}

export default Select;