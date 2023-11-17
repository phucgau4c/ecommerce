import { useEffect, useState } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';

import Loading from '../Loading';

// import api from '../../api/api';
function Blog() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const url = 'http://localhost/laravel8/public/api/blog';
  const posts = data ? data.blog.data : [];

  useEffect(function () {
    fetchApi();
  }, []);

  async function fetchApi() {
    setIsLoading(true);

    try {
      const res = await axios.get(`${url}`);
      // const res = await axios.get('blog');
      setData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Latest From our Blog</h2>

        {/* work */}
        {isLoading ? (
          <Loading />
        ) : (
          posts.map((post) => (
            <div key={post.id} className="single-blog-post">
              <h3>{post.title}</h3>
              <div className="post-meta">
                <ul>
                  <li>
                    <i className="fa fa-user"></i> Mac Doe
                  </li>
                  <li>
                    <i className="fa fa-clock-o"></i> 1:33 pm
                  </li>
                  <li>
                    <i className="fa fa-calendar"></i> DEC 5, 2013
                  </li>
                </ul>
                <span>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star-half-o"></i>
                </span>
              </div>
              <a href="http">
                <img src="images/blog/blog-one.jpg" alt="" />
              </a>
              {parse(post.content)}
              <Link className="btn btn-primary" to={`/blog/details/${post.id}`}>
                Read More
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Blog;
