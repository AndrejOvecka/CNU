import { useState } from 'react';
import { Button, Modal, Group } from '@mantine/core';

export function DeleteRecipeButton({ title, ...props }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button color="red" variant="outline" onClick={() => setShowModal(true)}>
        Smazat
      </Button>
      <Modal
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        opened={showModal}
        onClose={() => setShowModal(false)}
        title={`Opravdu chcete smazat recept ${title}?`}
      >
        <Group>
          <Button {...props}>Smazat</Button>
          <Button color="red" onClick={() => setShowModal(false)}>
            Zrušit
          </Button>
        </Group>
      </Modal>
    </>
  );
}
