import styles from "./Typography.module.css";

export enum TypographyColor {
    primary,
    secondary,
    muted,
    warning,
    dark
}

export enum TypographyType {
    h1, /* 1.875rem (30px) */
    h2, /* 1.5rem (24px)  */
    h3, /* 1.125rem (18rem) */
    h4, /* 1rem (16px)*/
    h5, /* 0.875rem (14px) */
    h6 /* 0.75rem (12px) */
}

interface HeadingOne {
    title: string | number;
    type: TypographyType;
    colour: TypographyColor;
    classname?: string;
}

const getColor = (color: TypographyColor) => {
    let className = "";
    switch (color) {
        case TypographyColor.primary:
            className = `${styles.primary}`;
            break;
        case TypographyColor.secondary:
            className = `${styles.white}`;
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
    let className = "";
    switch (type) {
        case TypographyType.h1:
            className = `${styles.h1}`;
            break;
        case TypographyType.h2:
            className = `${styles.h2}`;
            break;
        case TypographyType.h3:
            className = `${styles.h3}`;
            break;
        case TypographyType.h4:
            className = `${styles.h4}`;
            break;
        case TypographyType.h5:
            className = `${styles.h5}`;
            break;
        case TypographyType.h6:
            className = `${styles.h6}`;
            break;
    }
    return className;
}

export const Heading = ({ type, colour, title, classname }: HeadingOne) => {
    return (
        <h1 className={`${getType(type)} ${getColor(colour)} ${classname}`}>{title}</h1>
    )
}