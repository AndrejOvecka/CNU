import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formList } from '@mantine/form';
import { randomId } from '@mantine/hooks';

import { api } from '../api';

import { RecipeForm } from '../components/RecipeForm';

export function AddRecipePage() {
  const navigate = useNavigate();

  const handleSubmit = async (form) => {
    try {
      const response = await api.post(`/recipes`, form);
      if (response && response.data) {
        const id = response.data._id;
        navigate(`/recipes/${id}`);
      }
      toast.success('Recept byl úspěšně vytvořen! 🥳');
    } catch (error) {
      toast.error('Něco se nepovedlo.');
    }
  };

  const initialForm = {
    title: '',
    preparationTime: '',
    sideDish: '',
    directions: '',
    servingCount: '',
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
