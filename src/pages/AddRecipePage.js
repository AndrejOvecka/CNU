import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formList } from '@mantine/form';
import { api } from '../api';
import { RecipeForm } from '../components/RecipeForm';
import { randomId } from '@mantine/hooks';

export function AddRecipePage() {
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (form) => {
    console.log('toto je form: ' + JSON.stringify(form));
    try {
      const response = await api.post(`/recipes`, form);
      if (response && response.data) {
        const id = response.data._id;
        navigate(`/recipes/${id}`);
      }
      toast.success('Recept byl úspěšně vytvořen!');
    } catch (errorMessage) {
      setError(errorMessage);
      toast.error(`Něco se nepovedlo. ` + error);
    }
  };

  const initialForm = {
    title: '',
    preparationTime: '',
    sideDish: '',
    directions: '',
    ingredients: formList([
      {
        name: '',
        amount: '',
        amountUnit: '',
        isGroup: false,
        key: randomId(),
      },
    ]),
  };

  return <RecipeForm initialForm={initialForm} handleSubmit={handleSubmit} />;
}
