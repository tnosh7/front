import { forwardRef } from "react";
import './style.css';

const Input = forwardRef((props, ref) => {

  const { label, placeholder, error, type, value, icon, message } = props;
  const { onChange, onButtonClick, onKeyDown } = props;

  const onKeyDownHandler = (e) => {
    if (!onKeyDown) return;
    onKeyDown(e);
  };

  return (
    <div className="input">
      <div className="input-label">{label}</div>
      <div className={error ? "input-container-error" : "input-container"}>
        <input
          className="input"
          type={type}
          placeholder={placeholder}
          value={value}
          ref={ref}
          onChange={onChange}
          onKeyDown={onKeyDownHandler}
        />
        {onButtonClick !== undefined && (
          <div className="icon-button" onClick={onButtonClick}>
            {icon !== undefined && <div className={`icon ${icon}`}></div>}
          </div>
        )}
      </div>
      {message !== undefined && <div className="input-message">{message}</div>}
    </div>
  );
});


const SearchInput = (props) => {
  const { onButtonClick, className, size } = props;

  return (
    <div id="searchInput">
      <select name="searchSelect" id="searchSelect">
        <option value="blog">블로그</option>
        <option value="user">유저</option>
      </select>
      <input
        type="text"
        className={className}
        placeholder="검색어를 입력하세요."
      />
      <div className="icon-box">
        <IoSearchSharp size={size} onClick={onButtonClick} />
      </div>
    </div>
  );
};

export { Input, SearchInput };

