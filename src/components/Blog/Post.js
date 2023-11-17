import parse from 'html-react-parser';
import StarRatings from 'react-star-ratings';

import { useBlogDetail } from '../../context/BlogDetailContext';
import Loading from '../Loading';

function Post({ rating }) {
  const { isLoading, blogDetails, idBlog } = useBlogDetail();

  const sumRating = Object.keys(rating).length
    ? Object.keys(rating).reduce((prvValue, currentValue) => {
        return prvValue + rating[currentValue].rate;
      }, 0)
    : 0;

  const averageRating = sumRating / Object.keys(rating).length;

  return (
    <div className="blog-post-area">
      <h2 className="title text-center">Latest From our Blog</h2>

      {isLoading ? (
        <Loading />
      ) : blogDetails ? (
        blogDetails.map((post) => {
          if (post.id === parseInt(idBlog))
            return (
              <div className="single-blog-post" key={post.id}>
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
                </div>

                <StarRatings
                  numberOfStars={5}
                  rating={averageRating ? averageRating : 0}
                  starRatedColor="#FE980F"
                  name="rating"
                />

                <a href="">
                  <img
                    src={`http://localhost/laravel8/public/upload/blog/image/${post.image}`}
                    alt=""
                  />
                </a>

                {parse(post.content)}

                <div className="pager-area">
                  <ul className="pager pull-right">
                    <li>
                      <a href="http">Pre</a>
                    </li>
                    <li>
                      <a href="http">Next</a>
                    </li>
                  </ul>
                </div>
              </div>
            );
        })
      ) : (
        ''
      )}
    </div>
  );
}

export default Post;
