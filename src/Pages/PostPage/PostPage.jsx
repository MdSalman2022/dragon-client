// filepath: /d:/Development/projects/dragon-news/dragon-client/src/Pages/Post/Post.js
import React from "react";
import { useLoaderData } from "react-router-dom";
import { Card } from "react-bootstrap";

const PostPage = () => {
  const post = useLoaderData();

  return (
    <div className="container mt-5">
      <Card>
        <Card.Img variant="top" src={post.image} />
        <Card.Body>
          <Card.Title>{post.name}</Card.Title>
          <Card.Text>{post.content}</Card.Text>
          <Card.Text>
            <small className="text-muted">
              Posted on {new Date(post.createdAt).toLocaleDateString()}
            </small>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PostPage;
