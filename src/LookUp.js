import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Book from './Components/Book';
import BookPreview from "./Components/BookPreview";
import useLocalStorage from "use-local-storage";

function LookUp() {
    useEffect(() => {
        document.querySelector('main').classList.add('catalog-grid');
    });
    const [load, setLoad] = useState(false)

    const [currentID, setCurrentID] = useLocalStorage('bookID', '');

    let path = window.location.pathname.split('/');
    path = path[2];
    const[books, setBooks] = useState([]);

    useEffect(() => {loadData()}, []);

    async function loadData() {
        setLoad(true);
        
        const api = `https://www.googleapis.com/books/v1/volumes?q=${path}&filter=free-ebooks&filter=full&maxResults=40&key=AIzaSyAmMbnjM_ck_s0jKTL3S54oNURSvWjlZJU`;
        await fetch(api, {
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

        setLoad(false);
    }

    const [bookPreview, setBookPreview] = useState(false);

    function showBookPreview(){
        setBookPreview(false);
    }

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
                        />
                    </div>
                );}
        }}

    return (
        <>
            {bookPreview === true ? currentBook() : null}
            <section className="catalog">
                { books.map(book => {
                        try {
                            return (
                                <a onClick={() => {setCurrentID(book.id); setBookPreview(true)}}>
                                    <Book 
                                    title={book.volumeInfo.title} 
                                    author={book.volumeInfo.authors[0]} 
                                    cover={book.volumeInfo.imageLinks.thumbnail}
                                    id={book.id}/>
                                </a>
                            );
                        } catch(e) {
                            <a onClick={() => {setCurrentID(book.id); setBookPreview(true)}}>
                                <Book 
                                title={book.volumeInfo.title} 
                                author={null} 
                                cover={null}
                                id={book.id}/>
                            </a>
                        }
                    })
                }
            </section>
        </>
    );
}

export default LookUp;