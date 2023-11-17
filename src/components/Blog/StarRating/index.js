import axios from 'axios';
import { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';

function StarRating({ id, token, auth, rate }) {
  const [rating, setRating] = useState(0);
  const url = 'http://localhost/laravel8/public/api/blog';
  const votes = Object.keys(rate).length;

  async function fetchRating() {
    try {
      let config = {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      };
      if (rating > 0) {
        const formData = new FormData();
        formData.append('blog_id', id);
        formData.append('user_id', auth.id);
        formData.append('rate', rating);
        const res = await axios.post(`${url}/rate/${id}`, formData, config);
        if (res.data.message) {
          alert(res.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  function changeRating(newRating, name) {
    setRating(newRating);
    if (!token) {
      alert('vui long dang nhap');
      return;
    }

    console.log(rating);
  }

  useEffect(
    function () {
      if (rating > 0 && token) {
        fetchRating();
      }
    },
    [rating]
  );

  return (
    <div className="rating-area">
      <ul className="ratings">
        <li className="rate-this">Rate this item:</li>
        <li>
          <StarRatings
            rating={rating}
            starRatedColor=""
            changeRating={changeRating}
            numberOfStars={5}
            name="rating"
          />
        </li>
        <li className="color">({votes} votes)</li>
      </ul>
      <ul className="tag">
        <li>TAG:</li>
        <li>
          <a className="color" href="http">
            Pink <span>/</span>
          </a>
        </li>
        <li>
          <a className="color" href="http">
            T-Shirt <span>/</span>
          </a>
        </li>
        <li>
          <a className="color" href="http">
            Girls
          </a>
        </li>
      </ul>
    </div>
  );
}

export default StarRating;
