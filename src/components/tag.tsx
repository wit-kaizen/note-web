function Tag(props) {
  const { text, defaultText, isActive, handleClick } = props;

  return <span data-text={text} className={isActive ? 'tag active' : 'tag' } onClick={() => handleClick(text)}>{text || defaultText}</span>
}

export default Tag;