import { Button } from 'reactstrap';

export function SubmitButton({ handleSubmit }) {
  return (
    <Button color="success" onClick={() => handleSubmit()}>
      Uložit
    </Button>
  );
}
