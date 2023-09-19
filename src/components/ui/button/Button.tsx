import React from 'react';
import styles from "./Button.module.css";

export enum ButtonVariant {
    contained,
    transparent,
}

export enum ButtonSize {
    small,
    medium,
    large,
    default,
}

export enum ButtonType {
    primary,
    secondary,
    warning
}

interface ButtonProps {
    onClick?: (event: any) => void;
    variant?: ButtonVariant,
    size?: ButtonSize,
    type?: ButtonType,
    className?: string,
    disabled?: boolean,
    children?: React.ReactNode,
}

const getSizeClass = (size: ButtonSize) => {
    let className = "";
    switch (size) {
        case ButtonSize.small:
            className = `${styles.btn_small}`;
            break;
        case ButtonSize.medium:
            className = `${styles.btn_medium}`;
            break;
        case ButtonSize.large:
            className = `${styles.btn_large}`;
            break;
        case ButtonSize.default:
            className = `${styles.btn_default}`;
            break;
    }
    return className;
}

const getTypeVariantClass = (type: ButtonType, variant: ButtonVariant) => {
    let className = "";
    switch (type) {
        case ButtonType.primary:
            className = variant === ButtonVariant.transparent ? `${styles.btn_primary_transparent}` : `${styles.btn_primary}`;
            break;
        case ButtonType.secondary:
            className = variant === ButtonVariant.transparent ? `${styles.btn_secondary_transparent}` : `${styles.btn_secondary}`;
            break;
        case ButtonType.warning:
            className = variant === ButtonVariant.transparent ? `${styles.btn_warning_transparent}` : `${styles.btn_warning}`;
            break;
    }
    return className;

}

export const Button = ({
    onClick,
    variant = ButtonVariant.contained,
    type= ButtonType.primary,
    size= ButtonSize.default,
    disabled,
    children
}: ButtonProps) => {
    return (
        <button
            className={`btn ${getTypeVariantClass(type, variant)} ${getSizeClass(size)}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
