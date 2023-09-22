import styles from "./Switch.module.css";

interface SwitchProps {
    isChecked: boolean;
    toggleSwitch: (event?: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
}

const Switch = ({ isChecked, toggleSwitch, name }: SwitchProps) => {

    return (
        <label className={`${styles.switch}`}>
            <input name={name} type="checkbox" checked={isChecked} onChange={(event) => toggleSwitch(event)} />
            <span className={`${styles.slider} round`}></span>
        </label>
    )
}

export default Switch;