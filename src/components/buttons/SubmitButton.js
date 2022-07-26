import { Button } from '@mantine/core';

export function SubmitButton({ text }) {
  return (
    <Button type="submit" variant="outline">
      {text}
    </Button>
  );
}
