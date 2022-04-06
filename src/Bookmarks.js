import { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';

function Bookmarks() {
    useEffect(() => {
      document.querySelector('main').classList.add('catalog-grid');
    });
    
    const thisUser = localStorage.getItem('uid').replace(/["]+/g, '');
    const bookmarksRef = collection(db, "bookmarks");

    const [bookmarks, setBookmarks] = useState([]);
    useEffect(() => {
      const getBookmarks = async () => {
        const data = await getDocs(bookmarksRef);
        setBookmarks(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      };
      getBookmarks();
    }, []);

    const [shelf, setShelf] = useState([]);
    
    useEffect(() => {
      for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].user_id === thisUser) {
          setShelf(bookmarks[i].books)
        }
      }
    });

    console.log(shelf)
    const listBooks = shelf.map(book => {
      try {
          return (
          <a href={`https://books.google.lv/books?id=${book}`} target="_blank" style={{ height: 'fit-content'}}>
            {book}
          </a>
          );
      } catch(e) {
          window.location.reload();
      }
  }
);
    return (
      <>
        <section className="catalog">
          {listBooks}
        </section>
      </>
    );
}

export default Bookmarks;