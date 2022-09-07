import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function BookmarkCreatePage(props) {
  const [form, setForm] = useState({
    Creator: props.user._id,
    Title: "",
    AuthorName: "",
    Link: "",
    Tags: "",
    Language: "",
    Type: "",
  });
  const [option, setOption] = useState("others");
  const formRef = React.createRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const createBookmark = async () => {
    if (!formRef.current.checkValidity()) return;
    try {
      const response = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      setForm({
        Creator: props.user._id,
        Title: "",
        AuthorName: "",
        Link: "",
        Tags: "",
        Language: "",
        Type: "",
      });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="BookmarkCreatePage">
      <h1>為庫中添加新的資源</h1>
      <form autoComplete="off" ref={formRef} className="create-post-form">
        <br />
        標題 <br />
        <input
          id="outlined-basic"
          label="標題"
          variant="outlined"
          name="Title"
          value={form.Title || ""}
          onChange={handleChange}
          required
        />
        <br />
        作者 <br />
        <input
          id="outlined-basic"
          label="作者"
          variant="outlined"
          name="AuthorName"
          value={form.AuthorName}
          onChange={handleChange}
          required
        />
        <br />
        分類
        <br />
        <select
          option={option}
          name="Type"
          value={form.Type}
          onChange={handleChange}
          required
        >
          <option label="---"></option>
          <option label="設計類" name="Type">
            design
          </option>
          <option label="教程類" name="Type">
            tutorial
          </option>
          <option label="參考類" name="Type">
            reference
          </option>
          <option label="其他類" name="Type">
            others
          </option>
        </select>
        <br />
        鏈接 <br />
        <input
          id="outlined-basic"
          label="鏈接"
          variant="outlined"
          name="Link"
          value={form.Link}
          onChange={handleChange}
          required
        />
        <br />
        標籤
        <br />
        <span>（請用空格分開）</span> <br />
        <input
          id="outlined-basic"
          label="標籤"
          variant="outlined"
          name="Tags"
          value={form.Tags}
          onChange={handleChange}
          required
        />
        <br />
        文檔語言
        <br />
        <input
          id="outlined-basic"
          label="文檔語言"
          variant="outlined"
          name="Language"
          value={form.Language}
          onChange={handleChange}
          required
        />
        <br /> <br />
        <Link to="/library">
          <Button
            className="post-create-button"
            variant="contained"
            onClick={createBookmark}
          >
            創建
          </Button>
          <br />
          <div className="post-back-button">
            {" "}
            <Button variant="contained">返回</Button>
          </div>
        </Link>
      </form>
    </div>
  );
}

export default BookmarkCreatePage;
