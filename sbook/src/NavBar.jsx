import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import {User} from './Sbook.jsx';

const caret = <FontAwesomeIcon icon={faCaretDown} />;
class NavBar {
    static open() {
        let bar = jQuery("#navbar");
        bar[0].setAttribute('particles', 'navbar');
        bar.css('width', '200px');
        jQuery("#navbar-header-btn").addClass("close");
        NavBar.is_open = true;
        if(!NavBar.was_open) setTimeout(Particler.apply, 600);
        NavBar.was_open = true;
    }
    static close() {
        let bar = jQuery("#navbar");
        bar.css('width', '0');
        jQuery("#navbar-header-btn").removeClass("close");
        NavBar.is_open = false;
    }
    static toggle() {
        if(NavBar.is_open) NavBar.close();
        else NavBar.open();
    }
    render() {
        const user = window.user;
        NavBar.close();
        NavBar.was_open = false;

        return (
            <nav
                className="w3-rightbar w3-border-grey w3-sidebar w3-bar-block w3-collapse w3-card"
                role="navigation"
                id="navbar"
            >
                <Link to="/school" title="index" class="w3-bar-item w3-button">index</Link>
                <div class="w3-dropdown-hover">
                    <Link class="w3-button">classrooms {caret}</Link>
                    <div class="w3-collapse w3-dropdown-content w3-card w3-bar-block">
                        {user.schools.map(
                            (school) => <Link class="w3-button w3-bar-item" to={classroom.url}>
                                <img src={classroom.profile} class="text-fit" />{classroom.name}
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        );
    }
}


export default NavBar;
