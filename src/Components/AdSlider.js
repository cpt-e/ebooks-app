import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function AdSlider() {

    let slideNum = 0;
    let slides = document.getElementsByClassName("slides");

    function slideCount(n) {
        slideshow(slideNum += n);
    }

    function slideshow() {
        if (slideNum > (slides.length - 1)) {
            slideNum = 0;
        } else if (slideNum < 0) {
            slideNum = slides.length - 1;
        }
        
        for (let i = 0; i < slides.length; i++) {
            if (i != slideNum) {
                slides[i].style.display = "none";
            }
        }

        slides[slideNum].style.display = "flex";
    }

    useEffect(() => {
        for (let i = 0; i < slides.length; i++) {
            if (i != slideNum) {
                slides[i].style.display = "none";
            }
        }
    });

    return (
        <section className="slider">
            <div className="slides">
                <span>
                    <h2>
                        Мне всегда казалось, что Рай – своего рода библиотека.
                    </h2>
                    — Хорхе Луис Борхес
                </span>
                <hr style={{ flexGrow: 1 }}/>
            </div>
            <div className="slides">
                <span>
                    Когда вы читаете, не пытайтесь угадывать, что думает автор. Думайте сами.
                </span>
                <hr style={{ flexGrow: 1 }}/>
            </div>

            <a className="slides-nav back" onClick={() => slideCount(-1)}>
                <FontAwesomeIcon icon={faChevronLeft}/>
            </a>
            <a className="slides-nav forward" onClick={() => slideCount(+1)}>
                <FontAwesomeIcon icon={faChevronRight}/>
            </a>
        </section>
    );
}

export default AdSlider;