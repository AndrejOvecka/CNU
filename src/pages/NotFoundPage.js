import { Image } from '@mantine/core';
import { Link } from 'react-router-dom';

import placeholder from '../images/IMG_8594.JPG';

export function NotFoundPage() {
  return (
    <div className="text-center">
      <h1>404</h1>
      <h4>Sorry, ale toto nefachá.</h4>
      <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
        <Image radius="md" src={placeholder} alt="Random unsplash image" />
      </div>
      <div className="mt-4">
        <Link to="/" className="btn btn-primary btn-lg" role="button">
          Přejít na úvod
        </Link>
      </div>
    </div>
  );
}
