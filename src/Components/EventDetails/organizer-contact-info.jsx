import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const OrganizerInfoModal = ({show,handleClose,email,phone}) => {
  return (
    
      <Modal show={show} onHide={handleClose} style={{paddingTop:"15%",direction:"rtl"}} >
        <Modal.Header >
          <Modal.Title>اطلاعات تماس با برگزارکننده</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row text-right">
                <div className="col">
                    تلفن: {phone}
                </div>
                <div className="col">
                    ایمیل: {email}
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            بستن
          </Button>
        </Modal.Footer>
      </Modal>
        
  );
}

export default OrganizerInfoModal;