import style from './modal.module.css';

function Modals({ linkImg, showImage, handleClose }) {
  return (
    <div
      className={style.container}
      style={{ display: `${showImage ? 'block' : 'none'}` }}
    >
      <img className={style.img} src={linkImg} alt="" />
      <br />
      <button className={style.button} onClick={handleClose}>
        close
      </button>
    </div>
  );
}

export default Modals;
