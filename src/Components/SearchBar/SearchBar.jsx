import { TextField } from "@mui/material";
import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar(props) {
  return (
    <div className="SearchBar">
      <label htmlFor="header-search">
        <span className="visually-hidden"></span>
      </label>
      <form autoComplete="off" onSubmit={props.handleSubmit}>
        <input
          className="search-input"
          value={props.search.Tags}
          onChange={props.handleChange}
          placeholder="请输入关键字"
          name="Tags"
          autoComplete="off"
        />
        <button className="SearchButton" onClick={props.updateSearch}>
          搜索
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
