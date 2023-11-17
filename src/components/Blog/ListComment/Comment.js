import { useBlogDetail } from '../../../context/BlogDetailContext';

function Comment({ comment, classSubComment }) {
  const { handleReplay, token } = useBlogDetail();

  const isoString = comment.created_at;
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDay();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return (
    <li className={`media ${classSubComment}`}>
      <a className="pull-left" href="http">
        <img
          style={{ width: '40px', height: '40px' }}
          className="media-object"
          src={`http://localhost/laravel8/public/upload/user/avatar/${comment.image_user}`}
          alt=""
        />
      </a>
      <div className="media-body">
        <ul className="sinlge-post-meta">
          <li>
            <i className="fa fa-user"></i>
            {comment.name_user}
          </li>
          <li>
            <i className="fa fa-clock-o"></i> {`${hour}:${minutes}`}
          </li>
          <li>
            <i className="fa fa-calendar"></i> {`${day}, ${month}, ${year}`}
          </li>
        </ul>
        <p>{comment.comment}</p>
        <a
          style={{ display: `${classSubComment && 'none'}` }}
          className={` btn btn-primary `}
          href={token ? `#commentArea` : ''}
          onClick={() => handleReplay(comment)}
        >
          <i className="fa fa-reply"></i>Replay
        </a>
      </div>
    </li>
  );
}

export default Comment;
