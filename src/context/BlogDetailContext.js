import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';

const BlogDetailContext = createContext();

function BlogDetailProvider({ children }) {
  const { id } = useParams();
  const [blogDetails, setBlogDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [replay, setReplay] = useState({});
  const url = 'http://localhost/laravel8/public/api/blog';
  const token = localStorage.getItem('token');
  const auth = JSON.parse(localStorage.getItem('auth'));

  useEffect(function () {
    fetchApi();
  }, []);

  async function fetchApi() {
    setIsLoading(true);

    try {
      const res = await axios.get(`${url}`);
      setBlogDetails(res.data.blog.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleReplay(comment) {
    if (!token) {
      alert('vui long dang nhap');
      return;
    }

    setReplay(comment);
  }

  return (
    <BlogDetailContext.Provider
      value={{
        idBlog: id,
        blogDetails,
        isLoading,
        setIsLoading,
        token,
        auth,
        handleReplay,
        replay,
        setReplay,
      }}
    >
      {children}
    </BlogDetailContext.Provider>
  );
}

function useBlogDetail() {
  const blogDetail = useContext(BlogDetailContext);
  if (blogDetail === undefined)
    throw new Error('This can only use in side provider');
  return blogDetail;
}

export { BlogDetailProvider, useBlogDetail };
