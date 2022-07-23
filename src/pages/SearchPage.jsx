import React from "react";
import { useStateValue } from "../StateProvider";
import useGoogleSearch from "../useGoogleSearch";
import "./SearchPage.css";
import Response from "../Response";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import SearchIcon from "@mui/icons-material/Search";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import RoomIcon from "@mui/icons-material/Room";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const SearchPage = () => {
  const [{ term }, dispatch] = useStateValue();
  const { data } = useGoogleSearch(term);

  //   const data = Response;

  console.log(data);
  return (
    <div className="searchPage">
      <div className="searchPage__header">
        <Link to="/">
          <img
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            alt=""
            className="searchPage__logo"
          />
        </Link>
        <div className="searchPage__headerBody">
          <Search hideButtons placeholder={term} />
          <div className="searchPage__options">
            <div className="searchPage__optionsLeft">
              <div className="searchPage__option">
                <SearchIcon />
                <Link to="/all">All</Link>
              </div>
              <div className="searchPage__option">
                <DescriptionIcon />
                <Link to="/all">News</Link>
              </div>
              <div className="searchPage__option">
                <ImageIcon />
                <Link to="/all">Images</Link>
              </div>
              <div className="searchPage__option">
                <LocalOfferIcon />
                <Link to="/all">Shopping</Link>
              </div>
              <div className="searchPage__option">
                <RoomIcon />
                <Link to="/all">Maps</Link>
              </div>
              <div className="searchPage__option">
                <MoreVertIcon />
                <Link to="/all">More</Link>
              </div>
            </div>
            <div className="searchPage__optionsRight">
              <div className="searchPage__option">
                <Link to="/settings">Settings</Link>
              </div>
              <div className="searchPage__option">
                <Link to="/toold">Tools</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {term && (
        <div className="searchPage__results">
          <p className="searchPage__resultCount">
            About {data?.searchInformation.formattedTotalResults} results (
            {data?.searchInformation.formattedSearchTime}) for {term}
          </p>
          {data?.items.map((item) => (
            <div className="searchPage__result">
              <a className="searchPage__resultLink">
                {item.pagemap?.cse_image?.length > 0 &&
                  item.pagemap?.cse_image[0]?.src && (
                    <img
                      src={
                        item.pagemap?.cse_image?.length > 0 &&
                        item.pagemap?.cse_image[0]?.src
                      }
                      alt=""
                      className="searchPage__resultImage"
                    />
                  )}
                {item.displayLink}
              </a>
              <a href={item.link} className="searchPage__resultTitle">
                <h2>{item.title}</h2>
              </a>
              <p className="searchPage__resultSnippet">{item.snippet}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
