import Clamp from "react-multiline-clamp";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, updateDoc, doc, arrayUnion, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import useLocalStorage from "use-local-storage";

function BookPreview(props) {
    const bookmarksRef = collection(db, "bookmarks");
    const [signedIn, setSignedIn] = useState(false);
    
    const thisUser = localStorage.getItem('uid').replace(/["]+/g, '');
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setSignedIn(true);
      } else {
        setSignedIn(false);
      }
    });

    let newBookmark = localStorage.getItem('bookID').replace(/["]+/g, '');

    const save = async () => {
        await updateDoc(doc(db, "bookmarks", thisUser), {
            books: arrayUnion(newBookmark),
            user_id: thisUser
        });
    };

    return (
        <article>
            <img src={props.previewCover} className="preview-cover"/>
            <hgroup className="preview-info">
                <h2>
                    <Clamp>
                        {props.previewTitle}
                    </Clamp>
                </h2>
                <sub>
                    <Clamp>
                        {props.previewAuthors}
                    </Clamp>
                </sub>
                <span>
                    { signedIn === true ? <a className="book-save" onClick={save}>+ Добавить в Закладки</a> : null }
                    <a href={props.googleLink} className="book-link" target="_blank">Читать на Google Books</a>
                </span>
            </hgroup>
            <span className="preview-desc">
                    <h2>Описание</h2>
                    <span className="scroll">
                {props.previewDesc ? props.previewDesc : 'Нет описания.'}
                    </span>
            </span>
        </article>
    );
  }
  
export default BookPreview;