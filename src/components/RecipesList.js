import { Grid } from '@mantine/core';

import { RecipeCard } from './RecipeCard';

const { Col } = Grid;

export function RecipesList({ recipes }) {
  return (
    <Grid>
      {recipes.map(({ _id, slug, title, preparationTime, sideDish }) => (
        <Col key={_id} lg={3} md={4} sm={6} xs={12}>
          <RecipeCard
            title={title}
            preparationTime={preparationTime}
            slug={slug}
            sideDish={sideDish}
            _id={_id}
          />
        </Col>
      ))}
    </Grid>
  );
}
