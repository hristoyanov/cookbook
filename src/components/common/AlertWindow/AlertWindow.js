import { Modal, Button } from 'react-bootstrap';

import '../common.css';


const ConfirmDialog = ({
    show,
    onClose,
    title,
}) => {
    return (
        <div className={show ? "alert-window-wrapper" : "hidden"}>
            <Modal className="alert-window" show={show} onHide={onClose}>
                <Modal.Header className="alert-window-header">
                    <Modal.Title className="alert-window-header-title">{title}</Modal.Title>
                </Modal.Header>
                <Modal.Footer className="alert-window-footer">
                    <Button className="alert-window-footer-ok-btn" onClick={onClose}>OK</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ConfirmDialog;
