"use client";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagclick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagclick={handleTagclick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState();
  const [posts, setPosts] = useState([]);
  const handleSearchChange = (e) => {};

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    // fetch posts
    fetchPosts();
  }, []);
  
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username."
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={posts} handleTagclick={() => {}} />
    </section>
  );
};

export default Feed;
