
import Modal from 'react-bootstrap/Modal';
import './carousel.css'

function Example({ userToshow, setUserToShow }) {

    return (
        <>


            <Modal
                show={userToshow}
                onHide={() => setUserToShow(null)}
                dialogClassName="modal-50w modal-50h"
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        {userToshow?.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className=''>
                        <img src={userToshow?.picture} alt="user-picture" className='user-image' />
                    </p>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Example;