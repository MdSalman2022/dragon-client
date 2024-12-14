import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { IoMdCreate } from "react-icons/io";

const Home = () => {
  const posts = useLoaderData();

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  // Sort posts by createdAt date in descending order
  const sortedPosts = posts?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div>
      <h2>Dragon news home: {posts?.length}</h2>
      {sortedPosts?.map((post) => (
        <Card key={post.id} className="mb-3">
          <Card.Img variant="top" src={post.image} />
          <Card.Body>
            <Card.Title>{post.name}</Card.Title>
            <Card.Text>{truncateText(post.content, 50)}</Card.Text>
            <Card.Text>
              <small className="text-muted">
                Posted on {new Date(post.createdAt).toLocaleDateString()}
              </small>
            </Card.Text>
            <Link to={`/post/${post.id}`}>
              <Button variant="primary">Read More</Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
      <Link to="/add-post">
        <Button className="floating-button">
          <IoMdCreate />
        </Button>
      </Link>
    </div>
  );
};

export default Home;
