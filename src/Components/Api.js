import { useState, useEffect } from "react";

export const api = function Api() {
    const[books, setBooks] = useState(false);

    useEffect(() => {
        const api = 'https://www.googleapis.com/books/v1/volumes?q=programming&filter=free-ebooks&filter=full&key=AIzaSyAmMbnjM_ck_s0jKTL3S54oNURSvWjlZJU';
        
        fetch(api, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json' 
            }
        })

        .then(response => response.json())
        .then(response => {
            setBooks(response.items[0].volumeInfo);
            console.log(response.items[0].volumeInfo);
        })

        .catch((e) => {
            console.log('Ошибка: ', e)
        })
    }, []);
}