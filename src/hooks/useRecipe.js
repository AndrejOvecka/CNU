import { useEffect, useState } from 'react';

import { api } from '../api';

const useRecipe = (url) => {
  const [recipe, setRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    api
      .get(url)
      .then((response) => {
        setRecipe(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url]);

  return { isLoading, recipe, hasError };
};

export default useRecipe;
