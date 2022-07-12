import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Container } from 'reactstrap';
import { api } from '../api';

export function EditRecipePage() {
  const [error, setError] = useState(false);
  const { id } = useParams();

  const handleEditRecipe = async (id) => {
    try {
      await api.post(`/recipes/${id}`, {
        title: 'title',
        preparationTime: 'preparationTime',
      });
      toast.success('Recept byl upraven');
    } catch (errorMessage) {
      setError(true);
      toast.error(error);
    }
  };

  return (
    <Container>
      <div>
        <Button onClick={() => handleEditRecipe(id)}>Uložit</Button>
      </div>
    </Container>
  );
}
