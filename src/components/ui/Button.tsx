import React from 'react';
import styles from "./Button.module.css";

export enum ButtonVariant{
    contained,
    outline,
}

export enum ButtonSize {
    small,
    large,
    default,
}

export enum ButtonType {
    primary,
    secondary
}

const getSizeClass = (size: ButtonSize) => {
    let className= "";
    switch(size) {
        case ButtonSize.small:
            className = "btn-sm";
            break;
        case ButtonSize.large:
            className = "btn-lg";
            break;
    }
    return className;
}

const getTypeVariantClass = (type: ButtonType, variant: ButtonVariant) => {
    let className= "";
    switch(type) {
        case ButtonType.primary:
            className = variant === ButtonVariant.outline ? "btn-outline-primary" : `${styles.btn_primary}`;
            break;
        case ButtonType.secondary:
            className = variant === ButtonVariant.outline ? "btn-outline-secondary" : `${styles.btn_secondary}`;
            break;
    }
    return className;
    
}

const Button = () => {
    return (
        <button>

        </button>
    );
}

export default Button;