
interface ButtonAvatarProps {
    onClick?: (event: any) => void;
    image?: string;
    initial?: string;
}

export const ButtonAvatar = ({ image, initial, onClick }: ButtonAvatarProps) => {
    return (
        <button className="btn btn-light rounded-circle" onClick={onClick}>
            {image ? (
                <img src={image} alt="Avatar" className="img-fluid rounded-circle" />
            ) : (
                <span className="avatar-initials" >{initial}</span>
            )}
        </button>
    )
}
