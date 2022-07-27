import { useEffect, useState } from 'react';

import { api } from '../api';

const useIngredients = (url) => {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    api
      .get('/recipes/ingredients')
      .then((response) => {
        setIngredientsList(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url]);

  return { ingredientsList, isLoading, hasError };
};

export default useIngredients;
