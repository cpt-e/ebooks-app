import Clamp from "react-multiline-clamp";

function Book(props) {
    return (
      <div className="book">
        <img className="book-cover" src={props.cover}/>
        <h3 className="book-title">
          <Clamp>
            {props.title}
          </Clamp>
        </h3>
        <sub className="book-author">
          <Clamp>
            {props.author}
          </Clamp>
        </sub>
      </div>
    );
  }
  
export default Book;