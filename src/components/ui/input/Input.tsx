import React from 'react';
import styles from "./Input.module.css";

interface InputProps {
    type?: string;
    placeholder: string;
    value?: any;
    name?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    classname?: string;
    disabled?: boolean;
}

export const Input = ({ type, placeholder, value, name, onChange, classname, disabled }: InputProps) => {
    return(
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={onChange}
            disabled={disabled}
            className={`${styles.input} ${classname} w-100`}
        >

        </input>
    )
}