import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Ads from './Components/Ads';
import Book from './Components/Book';
import BookPreview from "./Components/BookPreview";
import useLocalStorage from 'use-local-storage';

function Home() {
    const randomWord = require('random-words');
    const [bookPreview, setBookPreview] = useState(false);

    function showBookPreview(){
        setBookPreview(false);
    }

    const [currentID, setCurrentID] = useLocalStorage('bookID', '');

    useEffect(() => {
        document.querySelector('main').classList.add('home-grid');
    });

    const[books, setBooks] = useState([]);

    useEffect(() => {
        const api = `https://www.googleapis.com/books/v1/volumes?q=${randomWord()}&filter=free-ebooks&filter=full&maxResults=5&key=AIzaSyAmMbnjM_ck_s0jKTL3S54oNURSvWjlZJU`;
        
        fetch(api, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json' 
            }
        })

        .then(response => response.json())
        .then(response => {
            setBooks(response.items);
        })

        .catch((e) => {
            console.log('Ошибка: ', e)
        })
    }, []);

    const listBooks = books.map(book => {
            try {
                return (
                <a onClick={() => {setCurrentID(book.id); setBookPreview(true)}}>
                    <Book 
                    title={book.volumeInfo.title} 
                    author={book.volumeInfo.authors[0]} 
                    cover={book.volumeInfo.imageLinks.thumbnail}
                    id={book.id}/>
                </a>);
            } catch(e) {
                window.location.reload();
            }
        }
    );

    const currentBook = function () {
        for (let i = 0; i < books.length; i++) {
            if (books[i].id === currentID) {
                return (
                    <div className="book-preview">
                        <header className="preview-header">
                            <button 
                            onClick={showBookPreview}
                            className="close-preview">
                                <FontAwesomeIcon icon={faXmark} size="lg"/>
                            </button>
                        </header>
                        <BookPreview
                            previewCover={books[i].volumeInfo.imageLinks.thumbnail}
                            previewTitle={books[i].volumeInfo.title}
                            previewAuthors={books[i].volumeInfo.authors[0]}
                            googleLink={books[i].volumeInfo.previewLink}
                            previewDesc={books[i].volumeInfo.description}
                            previewID={books[i].id}
                        />
                    </div>
                );}
        }}
    return (
    <>
        {bookPreview === true ? currentBook() : null}
        <Ads/>
        <h1 id="suggested-title">Начните Читать</h1>
        <section className="catalog">
            { listBooks }
        </section>
    </>
    );
}

export default Home;