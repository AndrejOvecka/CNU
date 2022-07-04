import { List } from 'reactstrap';

export function IngredientsList({ ingredients, portions }) {
  return (
    <List type="unstyled">
      {ingredients.map(({ _id, amount, amountUnit, name }) => (
        <li key={_id}>
          {amount && (
            <span>
              {amount * portions} {amountUnit} - {name}
            </span>
          )}
          {!amount && <span>{name}</span>}
        </li>
      ))}
    </List>
  );
}
