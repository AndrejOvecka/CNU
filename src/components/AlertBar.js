import { Alert } from '@mantine/core';
import { AlertCircle } from 'tabler-icons-react';

export function AlertBar({ message }) {
  return (
    <Alert
      icon={<AlertCircle size={16} />}
      title="Oops!"
      color="red"
      radius="md"
      variant="filled"
    >
      {message}
    </Alert>
  );
}
