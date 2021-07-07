interface Props {
  text: string,
  defaultText: string,
  isActive: boolean,
  handleClick: Function
}


function Tag(props: Props) {
  const { text, defaultText, isActive, handleClick } = props;

  return <span data-text={text} className={isActive ? 'tag active' : 'tag' } onClick={() => handleClick(text)}>{text || defaultText}</span>
}

export default Tag;