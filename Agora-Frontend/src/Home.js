import React from "react";
import Search from "./components/Search";
import Slider from "./components/Slider";
import Categories from "./components/Categories";

export default function Home(props) {
  const slideData = [
    {
      index: 0,
      headline: "New Fashion Apparel",
      button: "Shop now",
      src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/fashion.jpg",
    },
    {
      index: 1,
      headline: "In The Wilderness",
      button: "Book travel",
      src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/forest.jpg",
    },
    {
      index: 2,
      headline: "For Your Current Mood",
      button: "Listen",
      src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/guitar.jpg",
    },
    {
      index: 3,
      headline: "Focus On The Writing",
      button: "Get Focused",
      src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/typewriter.jpg",
    },
  ];

  return (
    <div>
      <div className="hero">
        <div>
          <div className="buy-sell-background">
            <div>
              <h1 className="buy-sell-title">Buy and Sell Anything</h1>{" "}
              <br></br>
              <h2 className="buy-sell-subtitle">Whatever it is. Use Agora.</h2>
            </div>
          </div>
          <Search search={props.search}></Search>
        </div>
      </div>
      <Slider heading="Example Slider" slides={props.product} />
      <Categories></Categories>
    </div>
  );
}
