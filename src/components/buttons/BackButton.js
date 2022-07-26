import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export function BackButton({ text }) {
  const navigate = useNavigate();

  return (
    <Button color="red" variant="outline" onClick={() => navigate(-1)}>
      {text}
    </Button>
  );
}
