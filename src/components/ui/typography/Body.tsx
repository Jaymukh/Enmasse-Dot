import styles from "./Typography.module.css";

export enum BodyType {
    p1, /* 1rem */
    p2, /* 0.875rem */
    p3, /* 0.75rem */
    p4, /* 0.625rem */
}

export enum BodyColor {
    primary,   /* rgba(16, 128, 65, 1) - green */
    secondary, /* rgba(73, 73, 73, 1) - dark grey */
    dark,      /* rgba(0, 0, 0, 1) - black */
    muted      /* rgba(0, 0, 0, 0.6) - light black */
}

interface BodyProps {
    type: BodyType;
    color: BodyColor;
    children: React.ReactNode;
}

const getColor = (color: BodyColor) => {
    let className = "";
    switch (color) {
        case BodyColor.primary:
            className = `${styles.primary}`;
            break;
        case BodyColor.secondary:
            className = `${styles.secondary}`;
            break;
        case BodyColor.dark:
            className = `${styles.dark}`;
            break;
        case BodyColor.muted:
            className = `${styles.muted}`;
            break;
    }
    return className;
}

const getType = (type: BodyType) => {
    let className = "";
    switch (type) {
        case BodyType.p1:
            className = `${styles.p1}`;
            break;
        case BodyType.p2:
            className = `${styles.p2}`;
            break;
        case BodyType.p3:
            className = `${styles.p3}`;
            break;
        case BodyType.p4:
            className = `${styles.p4}`;
            break;
    }
    return className;
}

const Body = ({ type, color, children }: BodyProps) => {
    return (
        <div>
            <p className={`${getColor(color)} ${getType(type)} m-0 p-0`}>{children}</p>
        </div>
    )
}

export default Body;