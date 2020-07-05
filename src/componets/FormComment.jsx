import React from "react";

export default function FormComment({ onSubmit }) {
  const [comment, setComment] = React.useState("");

  const handleChange = (e) => {
    setComment({
      id: Math.floor(Math.random() * 100),
      text: e.target.value,
      date: new Date(),
    });
  };
  const handleSubmit = (e) => {
    if (e.target.value) {
      onSubmit(comment);
    }
    e.preventDefault();
  };
  return (
    <form className="form-comment" onSubmit={handleSubmit} action="#">
      <input type="text" placeholder="Ваше имя" />
      <input
        type="text"
        placeholder="Ваш комментарий"
        onChange={handleChange}
      />
      <button className="modal__btn">
        <span>Оставить комментарий</span>
      </button>
    </form>
  );
}
