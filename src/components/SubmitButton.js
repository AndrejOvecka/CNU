import { Button } from 'reactstrap';

export function SubmitButton({ value, handleSubmit }) {
  return <Button onClick={() => handleSubmit()}>Uložit</Button>;
}
