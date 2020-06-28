import React from "react";
import axios from "axios";

import "./modalcomment.scss";
import closeSvg from "../assets/close.svg";

export default class ModalCommets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  }

  componentDidUpdate() {
    if (this.props.idImg !== this.state.id) {
      axios
        .get(
          "https://boiling-refuge-66454.herokuapp.com/images/" +
            this.props.idImg
        )
        .then(({ data }) => {
          this.setState(data);
          console.log(this.state);
        });
    }
  }
  componentWillUnmount(){
    this.setState({comments: []});
  }
  formatDate(date) {
    let d = new Date(date);
    return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
  }
  render() {
    return (
      <div className={`modal ${this.props.isOpen ? "show" : "hide"}`}>
        <div className="wrapper">
          <div className="modal__content">
            {!this.state.comments ? (
              "Загрузка..."
            ) : (
              <img src={this.state.url} alt="Изображение" />
            )}
            <input type="text" className="name" placeholder="Ваше имя" />
            <input
              type="text"
              className="comment"
              placeholder="Ваш комментарий"
            />
            <button className="modal__btn" onClick={this.props.onClickClose}>
              <span>Оставить комментарий</span>
            </button>
          </div>
          <div className="modal__comments">
            <img
              src={closeSvg}
              alt="close"
              className="close"
              onClick={this.props.onClickClose}
            />
            <div className="comments">
              {!this.state.comments
                ? "Нет комментарий"
                : this.state.comments.map((comment) => (
                    <div key={comment.id}>
                      <span>{this.formatDate(comment.date)}</span>
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
}
