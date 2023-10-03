import styles from "./Typography.module.css";

export enum TypographyColor {
    primary,
    secondary,
    muted,
    warning,
    dark
}

export enum TypographyType {
    h1, /* 1.875rem */
    h2, /* 1.5rem */
    h3, /* 1rem */
    h4, /* 0.875rem */
    h5, /* 0.75rem */
}

interface HeadingOne {
    title: string;
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
    }
    return className;
}

export const Heading = ({type, colour, title, classname }: HeadingOne) => {
    return (
        <h1 className={`${getType(type)} ${getColor(colour)} ${classname} m-0`}>{title}</h1>
    )
}