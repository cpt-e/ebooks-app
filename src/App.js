import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import useLocalStorage from "use-local-storage";

import Preloader from './Components/Preloader';
import SidebarMenu from './Components/SidebarMenu';
import Search from './Components/Search';
import Clock from './Components/Clock';
import Newsletter from './Components/Newsletter';

import Home from './Home';
import Bookmarks from './Bookmarks';
import LookUp from './LookUp';

function App() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 2000);
  });

  const [UID, setUID] = useLocalStorage('uid', '');
  const[path, setPath] = useState('');
  useEffect(() => {
    let pathArray = window.location.pathname.split('/');
    if (pathArray[1] == 'search') {
      setPath(pathArray[2]);
    }
  });

    return (
      <>
      { show && <Preloader/> }
      <Router>
        <main>
          <SidebarMenu/>
          <Search/>
          <Clock/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path={`/search/${path}`} element={<LookUp/>}></Route>
        <Route path="/bookmarks" element={<Bookmarks/>}></Route>
      </Routes>
          <hr className="filler"/>
          <Newsletter/>
        </main>
      </Router>
      </>
    );
}

export default App;
