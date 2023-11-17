import ListComment from './ListComment';
import CommentArea from './CommentArea';
import { BlogDetailProvider } from '../../context/BlogDetailContext';
import Post from './Post';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import StarRating from './StarRating';
// import NotFound404 from '../Error/NotFound404';

function Detail() {
  const { id } = useParams();
  const [listComments, setListComments] = useState([]);
  const [blog, setBlog] = useState([]);
  const [rating, setRating] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('token');
  const auth = JSON.parse(localStorage.getItem('auth'));

  const url = 'http://localhost/laravel8/public/api/blog';

  useEffect(function () {
    fetchApi();
    fetchRating();
  }, []);

  async function fetchApi() {
    setIsLoading(true);
    try {
      const res = await axios.get(`${url}`);
      const blogData = res.data.blog.data;
      if (blogData) {
        const blogDetail = blogData.filter((data) => data.id === parseInt(id));
        const comments = blogDetail.length > 0 ? blogDetail[0].comment : [];
        setBlog(blogDetail);
        setListComments(comments);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchRating() {
    try {
      const res = await axios.get(`${url}/rate/${id}`);
      setRating(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  function getCmt(comments) {
    setListComments((comment) => [...comment, comments]);
  }

  function handleReply(idComment) {
    console.log(idComment);
  }

  return (
    <BlogDetailProvider>
      <div className="col-sm-9">
        <Post rating={rating} />

        <StarRating id={id} token={token} auth={auth} rate={rating} />

        <div className="socials-share">
          <a href="http">
            <img src="images/blog/socials.png" alt="" />
          </a>
        </div>

        <div className="media commnets">
          <a className="pull-left" href="http">
            <img
              className="media-object"
              src="images/blog/man-one.jpg"
              alt=""
            />
          </a>
          <div className="media-body">
            <h4 className="media-heading">Annie Davis</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="blog-socials">
              <ul>
                <li>
                  <a href="http">
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="http">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="http">
                    <i className="fa fa-dribbble"></i>
                  </a>
                </li>
                <li>
                  <a href="http">
                    <i className="fa fa-google-plus"></i>
                  </a>
                </li>
              </ul>
              <a className="btn btn-primary" href="http">
                Other Posts
              </a>
            </div>
          </div>
        </div>
        <div className="response-area">
          <h2>{listComments.length} RESPONSES</h2>
          <ListComment comments={listComments} handleReply={handleReply} />
        </div>
        <CommentArea getCmt={getCmt} />
      </div>
    </BlogDetailProvider>
  );
}

export default Detail;
