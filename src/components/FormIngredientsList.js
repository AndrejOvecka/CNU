import { Button, Col, List, Row } from 'reactstrap';
import { GrTrash } from 'react-icons/gr';

export function FormIngredientsList({ ingredients, handleRemoveIngredient }) {
  return (
    <div>
      {ingredients.map(({ name, amount, amountUnit }) => (
        <List type="unstyled" key={name}>
          <Row>
            <Col lg={3}>
              <li>
                {amount} {amountUnit} - {name}
              </li>
            </Col>
            <Col>
              <Button
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
