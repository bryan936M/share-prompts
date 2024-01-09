"use client";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

 // default false
 export const revalidate=0 // or low number
 export const dynamic = "force-dynamic";

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

  
  useEffect(() => {
    // fetch posts
    const fetchPosts = async () => {
      const host = process.env.NEXTAUTH_URL;
      const response = await fetch('/api/prompt', { cache: 'no-store' });
      const data = await response.json();
      setPosts(data);
      console.log(new Date(new Date().getTime()).toLocaleString(), data);
    };
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
