import { Box, Button, Image } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import placeholder from '../images/IMG_8594.JPG';

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Box sx={{ textAlign: 'center' }}>
      <h1>404</h1>
      <h4>Sorry, ale toto nefachá.</h4>
      <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
        <Image radius="md" src={placeholder} alt="Random unsplash image" />
      </div>
      <div>
        <Button mt={20} size="lg" onClick={() => navigate('/')}>
          Přejít na úvod
        </Button>
      </div>
    </Box>
  );
}
