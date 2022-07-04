import { Card, CardBody, CardTitle, CardSubtitle, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';

import placeholder from '../images/food-placeholder.png';
import toHoursAndMinutes from '../utils/toHoursAndMinutes';

export function RecipeCard({ title, preparationTime, slug }) {
  return (
    <Card className="h-100">
      <Link className="text-reset text-decoration-none" to={`/recipe/${slug}`}>
        <CardImg src={placeholder} alt="Preview" top />
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
          <CardSubtitle>
            Čas prípravy: {toHoursAndMinutes(preparationTime)}
          </CardSubtitle>
        </CardBody>
      </Link>
    </Card>
  );
}
