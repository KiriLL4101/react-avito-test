import React from "react";
import FormComment from './FormComment'

import "./modalcomment.scss";
import closeSvg from "../assets/close.svg";

export default function ModalCommets({ onClose, infoModal }) {
  const [ comments , setComments ] = React.useState(infoModal.comments)
  const modalRef = React.useRef(null);

  const handleOutsideClick = (e) => {
    if (!e.path.includes(modalRef.current)) {
      onClose();
    }
  };
  function onSubmit(com){
    setComments([com , ...comments])
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
          {!infoModal.url ? (
            "Загрузка..."
          ) : (
            <img src={infoModal.url} alt="Изображение" />
          )}
        <FormComment onSubmit={onSubmit}/>
        </div>
        <div className="modal__comments">
          <img src={closeSvg} alt="close" className="close" onClick={onClose} />
          <div className="comments">
            {!comments
              ? "Нет комментарий"
              : comments.map((comment, i) => (
                  <div key={i}>
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
