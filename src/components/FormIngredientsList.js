import { Button, Col, List, Row } from 'reactstrap';
import { GrTrash } from 'react-icons/gr';

export function FormIngredientsList({ ingredients, handleRemoveIngredient }) {
  return (
    <div>
      {ingredients.map(({ name, amount, amountUnit }) => (
        <List type="unstyled" key={name}>
          <Row>
            <Col lg={7} className="mt-1">
              <li>
                <Row>
                  <Col lg={2}>{amount}</Col>
                  <Col lg={2}>{amountUnit}</Col>
                  <Col lg={8}>{name}</Col>
                </Row>
              </li>
            </Col>
            <Col lg={5}>
              <Button
                size="sm"
                color="danger"
                onClick={() => handleRemoveIngredient(name)}
              >
                <GrTrash />
              </Button>
            </Col>
          </Row>
        </List>
      ))}
    </div>
  );
}
