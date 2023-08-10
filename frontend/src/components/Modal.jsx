import '../styles/Modal.scss';

const Modal = ({ setIsModalOpen }) => {
  return (
    <>
      <div className='modal-container'>
        <button className='modal-close-button' onClick={() => setIsModalOpen(false)}> X </button>

        <h1>hello</h1>
      </div>
    </>
  );
};

export default Modal;