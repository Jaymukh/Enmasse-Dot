import styles from "./Button.module.css";

interface ButtonAvatarProps {
    onClick?: (event: any) => void;
    image?: string;
    initial?: string;
    bgColor?: any;
    classname?: string;
}

export const ButtonAvatar = ({ image, initial, onClick,  bgColor, classname }: ButtonAvatarProps) => {
    return (
        <button className={`btn rounded-circle border-0 ${styles.btn_avatar} ${classname}`} style={{backgroundColor: bgColor}} onClick={onClick}>
            {image ? (
                <img src={image} alt="Avatar" className="img-fluid rounded-circle" />
            ) : (
                <>{initial}</>
            )}
        </button>
    )
}
