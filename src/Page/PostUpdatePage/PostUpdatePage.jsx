import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import { Link, useParams } from "react-router-dom";

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
      LocationName: post.LocationName,
      address: post.Address,
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
        locationName: "",
        address: "",
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
      <AppBar position="static">
        <Typography
          variant="h3"
          noWrap
          component="h1"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          Creating A New Spot
        </Typography>
      </AppBar>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        ref={formRef}
      >
        <br />
        <TextField
          id="outlined-basic"
          label="LocationName"
          variant="outlined"
          name="LocationName"
          value={form.LocationName || ""}
          onChange={handleChange}
          required
        />
        <br />
        <TextField
          id="outlined-basic"
          label="address"
          variant="outlined"
          name="address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <br />
        <TextField
          id="outlined-basic"
          label="tags"
          variant="outlined"
          name="tags"
          value={form.tags}
          onChange={handleChange}
          required
        />
        <br />
        <TextField
          id="outlined-basic"
          label="fee"
          variant="outlined"
          name="fee"
          value={form.fee}
          onChange={handleChange}
          required
        />
        <br />
        <TextField
          id="outlined-basic"
          label="description"
          variant="outlined"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <br />

        <TextField
          id="outlined-basic"
          label="img"
          variant="outlined"
          name="img"
          value={form.img}
          onChange={handleChange}
          required
        />
        <br />
        <Link to="/profile">
          <Button variant="contained" onClick={updatePost}>
            Update
          </Button>
          <br /> <br />
          <Button variant="contained">Back</Button>
        </Link>
      </Box>
    </div>
  );
}

export default PostUpdatePage;
