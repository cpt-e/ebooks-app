import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons';

function Newsletter() {
    const [icons, setIcon] = useState(false);
    const [style, setStyle] = useState({ display: 'none' });

    function subForm() {
        document.querySelector('.btn-solid svg').style.transform = 'rotate(360deg)';
        setTimeout(() => {
            setIcon(true);
            document.querySelector('.news .btn-solid').style.flex = '1';
            document.querySelector('.mail-input').style.display = 'none';
            setTimeout(() => {
                setStyle({ display: 'inline-block' });
            }, 250);
        }, 300);
    }

    return (
    <>
        <h4 id="news-title">Подпишитесь на нашу рассылку</h4>
        <form className="news">
            <input type="text"
            className="mail-input"
            placeholder="Ваш E-mail" />
            <a className="btn btn-solid" onClick={subForm}>
                <FontAwesomeIcon
                icon={icons === false ? faEnvelope : faEnvelopeCircleCheck}
                size="lg"
                className="subIcon" />
                <div style={style}>Следите за новостями в вашей почте</div>
            </a>
        </form>
    </>
    );
}

export default Newsletter;