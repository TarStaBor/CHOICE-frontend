import "./Modal.css";

function Modal(props) {
  const { isModal, setIsModal } = props;
  return (
    <>
      <section onClick={() => setIsModal(false)} className={`modal ${isModal && "modal_opened"}`}>
        <div className="modal__container">
          <p className="modal__title">Допустимые форматы:</p>
          <p className="modal__subtitle">.doc .docx .pdf .ppt .pptx .jpeg .jpg .png .zip .7z .rar</p>
        </div>
      </section>
    </>
  );
}

export default Modal;
