import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export function BackButton({ url, text }) {
  const navigate = useNavigate();

  return (
    <Button variant="outline" color="red" onClick={() => navigate(url)}>
      {text}
    </Button>
  );
}
