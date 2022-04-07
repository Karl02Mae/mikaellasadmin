
import './Header.css';
import topAvatar from '../img/person-icon-svg-2.jpg';
import { NotificationsNone } from "@material-ui/icons";

export default function Header () {
    return(
        <div className="header"> 
        <div className="headerWrapper">
            <div className="topLeft">
            
            </div>
            <img src={topAvatar} alt="person-icon-svg-2" className="topAvatar" />
            
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