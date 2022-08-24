import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useParams } from "react-router-dom";
import "../PostCreatePage/PostCreatePage.css";

function PostUpdatePage(props) {
  const params = useParams();
  const [form, setForm] = useState([]);
  useEffect(() => {
    getPostDetails();
  }, []);
  const getPostDetails = async () => {
    console.log(props.user._id);
    let result = await fetch(`/api/posts`);
    result = await result.json();
    let post = result.response.find((element) => element._id === params.id);
    console.log(post.Address);
    setForm({
      author: props.user._id,
      GameName: post.GameName,
      AuthorName: post.AuthorName,
      tags: post.Tags,
      fee: post.Fee,
      description: post.Description,
      img: post.img,
    });
  };

  const formRef = React.createRef();

  const handleChange = (e) => {
    console.log("---------------", e.target.checkValidity());
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updatePost = async () => {
    if (!formRef.current.checkValidity()) return;
    try {
      const response = await fetch(`/api/posts/update/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      setForm({
        author: props.user._id,
        GameName: "",
        AuthorName: "",
        tags: [],
        fee: "",
        description: "",
        img: "",
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="PostCreatePage">
      <h1>為庫中添加新的遊戲</h1>
      <form autoComplete="off" ref={formRef} className="create-post-form">
        <br />
        遊戲名稱 <br />
        <input
          id="outlined-basic"
          label="GameName"
          variant="outlined"
          name="GameName"
          value={form.GameName || ""}
          onChange={handleChange}
          required
        />
        <br />
        作者 <br />
        <input
          id="outlined-basic"
          label="AuthorName"
          variant="outlined"
          name="AuthorName"
          value={form.AuthorName}
          onChange={handleChange}
          required
        />
        <br />
        標籤 <br />
        <span>（請用空格分開）</span> <br />
        <input
          id="outlined-basic"
          label="tags"
          variant="outlined"
          name="tags"
          value={form.tags}
          onChange={handleChange}
          required
        />
        <br />
        價格
        <br />
        <input
          id="outlined-basic"
          label="fee"
          variant="outlined"
          name="fee"
          value={form.fee}
          onChange={handleChange}
          required
        />
        <br />
        簡介
        <br />
        <textarea
          className="descriptionInput"
          id="outlined-basic"
          label="description"
          variant="outlined"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <br />
        相關圖像
        <br />
        <input
          id="outlined-basic"
          label="img"
          variant="outlined"
          name="img"
          value={form.img}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <Link to={"/profile/" + props.user._id}>
          <Button variant="contained" onClick={updatePost}>
            更新
          </Button>
          <br /> <br />
          <Button variant="contained">返回</Button>
        </Link>
      </form>
    </div>
  );
}

export default PostUpdatePage;
