import { useState, useEffect } from "react";
import AdSlider from "./AdSlider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';

function Ads() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 500);
  });
    return (
    <>
      { show && <AdSlider/> }
        <div className="ad-placement__2">
          <p>
            <span>
              Присоединяйтесь к сообществу более <b>5000</b> любителей книг
            </span>
            <a href="https://vk.com/" target="_blank" className="btn-alt">
              <FontAwesomeIcon icon={faAnglesRight} size="xl"/>
            </a>
          </p>
        </div>
    </>
    );
  }
  
export default Ads;