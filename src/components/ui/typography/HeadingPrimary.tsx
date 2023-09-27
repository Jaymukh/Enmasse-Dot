import styles from "./Button.module.css";

export enum TypographyColor {
    primary,
    secondary,
    muted,
    warning,
    dark
}

export enum TypographyType {
    h1,
    h2
}

interface HeadingOne {
    title: string;
    type: TypographyType;
    colour: TypographyColor
}

const getColor = (color: TypographyColor) => {
    let className = "";
    switch (color) {
        case TypographyColor.primary:
            className = `${styles.primary}`;
            break;
        case TypographyColor.secondary:
            className = `${styles.secondary}`;
            break;
        case TypographyColor.warning:
            className = `${styles.warning}`;
            break;
        case TypographyColor.dark:
            className = `${styles.dark}`;
            break;
    }
    return className;
}

const getType = (type: TypographyType) => {
    let classname =  type === TypographyType.h1 ? `${styles.h1}` : `${styles.h2}`;
    return classname;
}

export const HeadingPrimary = ({ title, type, colour }: HeadingOne) => {
    return (
        <h1 className={`${getType(type)} ${getColor(colour)}}`}>{title}</h1>
    )
}