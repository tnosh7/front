const NavButton = (props) => {
  const { isSelected, onSelect, title } = props;
  return (
    <li>
      <button className={isSelected ? "active" : undefined} onClick={onSelect}>
        {title}
      </button>
    </li>
  );
};

export { NavButton };
