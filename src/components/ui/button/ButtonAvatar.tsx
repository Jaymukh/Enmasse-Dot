import styles from "./Button.module.css";

interface ButtonAvatarProps {
    onClick?: (event: any) => void;
    image?: string;
    initial?: string;
    bgColor?: any;
    classname?: string;
    disabled?: boolean;
    datatestid?: string;
}

export const ButtonAvatar = ({ image, initial, onClick,  bgColor, classname, disabled , datatestid}: ButtonAvatarProps) => {
    return (
        <button className={`rounded-circle border-0 p-0 ${styles.btn_avatar} ${classname}`} style={{backgroundColor: bgColor}} onClick={onClick} disabled={disabled} data-testid={datatestid}>
            {image ? (
                <img src={image} alt="Avatar"  className="img-fluid rounded-circle w-auto h-100" />
            ) : (
                <>{initial}</>
            )}
        </button>
    )
}
