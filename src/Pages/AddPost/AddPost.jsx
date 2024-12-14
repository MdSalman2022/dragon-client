import React, { useState, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider"; // Adjust the import path as necessary

const AddPost = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      name: title,
      content: content,
      image: imageLink,
      userId: user?.uid,
    };

    try {
      const response = await fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Post submitted successfully");
        navigate("/");
      } else {
        console.error("Failed to submit post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add New Post</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formImageLink">
          <Form.Label>Image Link</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image link"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Write your post content here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Post
        </Button>
      </Form>
    </div>
  );
};

export default AddPost;
