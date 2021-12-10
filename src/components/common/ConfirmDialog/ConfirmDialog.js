import { Modal, Button } from 'react-bootstrap';

import '../common.css';


const ConfirmDialog = ({
    show,
    onClose,
    onSave,
    title,
}) => {
    return (
        <div className={show ? "confirm-dialog-wrapper" : "hidden"}>
            <Modal className="confirm-dialog" show={show} onHide={onClose}>
                <Modal.Header className="confirm-dialog-header">
                    <Modal.Title className="confirm-dialog-header-title">{title}</Modal.Title>
                </Modal.Header>
                <Modal.Footer className="confirm-dialog-footer">
                    <Button className="confirm-dialog-footer-cancel-btn" onClick={onClose}>Cancel</Button>
                    <Button className="confirm-dialog-footer-confirm-btn" onClick={onSave}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ConfirmDialog;
