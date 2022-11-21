import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

function searchFunc(query, navigate, event) {
  event.preventDefault();
  // if (!query) return;
  navigate(`/search?query=${query}`);
}

export default function Categories(props) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const categories = [
    {
      categoryID: "fashion",
      categoryName: "Fashion",
      src: "https://cdn-icons-png.flaticon.com/512/1051/1051060.png",
    },
    {
      categoryID: "motors",
      categoryName: "Motors",
      src: "https://cdn-icons-png.flaticon.com/512/31/31826.png",
    },
    {
      categoryID: "electronics",
      categoryName: "Electronics",
      src: "https://bigindiamarket.com/public/uploads/all/AUQiL4vmptIjLAtPgcyz73iobpRqEMUrXOg3jWMl.png",
    },
    {
      categoryID: "office-supplies",
      categoryName: "Office",
      src: "https://cdn-icons-png.flaticon.com/512/2891/2891379.png",
    },
    {
      categoryID: "home-garden",
      categoryName: "Home and Garden",
      src: "https://cdn-icons-png.flaticon.com/512/3208/3208100.png",
    },
    {
      categoryID: "health-beauty",
      categoryName: "Health and Beauty",
      src: "https://cdn-icons-png.flaticon.com/512/1751/1751351.png",
    },

    {
      categoryID: "sports-hobbies-leisures",
      categoryName: "Sports and Hobbies",
      src: "https://cdn-icons-png.flaticon.com/512/174/174799.png",
    },

    {
      categoryID: "collectables-art",
      categoryName: "Collectables and Art",
      src: "https://cdn-icons-png.flaticon.com/512/5984/5984849.png",
    },
  ];

  return (
    <div className="categories-div container">
      <h2 className="categories-headline">Browse by Category</h2> <br />
      <div className="row d-flex">
        {categories.map((category, index) => (
          <div key={index} className="col-md-3 col-6 category mb-3" value={category.categoryID} onChange={(e) => {
          
              setSearch(e.target.value)
            } } onClick={(e) => searchFunc(category.categoryID, navigate, e)}>
            <div className="category-card d-block text-center">
              <h3 className="category-name align-middle">
                {category.categoryName}
              </h3>{" "}
              <img
                className="category-icon mt-3"
                src={`${category.src}`}
                alt=""
              />
            </div>
          </div>
        ))}
      </div>
      {props.category}
    </div>
  );
}
