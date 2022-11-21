import React from "react";
import { Link } from "react-router-dom";

export default class Slide extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleSlideClick = this.handleSlideClick.bind(this);
    this.imageLoaded = this.imageLoaded.bind(this);
    this.slide = React.createRef();
  }

  handleMouseMove(event) {
    const el = this.slide.current;
    const r = el.getBoundingClientRect();

    el.style.setProperty(
      "--x",
      event.clientX - (r.left + Math.floor(r.width / 2))
    );
    el.style.setProperty(
      "--y",
      event.clientY - (r.top + Math.floor(r.height / 2))
    );
  }

  handleMouseLeave(event) {
    this.slide.current.style.setProperty("--x", 0);
    this.slide.current.style.setProperty("--y", 0);
  }

  handleSlideClick(event) {
    this.props.handleSlideClick(this.props.slide.index);
  }

  imageLoaded(event) {
    event.target.style.opacity = 1;
  }

  render() {
    const current = this.props.current;
    let classNames = "slide";

    if (current === this.props.key) classNames += " slide--current";
    else if (current - 1 === this.props.key) classNames += " slide--previous";
    else if (current + 1 === this.props.key) classNames += " slide--next";

    return (
      <li
        ref={this.slide}
        className={classNames}
        onClick={this.handleSlideClick}
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
      >
        <div key={this.key} className="slide__image-wrapper">
          <img
            className="slide__image"
            alt={this.props.title}
            src={`${this.props.slide.cloudinary_url}`}
            onLoad={this.imageLoaded}
          />
        </div>

        <article className="slide__content">
          <h2 className="slide__headline">{this.props.slide.title}</h2>
          <Link
            to={`product/${this.props.slide._id}`}
            className="slide__action slide_btn"
          >
            £{this.props.slide.price}
          </Link>
        </article>
      </li>
    );
  }
}
