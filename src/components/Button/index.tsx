type NavButtonProps = {
  isSelected: boolean;
  onSelect: () => void;
  title: string;
};

const NavButton = ({ isSelected, onSelect, title }: NavButtonProps) => {
  return (
    <li>
      <button className={isSelected ? "active" : undefined} onClick={onSelect}>
        {title}
      </button>
    </li>
  );
};

export { NavButton };
