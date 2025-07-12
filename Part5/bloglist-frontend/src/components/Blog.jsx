import { useState } from "react";

const Blog = ({ blog, addOneLike, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const showDeleteButtton = () => {
    const userLoggedIn = window.localStorage.getItem("loggedBlogAppUser");
    if (userLoggedIn) {
      const user = JSON.parse(userLoggedIn);
      return user.username === blog.user.username;
    }
    return false;
  };

  const toggleVisibility = () => {
    setShowDetails(!showDetails);
  };

  const blogStyle = {
    paddingTop: 7,
    paddingLeft: 2,
    paddingBottom: 5,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const blogDetails = () => {
    return (
      <div className="div_blogDetails" data-testid="div_blogDetails">
        <div className="div_url">{blog.url}</div>
        <div className="div_likes">
          likes {blog.likes}{" "}
          <button
            id="btn_addonelike"
            onClick={() => {
              addOneLike(blog);
            }}
          >
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
        {showDeleteButtton() && (
          <button
            onClick={() => {
              removeBlog(blog);
            }}
            style={{ background: "blue" }}
          >
            remove
          </button>
        )}
      </div>
    );
  };

  return (
    <div style={blogStyle} data-testid="blog_info_div">
      {blog.title} {blog.author}
      <button id="btn_show_details" onClick={toggleVisibility}>
        {showDetails ? "hide" : "show"}
      </button>
      {showDetails && blogDetails()}
    </div>
  );
};

export default Blog;
