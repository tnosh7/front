import Logo from "@/assets/Steam_icon_logo.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavButton } from "../../components/Button";
import { AUTH_PATH, COM_PATH, GAME_PATH, NEWS_PATH, STORE_PATH } from "../../constants";
import "./style.css";

export default function Header() {
  const [selectedNavButton, setSelectedNavButton] = useState(
    () => localStorage.getItem("selectedNavButton") || ""
  );
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("selectedNavButton", selectedNavButton);
  }, [selectedNavButton]);

  const onLogoClickHander = () => {
    navigate("/");
    setSelectedNavButton("");
  };

  const onNavButtonClickHandler = (selectedNavButton) => {
    setSelectedNavButton(selectedNavButton);
    navigate(`${selectedNavButton}`);
  };

  return (
    <header id="header">
      <div className="header-container">
        <div className="left-box" onClick={onLogoClickHander}>
          <div className="logo-image-wrapper">
            <img src={Logo} alt="logo" />
          </div>
          <h1>Steaming</h1>
        </div>

        <div className="middle-box">
          <NavButton
            isSelected={selectedNavButton === NEWS_PATH()}
            onSelect={() => onNavButtonClickHandler(NEWS_PATH())}
            title={"NEWS"}
          />
          <NavButton
            isSelected={selectedNavButton === GAME_PATH()}
            onSelect={() => onNavButtonClickHandler(GAME_PATH())}
            title={"GAME"}
          />
          <NavButton
            isSelected={selectedNavButton === COM_PATH()}
            onSelect={() => onNavButtonClickHandler(COM_PATH())}
            title={"COMMUNITY"}
          />
          <NavButton
            isSelected={selectedNavButton === STORE_PATH()}
            onSelect={() => onNavButtonClickHandler(STORE_PATH())}
            title={"STORE"}
          />
        </div>
        <div className="right-box">
          <Link to={AUTH_PATH()}>로그인</Link>
        </div>
      </div>
    </header>
  );
}
