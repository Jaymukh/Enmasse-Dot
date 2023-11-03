import './NavTab.css';

interface NavTabProps {
    navItems: any[];
    selected: number;
    handleTabClick: (item: number) => void;
}

const NavTab: React.FC<NavTabProps> = ({ navItems, selected, handleTabClick }) => {
    return (
        <ul className="nav nav-tabs" id="myTabs" role="tablist">
            {navItems.map((item: any, index: number) => (
                <li className="nav-item" role="presentation" style={{ cursor: 'pointer' }} onClick={() => handleTabClick(index)}>
                    <h6 className={`nav-link ${selected === index ? 'active' : ''}`}>{item.label}</h6>
                </li>
            ))}
        </ul>
    )
}

export default NavTab;