import Comment from './Comment';

function ListComment({ comments }) {
  return (
    <ul className="media-list">
      {comments.map((comment) => (
        <div key={comment.id}>
          {parseInt(comment.id_comment) === 0 && (
            <Comment key={`comment-${comment.id}`} comment={comment} />
          )}

          {comments.map(
            (subComment) =>
              parseInt(subComment.id_comment) === parseInt(comment.id) && (
                <Comment
                  key={`comment-${subComment.id}`}
                  comment={subComment}
                  classSubComment="second-media"
                />
              )
          )}
        </div>
      ))}
    </ul>
  );
}

export default ListComment;
