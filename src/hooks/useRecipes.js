import { useEffect, useState } from 'react';

import { api } from '../api';

const useRecipes = (url) => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    api
      .get(url)
      .then((response) => {
        setRecipes(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url]);

  return { recipes, isLoading, hasError };
};

export default useRecipes;
