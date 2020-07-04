import React from "react";
import axios from 'axios';

export default function FormComment() {
    const [ comment , setComment ] = React.useState('');

    const handleChange = (e) => {
        setComment(e.target.value);
      }
    const handleSubmit = (e) => {
        //TODO
        e.preventDefault();
      }
  return (
    <form className="form-comment" onSubmit={handleSubmit}>
      <input type="text" placeholder="Ваше имя" />
      <input type="text" placeholder="Ваш комментарий" value={comment} onChange={handleChange}/>
      <button className="modal__btn">
        <span>Оставить комментарий</span>
      </button>
    </form>
  );
}
