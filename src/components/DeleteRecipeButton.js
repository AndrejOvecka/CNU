import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export function DeleteRecipeButton(props) {
  const { title } = props;
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="mt-2 mb-3">
      <Button className="btn btn-danger " onClick={() => setShowModal(true)}>
        Smazat recept
      </Button>
      <Modal isOpen={showModal}>
        <ModalHeader>Smazat recept</ModalHeader>
        <ModalBody>Opravdu chcete smazat recept {title}?</ModalBody>
        <ModalFooter>
          <Button color="primary" {...props}>
            Smazat
          </Button>
          <Button outline color="danger" onClick={() => setShowModal(false)}>
            Zrušit
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
