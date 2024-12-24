import React, { useContext, useRef, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user.displayName);
  const photoURLRef = useRef(user.photoURL);
  const [posts, setPosts] = useState([]);

  // Track edit mode and the values being edited
  const [editMode, setEditMode] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/posts?userId=${user.uid}`
      );
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEdit = (post) => {
    setEditMode(post.id);
    setEditTitle(post.name);
    setEditImage(post.image);
    setEditContent(post.content);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/post`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editMode,
          name: editTitle,
          image: editImage,
          content: editContent,
        }),
      });
      if (response.ok) {
        // Update the post in local state
        const updatedPosts = posts.map((post) =>
          post.id === editMode
            ? {
                ...post,
                name: editTitle,
                image: editImage,
                content: editContent,
              }
            : post
        );
        setPosts(updatedPosts);
        setEditMode(null);
      } else {
        console.error("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5000/post/${postId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== postId));
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div>
      {/* Existing Profile form */}
      <Form onSubmit={handleSubmit}>
        {/* ...existing code... */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            readOnly
            defaultValue={user.email}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            onChange={handleNameChange}
            defaultValue={name}
            type="text"
            placeholder="Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Photo URL</Form.Label>
          <Form.Control
            ref={photoURLRef}
            defaultValue={user?.photoURL}
            type="text"
            placeholder="Photo URL"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <div className="posts-section mt-5">
        <h3>My Posts</h3>
        {posts.map((post) =>
          editMode === post.id ? (
            // Edit Mode: Show Update Form
            <Form key={post.id} onSubmit={handleUpdate} className="mb-3">
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formImageLink">
                <Form.Label>Image Link</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image link"
                  value={editImage}
                  onChange={(e) => setEditImage(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formContent">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Write your post content here"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Update
              </Button>
              <Button
                variant="secondary"
                className="ms-2"
                onClick={() => setEditMode(null)}
              >
                Cancel
              </Button>
            </Form>
          ) : (
            // View Mode: Show Post Card
            <Card key={post.id} className="mb-3">
              <Card.Body>
                <Card.Title>{post.name}</Card.Title>
                <Card.Img variant="top" src={post.image} />
                <Card.Text>{post.content}</Card.Text>
                <Button
                  variant="warning"
                  className="mr-2"
                  onClick={() => handleEdit(post)}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(post.id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          )
        )}
      </div>
    </div>
  );
};

export default Profile;
