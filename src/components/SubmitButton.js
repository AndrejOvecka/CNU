import { Button } from '@mantine/core';

export function SubmitButton({ handleSubmit }) {
  return (
    <Button color="green" onClick={() => handleSubmit()}>
      Uložit
    </Button>
  );
}
