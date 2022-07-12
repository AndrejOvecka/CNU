import { Row, Col } from 'reactstrap';

import { RecipeCard } from './RecipeCard';

export function RecipesList({ recipes }) {
  return (
    <Row className="gy-4">
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
    </Row>
  );
}
