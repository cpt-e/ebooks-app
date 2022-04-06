import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faRightToBracket, faUser, faHouse, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

import SignIn from "./SignIn";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase-config';

function SidebarMenu() {
    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

    const switchTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme)
    };

    document.documentElement.setAttribute('data-theme', theme);

    const [loginForm, setLoginForm] = useState(false);
    function showLoginForm() {
        if (loginForm === false) {
            setLoginForm(true);
        } else {
            setLoginForm(false);
        }
    }

    const [signedIn, setSignedIn] = useState(false);
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setSignedIn(true);
      } else {
        setSignedIn(false);
      }
    });

    return (
        <>
        { loginForm === true ? <SignIn/> : null}
        <aside>
            <div className="logo"></div>
                <nav>
                    <a href="/">
                        <FontAwesomeIcon icon={faHouse} size="xl"/>
                    </a>
                    { signedIn === true ?
                        <a href="/bookmarks">
                            <FontAwesomeIcon icon={faBookmark} size="xl"/>
                        </a>
                    : null }
                    <a onClick={showLoginForm}>
                        <FontAwesomeIcon icon={ signedIn === true ? faUser : faRightToBracket } size="xl"/>
                    </a>
                </nav>
                <a className="theme-toggle" onClick={switchTheme}>
                    <FontAwesomeIcon
                    icon={ theme === 'light' ? faMoon : faSun}
                    size="xl"/>
                </a>
        </aside>
        </>
    );
}

export default SidebarMenu;