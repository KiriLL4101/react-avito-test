import React from "react";
import axios from 'axios';

import "./modalcomment.scss";
import closeSvg from "../assets/close.svg";

export default function ModalCommets({ isOpen, onClickClose , idImg }) {
    const [ imgComment , setImgComment ] = React.useState(null)
    React.useEffect( () => {
        axios.get("https://boiling-refuge-66454.herokuapp.com/images/" + idImg).then( ({ data }) => {
            setImgComment(data)
        })
    }, [idImg])
  return (
    <div className={`modal ${isOpen ? "show" : "hide"}`}>
      <div className="wrapper">
        <div className="modal__content">
            {
                imgComment && (<img src={imgComment.url} alt="Изображение" />)
            }
            <input type="text" className="name" placeholder="Ваше имя" />
            <input type="text" className="comment" placeholder="Ваш комментарий" />
            <button className="modal__btn" onClick={onClickClose}><span>Оставить комментарий</span></button>
        </div>
        <div className="modal__comments">
          <img
            src={closeSvg}
            alt="close"
            className="close"
            onClick={onClickClose}
          />
          {/* <ul>
            {
                !imgComment ?  
                        'Нету комментарий'
                        :imgComment.comment.map( comment => (
                            <li key={comment.id}>
                                <span>{new Date(comment.date)}</span>
                                {comment.text}
                            </li>
                        ))
            }
          </ul> */}
        </div>
      </div>
    </div>
  );
}
