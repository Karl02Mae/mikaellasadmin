import './Header.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NotificationsNone } from "@material-ui/icons";

export default function Header() {
    return (
        <div className="header">
            <div className="headerWrapper">
                <div className="topLeft">

                </div>
                <AccountCircleIcon className='topAvatar' />
                <div className='NameContainer'>
                    <h4 className='AdminTitle'>Administrator</h4>
                    <h3 className='AdminName'>Mikaella Lopez</h3>
                </div>
                <div className="topRight">
                    <div className="headerIconContainer">
                        <NotificationsNone />
                        <span className="topIconBadge">24</span>
                    </div>
                </div>
            </div>
        </div>
    );
}