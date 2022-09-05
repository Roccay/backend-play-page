import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import "./PostCreatePage.css";

function PostCreatePage(props) {
  const [form, setForm] = useState({
    // author: props.user._id,
    author: "",
    GameName: "",
    AuthorName: "",
    tags: "",
    fee: "",
    description: "",
    img: "",
  });
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const formRef = React.createRef();

  // 获得图片缩略图
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  // 上传检测格式
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
  
    const isLt2M = file.size / 1024 / 1024 < 2;
  
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
  
    return isJpgOrPng && isLt2M;
  };
  const imageChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const createPost = async () => {
    if (!formRef.current.checkValidity()) return;
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      setForm({
        author: props.user._id,
        GameName: "",
        AuthorName: "",
        tags: "",
        fee: "",
        description: "",
        img: "",
      });
    } catch (err) {
      console.log(err.response.data);
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <div className="PostCreatePage">
      <h1>為庫中添加新的遊戲</h1>
      <form autoComplete="off" ref={formRef} className="create-post-form">
        <br />
        遊戲名稱 <br />
        <input
          id="outlined-basic"
          label="遊戲名稱"
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
          label="作者"
          variant="outlined"
          name="AuthorName"
          value={form.AutherName}
          onChange={handleChange}
          required
        />
        <br />
        標籤 <br />
        <span>（請用空格分開）</span> <br />
        <input
          id="outlined-basic"
          label="標籤（請用空格分開）"
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
          label="價格"
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
          label="簡介"
          variant="outlined"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <br />
        相關圖像
        <br />
        <Upload
          name="cover"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="http://127.0.0.1:5000/upload"
          beforeUpload={beforeUpload}
          onChange={imageChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
        <br /> <br />
        <Link to="/games">
          <Button
            className="post-create-button"
            variant="contained"
            onClick={createPost}
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

export default PostCreatePage;
