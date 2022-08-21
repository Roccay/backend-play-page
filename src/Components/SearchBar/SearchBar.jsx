import { TextField } from "@mui/material";
import React from "react";
import "./SearchBar.css";

const SearchBar = (props) => (
  <div className="SearchBar">
    <label htmlFor="header-search">
      <span className="visually-hidden"></span>
    </label>
    <input
      className="search-input"
      value={props.searchQuery}
      onInput={(e) => props.setSearchQuery(e.target.value)}
      type="text"
      id="header-search"
      placeholder="请输入游戏关键字"
      name="s"
      autoComplete="off"
    />
    <button className="SearchButton">搜索</button>
  </div>
);

export default SearchBar;
