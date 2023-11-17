import axios from 'axios';
import { useState } from 'react';

import { useBlogDetail } from '../../context/BlogDetailContext';

function CommentArea({ getCmt }) {
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({});
  const url = 'http://localhost/laravel8/public/api/blog/comment';
  const {
    idBlog,
    token: accessToken,
    auth: userData,
    replay: replayComment,
  } = useBlogDetail();

  const printTitle = userData ? userData.name : 'Your Name';
  const checkReplay = Object.keys(replayComment).length > 0;

  function handleComment(e) {
    const commentValue = e.target.value;
    setComment(commentValue);
    if (commentValue) {
      setErrors({});
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!accessToken) {
      alert('vui long dang nhap!!');
      return;
    }

    if (!comment) {
      setErrors((prvError) => ({ ...prvError, comment: 'chua nhap' }));
      return;
    }

    fetchComment();
    setComment('');
  }

  async function fetchComment() {
    try {
      let config = {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      };

      if (comment) {
        const formData = new FormData();
        formData.append('id_blog', parseInt(idBlog));
        formData.append('id_user', parseInt(userData.id));
        formData.append(
          'id_comment',
          checkReplay > 0 ? parseInt(replayComment.id) : 0
        );
        formData.append('comment', comment);
        formData.append('image_user', userData.avatar);
        formData.append('name_user', userData.name);

        const res = await axios.post(`${url}/${idBlog}`, formData, config);
        const commentData = res.data.data;
        if (res.data.data.id) {
          alert('binh luan thanh cong');
          getCmt(commentData);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="replay-box" id="commentArea">
      <div className="row">
        <div className="col-sm-12">
          <h2>Leave a replay</h2>

          <div className="text-area">
            <div className="blank-arrow">
              <label>
                {Object.keys(replayComment).length > 0
                  ? userData && userData.name === replayComment.name_user
                    ? `${userData.name} replay to yourself`
                    : `${userData.name} replay to ${replayComment.name_user}`
                  : printTitle}
              </label>
            </div>
            <span>*</span>
            <textarea
              name="message"
              rows="11"
              value={comment}
              onChange={handleComment}
            ></textarea>
            <span>{errors?.comment}</span>
            <a className="btn btn-primary" href="http" onClick={handleSubmit}>
              post comment
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentArea;
