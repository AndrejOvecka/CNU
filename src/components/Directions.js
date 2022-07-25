import MarkdownView from 'react-showdown';
import style from '../styles/showdown-styles.module.css';

export function Direcions({ directions }) {
  return (
    <MarkdownView className={style.directionTitle} markdown={directions} />
  );
}
