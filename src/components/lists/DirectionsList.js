import MarkdownView from 'react-showdown';

import '../../styles/showdown-styles.css';

export function DirecionsList({ directions }) {
  const parsedDirections = directions.replace('\n\n', '\n');
  return <MarkdownView className="directions" markdown={parsedDirections} />;
}
