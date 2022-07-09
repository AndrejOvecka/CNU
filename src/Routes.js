import { Routes as RouterRoutes, Route } from 'react-router-dom';

import { RecipeListPage } from './pages/RecipeListPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
import { AddRecipePage } from './pages/AddRecipePage';
import { EditRecipePage } from './pages/EditRecipePage';

export function Routes() {
  return (
    <RouterRoutes>
      <Route index element={<RecipeListPage />} />
      <Route path="/recipe/:slug" element={<RecipeDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/recipe/add" element={<AddRecipePage />} />
      <Route path="/recipe/edit/:slug" element={<EditRecipePage />} />
    </RouterRoutes>
  );
}
