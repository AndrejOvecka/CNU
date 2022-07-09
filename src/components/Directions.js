import splitDirections from '../utils/splitDirections';

export function Direcions({ directions }) {
  return (
    <ol>
      {splitDirections(directions).map((id) => (
        <li key={id} lg={3} md={4} sm={6} xs={12}>
          {id}
        </li>
      ))}
    </ol>
  );
}
