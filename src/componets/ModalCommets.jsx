import React from "react";
import axios from "axios";
import FormComment from './FormComment'

import "./modalcomment.scss";
import closeSvg from "../assets/close.svg";

export default function ModalCommets({ onClose, idImg }) {
  const [modal, setModal] = React.useState({});
  const modalRef = React.useRef(null);

  React.useEffect(() => {
    axios
      .get("https://boiling-refuge-66454.herokuapp.com/images/" + idImg)
      .then(({ data }) => {
        setModal(data);
      });
  });
  const handleOutsideClick = (e) => {
    if (!e.path.includes(modalRef.current)) {
      onClose();
    }
  };
  const addComment = (newComm) => {
    
  }
  React.useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick);
    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  function formatDate(date) {
    let d = new Date(date);
    return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
  }
  return (
    <div className={`modal`}>
      <div ref={modalRef} className={`wrapper`}>
        <div className="modal__content">
          {!modal.url ? (
            "Загрузка..."
          ) : (
            <img src={modal.url} alt="Изображение" />
          )}
          <FormComment/>
        </div>
        <div className="modal__comments">
          <img
            src={closeSvg}
            alt="close"
            className="close"
            onClick={onClose}
          />
          <div className="comments">
            {!modal.comments
              ? "Нет комментарий"
              : modal.comments.map((comment) => (
                  <div key={comment.id}>
                    <span>{formatDate(comment.date)}</span>
                    <br />
                    {comment.text}
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
