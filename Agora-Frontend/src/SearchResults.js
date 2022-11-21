import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Search from "./components/Search";

export default function SearchResults() {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const { slug } = useParams();

  const searchProduct = async () => {
    try {
      const { data } = await axios.get(`/search/?q=${query}`);
      setSearchResults(data.products);
    } catch (error) {
      setSearchResults([]);
      setError(error.message);
    }
  };

  useEffect(() => {
    searchProduct();
  }, [query]);

  return (
    <div className="container">
      <br />
      <br />
      <br />
      <br />

      <Search></Search>
      <div className="row">
        {searchResults.length ? (
          searchResults.map((searchResult) => (
            <div className="col-lg-4 col-sm-12 ">
              <Link to={`/product/${searchResult._id}`}>
                <div
                  className={
                    "card " + (searchResult.isSold === false ? "" : "disabled")
                  }
                >
                  <img
                    className={
                      "card-img-top " +
                      (searchResult.isSold === false ? "" : "disabled-image")
                    }
                    src={`${searchResult.cloudinary_url}`}
                    alt={searchResult.title}
                  ></img>
                  {searchResult.isSold === true ? (
                    <p className="sold-item">Too late!</p>
                  ) : (
                    ""
                  )}
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6">
                        <button className="index-price-button">
                          £{searchResult.price}
                        </button>
                      </div>
                      <div className="col-6 d-flex">
                        <p className="sold-by mt-2">Sold by:</p>&nbsp;
                        <p className="seller-name-card mt-2">
                          {searchResult.seller[0].sellerName}
                        </p>{" "}
                        <br />
                      </div>
                    </div>
                    <h3 className="card-title">{searchResult.title}</h3>
                    <p className="card-text">{searchResult.subTitle}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No results</p>
        )}
      </div>
    </div>
  );
}
