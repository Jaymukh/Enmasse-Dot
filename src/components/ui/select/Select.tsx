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
    datatestid: string;
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

const getTextColor = (value: any) => {
    return value ? `${styles.select_text_selcted}` : `${styles.select_text_not_selected}` ;
}

const Select = ({ options, onChange, value, labelKey, valueKey, disabled, classname, size, name, placeholder,datatestid }: SelectProps<any>) => {
    return (
        <select
            className={`${getSizeClass(size)} ${classname} w-100 px-2 ${styles.select} ${getTextColor(value)}`}
            value={value}
            onChange={onChange}
            disabled={disabled}
            name={name}
            placeholder={placeholder}
            data-testid={datatestid}
        >
            {placeholder && <option value="" selected disabled>Select</option>}
            {options?.map((option: any, key: number) => (
                <option key={key} value={option[valueKey] as any} className={`${styles.select_text_selcted}`}>
                    {option[labelKey]} {labelKey === 'currency' ? `(${option[valueKey]})` : ''}
                </option>
            ))}
        </select>
    );
}

export default Select;