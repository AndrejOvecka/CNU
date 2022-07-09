import { Card, CardBody, CardTitle, CardSubtitle, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';

import placeholder from '../images/food-placeholder.png';
import toHoursAndMinutes from '../utils/toHoursAndMinutes';

export function RecipeCard({ title, preparationTime, slug, sideDish }) {
  return (
    <Card className="h-100">
      <Link className="text-reset text-decoration-none" to={`/recipe/${slug}`}>
        <CardImg src={placeholder} alt="Preview" top />
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
          <CardSubtitle>
            {preparationTime && (
              <span>Čas prípravy: {toHoursAndMinutes(preparationTime)}</span>
            )}
          </CardSubtitle>
          <CardSubtitle>{sideDish}</CardSubtitle>
        </CardBody>
      </Link>
    </Card>
  );
}
