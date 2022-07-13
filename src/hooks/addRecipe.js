import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../api';

const handleAddRecipe = async (recipe, title) => {
  const navigate = Navigate();

  if (title.trim().length !== 0) {
    try {
      await api.post(`/recipes`, recipe);
      toast.success('Recept byl úspěšně vytvořen');
      navigate('/');
    } catch (errorMessage) {
      toast.error('Něco se nepovedlo');
    }
  } else {
    toast.error('Název je povinné pole');
  }
};

export default handleAddRecipe;
