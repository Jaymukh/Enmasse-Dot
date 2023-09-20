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

export enum ButtonTheme {
    primary,
    secondary,
    warning
}

interface ButtonProps {
    onClick?: (event: any) => void;
    variant?: ButtonVariant,
    size?: ButtonSize,
    theme?: ButtonTheme,
    className?: string,
    disabled?: boolean,
    children?: React.ReactNode,
    type?: "button" | "submit" | "reset";
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

const getTypeVariantClass = (theme: ButtonTheme, variant: ButtonVariant) => {
    let className = "";
    switch (theme) {
        case ButtonTheme.primary:
            className = variant === ButtonVariant.transparent ? `${styles.btn_primary_transparent}` : `${styles.btn_primary}`;
            break;
        case ButtonTheme.secondary:
            className = variant === ButtonVariant.transparent ? `${styles.btn_secondary_transparent}` : `${styles.btn_secondary}`;
            break;
        case ButtonTheme.warning:
            className = variant === ButtonVariant.transparent ? `${styles.btn_warning_transparent}` : `${styles.btn_warning}`;
            break;
    }
    return className;

}

export const Button = ({
    onClick,
    variant = ButtonVariant.contained,
    theme= ButtonTheme.primary,
    size= ButtonSize.default,
    disabled,
    children,
    type
}: ButtonProps) => {
    return (
        <button
            className={`btn ${getTypeVariantClass(theme, variant)} ${getSizeClass(size)}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    );
}
