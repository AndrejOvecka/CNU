import { useEffect, useState } from 'react';

import { api } from '../api';

const useRecipe = (url) => {
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    api
      .get(url)
      .then((response) => {
        console.log(response.data);
        setRecipe(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url]);

  return { isLoading, recipe, hasError };
};

export default useRecipe;
