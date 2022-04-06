import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithCredential } from 'firebase/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import useLocalStorage from "use-local-storage";

import { collection, doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase-config';

function SignIn() {
    const [UID, setUID] = useLocalStorage('uid', '');

    const [loginError, setLoginError] = useState("");
    const [regError, setRegError] = useState("");

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPass, setLoginPass] = useState("");

    const [regEmail, setRegEmail] = useState("");
    const [regPass, setRegPass] = useState("");

    const [user, setUser] = useState({});
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        if (currentUser.uid) {
            setUID(currentUser.uid);
    
            if (currentUser.metadata.creationTime === currentUser.metadata.lastSignInTime) {
                setDoc(doc(db, "bookmarks", thisUser), {
                    user_id: thisUser
                });
            }
        } else {
            setUID('');
        }
    });

    const thisUser = localStorage.getItem('uid').replace(/["]+/g, '');

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth, 
                loginEmail, 
                loginPass);
        } catch(e) {
            if (e.code == 'auth/user-not-found') {
                setLoginError('Пользователь с таким e-mail не найден.');
            } else if (e.code == 'auth/wrong-password') {
                setLoginError('Неправильный пароль.');
            }
            console.log(e.code);
        }
    };

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth, 
                regEmail, 
                regPass);
        } catch(e) {
            if (e.code == 'auth/weak-password') {
                setRegError('Слабый пароль: минимум 6 символов.');
            } else if (e.code == 'auth/email-already-in-use') {
                setRegError('Пользователь с таким e-mail уже существует.');
            }
            console.log(e.code);
        }
    };

    const logout = async () => {
        await signOut(auth);
        setUID("");
        window.location.reload();
    };

    const [regForm, setReg] = useState(false);
    function showRegForm() {
        if (regForm === false) {
            setReg(true);
        } else {
            setReg(false);
        }
    }

    return (
        <div className="signUp-popup">
            { user ? 
            <>
                <span>Пользователь: {user?.email}</span>
                <button onClick={logout}>Выход</button>
            </> :
            <>
                { regForm === true ? 
                <>
                    <h2>Регистрация</h2>
                    <input type="text" placeholder="E-mail" onChange={(event) => { setRegEmail(event.target.value) }}/>
                    <input type="password" placeholder="Пароль" onChange={(event) => { setRegPass(event.target.value) }}/>
                    {regError ? <span>{regError}</span> : null}
                    <center>Есть аккаунт? <a onClick={showRegForm}>Вход</a></center>
                    <FontAwesomeIcon icon={faAnglesRight} size="xl" onClick={register} style={{ marginLeft: 'auto', cursor: 'pointer' }}/>
                </> : 
                <>
                    <h2>Вход</h2>
                    <input type="text" placeholder="E-mail" onChange={(event) => { setLoginEmail(event.target.value) }}/>
                    <input type="password" placeholder="Пароль" onChange={(event) => { setLoginPass(event.target.value) }}/>
                    {loginError ? <span>{loginError}</span> : null}
                    <center>Нужен аккаунт? <a onClick={showRegForm}>Регистрация</a></center>
                    <FontAwesomeIcon icon={faAnglesRight} size="xl" onClick={login} style={{ marginLeft: 'auto', cursor: 'pointer' }}/>
                </> }
            </> }
        </div>
    );
}

export default SignIn;