import { Alert } from '@mantine/core';
import { AlertCircle } from 'tabler-icons-react';

export function NoIngredienceBar({ message }) {
  return (
    <Alert icon={<AlertCircle size={16} />} radius="md" variant="filled">
      Recept nemá žádné ingredience
    </Alert>
  );
}
