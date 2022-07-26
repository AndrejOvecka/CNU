import MarkdownView from 'react-showdown';

import '../styles/showdown-styles.css';

export function DirecionsList({ directions }) {
  return <MarkdownView className="directions" markdown={directions} />;
}
