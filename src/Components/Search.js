import useLocalStorage from "use-local-storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

function Search() {
    const [search, setSearch] = useLocalStorage('search', 0);

    const switchSearch = () => {
      const newSearch = search === 0 ? '100%' : 0;
      setSearch(newSearch)
    };

    let style = { width: search };

    function clearField() {
        document.querySelector('.search-field').value = '';
    }

    let navigate = useNavigate(); 

    const handleSubmit = (event) => {
        event.preventDefault();
        let path = `/search/${event.target[0].value}`; 
        navigate(path);
        window.location.reload();
    }

    return (
        <section className="searchbar">
            <FontAwesomeIcon 
            icon={faMagnifyingGlass} 
            size="lg"
            className="search-label"
            onClick={switchSearch}/>
            <div className="search-wrapper" style={style}>
                <form onSubmit={handleSubmit} className="search">
                    <input type="text" className="search-field" name="q" placeholder="Искать..."/>
                    <a className="btn clear-field" onClick={clearField}>
                        <FontAwesomeIcon icon={faXmark} size="lg"/>
                    </a>
                </form>
            </div>
        </section>
    );
  }
  
  export default Search;