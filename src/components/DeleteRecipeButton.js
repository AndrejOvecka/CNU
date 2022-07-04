import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
} from 'reactstrap';

export function DeleteRecipeButton(props) {
  const { title } = props;
  const [state, setState] = useState(false);

  const toggle = () => setState(!state);

  return (
    <div className="mt-2 mb-3">
      <Button className="btn btn-danger " onClick={toggle}>
        Smazat recept
      </Button>
      <Modal isOpen={state}>
        <ModalHeader>Smazat recept</ModalHeader>
        <ModalBody>Opravdu chcete smazat recept {title}?</ModalBody>
        <ModalFooter>
          <Link to="/">
            <Button color="primary" {...props}>
              Smazat
            </Button>
          </Link>
          <Button outline color="danger" onClick={toggle}>
            Zrušit
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
