import React from 'react'
import { Link } from 'react-router-dom';

import styles from './Mypagebtn.module.css';


function Mypagebtn({ text, link, href }) {



    return (
        <div>
            {link ?
                <Link to={link}>
                    <button
                        className={styles.mypageBtn}
                    >
                        {text}
                    </button>
                </Link>
                :
                <a href={href}>
                    <button
                        className={styles.mypageBtn}
                    >
                        {text}
                    </button>
                </a>
            }
        </div>
    )
}

export default Mypagebtn;