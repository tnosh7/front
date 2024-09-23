import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Input } from '../../components/Input';
import { loginRequest, signupRequest } from "../../service";
import './style.css';

export default function Auth() {
  const [view, setView] = useState('login');
  // state: 쿠키 상태 //
  const [cookies, setCookies] = useCookies();

  // function: 네비게이트 함수 //
  const navigate = useNavigate();


  const LoginCard = () => {
    const [isChecked, setIsChecked] = useState(false);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const [passwordButtonIcon, setPasswordButtonIcon] = useState("eye-light-off-icon");
    const [error, setError] = useState(false);

    useEffect(() => {
      const rememberedEmail = localStorage.getItem("rememberedEmail");
      const rememberedIsChecked = localStorage.getItem("isChecked") === "true";

      if (rememberedEmail) {
        setEmail(rememberedEmail);
      }

      setIsChecked(rememberedIsChecked);
    }, []);

    const loginResponse = (responseBody) => {
      if (!responseBody) {
        alert("네트워크 에러!");
        return;
      }
      const { token, expirationTime } = responseBody;
      const now = new Date().getTime();
      const expires = new Date(now + expirationTime * 1000);
      setCookies("accessToken", token, { expires, path: MAIN_PATH() });
      navigate(MAIN_PATH());
    };

    const onEmailChangeHandler = (e) => {
      setError(false);
      const { value } = e.target;
      setEmail(value);
      if (isChecked) {
        localStorage.setItem("rememberedEmail", value);
      }
    };

    const onPasswordChangeHandler = (e) => {
      setError(false);
      const { value } = e.target;
      setPassword(value);
    };

    const onCheckboxChangeHandler = (e) => {
      const checked = e.target.checked;
      setIsChecked(checked);

      if (checked) {
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("isChecked", "true");
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.setItem("isChecked", "false");
      }
    };

    const onPasswordButtonClickHandler = () => {
      if (passwordType === "text") {
        setPasswordType("password");
        setPasswordButtonIcon("eye-light-off-icon");
      } else {
        setPasswordType("text");
        setPasswordButtonIcon("eye-light-on-icon");
      }
    };

    const onEmailKeyDownHandler = (e) => {
      if (e.key !== "Enter") return;
      if (!passwordRef.current) return;
      passwordRef.current.focus();
    };

    const onPasswordKeyDownHandler = (e) => {
      if (e.key !== "Enter") return;
      onLoginButtonClickHandler();
    };

    const onLoginButtonClickHandler = () => {
      if (email.trim().length === 0 || password.trim().length === 0) {
        setError(true);
        return;}
      const requestBody = { email, password };
      loginRequest(requestBody).then(loginResponse);
    };

    const onSignUpLinkClickHandler = () => {
      setView("signup");
    };

    return (
      <div id="login-card">
        <div className='login-top'>
        <p>로그인</p>
        </div>
        <div className="login-input-box">
        <Input
            ref={emailRef}
            label="이메일"
            placeholder="이메일을 입력하세요."
            type="text"
            error={error}
            value={email}
            onChange={onEmailChangeHandler}
            onKeyDown={onEmailKeyDownHandler}
          />
          <Input
            ref={passwordRef}
            label="비밀번호"
            placeholder="비밀번호를 입력하세요."
            type={passwordType}
            error={error}
            value={password}
            onChange={onPasswordChangeHandler}
            icon={passwordButtonIcon}
            onButtonClick={onPasswordButtonClickHandler}
            onKeyDown={onPasswordKeyDownHandler}
          />
          {error && (
            <div className="auth-login-error-box">
              <div className="auth-login-error-message">
                {
                  "이메일 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요."
                }
              </div>
            </div>
          )}
          <div className="auth-login-remember-id">
            <input
              type="checkbox"
              name="rememberId"
              id="rememberId"
              checked={isChecked}
              onChange={onCheckboxChangeHandler}
            />
            <label htmlFor="rememberId">이메일 기억하기</label>
          </div>
          <div
            className="large-full-button"
            onClick={onLoginButtonClickHandler}
          >
            {"로그인"}
          </div>
          <div className="auth-bottom-box">
            <div className="auth-bottom" onClick={onSignUpLinkClickHandler}>
                {"회원가입"}
            </div>
        </div>
      </div>
      </div>
    )
  }

  const SignupCard = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordCheckRef = useRef(null);
    const nicknameRef = useRef(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordType, setPasswordType] = useState(
      "password"
    );
    const [passwordButtonIcon, setPasswordButtonIcon] = useState("eye-light-off-icon");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [nickname, setNickname] = useState("");
    const [passwordCheckType, setPasswordCheckType] = useState("password");
    const [passwordCheckButtonIcon, setPasswordCheckButtonIcon] = useState("eye-light-off-icon");

    const [isEmailError, setEmailError] = useState(false);
    const [isPasswordError, setPasswordError] = useState(false);
    const [isPasswordCheckError, setPasswordCheckError] =
      useState(false);
    const [isNicknameError, setNicknameError] = useState(false);

    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] =
      useState("");
    const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] =
      useState("");
    const [nicknameErrorMessage, setNicknameErrorMessage] =
      useState("");

    const onEmailChangeHandler = (e) => {
      const { value } = e.target;
      setEmail(value);
      setEmailError(false);
      setEmailErrorMessage("");
    };

    const onPasswordChangeHandler = (e) => {
      const { value } = e.target;
      setPassword(value);
      setPasswordError(false);
      setPasswordErrorMessage("");
    };

    const onPasswordCheckChangeHandler = (e) => {
      const { value } = e.target;
      setPasswordCheck(value);
      setPasswordCheckError(false);
      setPasswordCheckErrorMessage("");
    };

    const onNicknameChangeHandler = (e) => {
      const { value } = e.target;
      setNickname(value);
      setNicknameError(false);
      setNicknameErrorMessage("");
    };

    const onPasswordButtonClickHandler = () => {
      if (passwordType === "text") {
        setPasswordType("password");
        setPasswordButtonIcon("eye-light-off-icon");
      } else {
        setPasswordType("text");
        setPasswordButtonIcon("eye-light-on-icon");
      }
    };

    const onPasswordCheckButtonClickHandler = () => {
      if (passwordCheckButtonIcon === "eye-light-off-icon") {
        setPasswordCheckButtonIcon("eye-light-on-icon");
        setPasswordCheckType("text");
      } else {
        setPasswordCheckButtonIcon("eye-light-off-icon");
        setPasswordCheckType("password");
      }
    };

    const onEmailKeyDownHandler = (e) => {
      if (e.key !== "Enter") return;
      if (!passwordRef.current) return;
      passwordRef.current.focus();
    };

    const onPasswordKeyDownHandler = (e) => {
      if (e.key !== "Enter") return;
      if (!passwordCheckRef.current) return;
      passwordCheckRef.current.focus();
    };

    const onPasswordCheckKeyDownHandler = (e) => {
      if (e.key !== "Enter") return;
      if (!nicknameRef.current) return;
      nicknameRef.current.focus();
    };

    const onNicknameKeyDownHandler = (e) => {
      if (e.key !== "Enter" && e.key !== "Tab") return;
      onSignUpButtonClickHandler();
    };

    const onLoginLinkClickHandler = () => {
      setView("login");
    };

    const signupResponse = (responseBody) => {
      if (!responseBody) {
        alert("네트워크 이상입니다.");
        return;
      };
      setView("login");
    };

    const onSignUpButtonClickHandler = () => {

      const emailPattern = /^[a-zA-z0-9]*@([-.]?[a-zA-z0-9])*\.[a-zA-Z]{2,4}$/;
      const isEmailPattern = emailPattern.test(email);
      if (!isEmailPattern) {
        setEmailError(true);
        setEmailErrorMessage("이메일 형식이 올바르지 않습니다.");
      }

      const isCheckedPassword = password.length >= 4;
      if (!isCheckedPassword) {
        setPasswordError(true);
        setPasswordErrorMessage("비밀번호는 4자 이상이어야 합니다.");
      }

      const isEqualsPassword = password === passwordCheck;
      if (!isEqualsPassword) {
        setPasswordCheckError(true);
        setPasswordCheckErrorMessage("비밀번호가 일치하지 않습니다.");
      }

      const hasNickname = nickname.trim().length !== 0;
      if (!hasNickname) {
        setNicknameError(true);
        setNicknameErrorMessage("닉네임을 입력해주세요.");
      }

      if (isEmailPattern && isCheckedPassword && isEqualsPassword && hasNickname) {
        const requestBody = {
          email,
          password,
          nickname,
        };
        signupRequest(requestBody).then(signupResponse);
      }
    };

    return (
      <div id="signup-card">
         <div className='signup-top'>
        <p>회원가입</p>
        </div>
        <div className="login-input-box">
        <Input
                ref={emailRef}
                label="이메일"
                placeholder="이메일을 입력하세요."
                type="text"
                error={isEmailError}
                message={emailErrorMessage}
                value={email}
                onChange={onEmailChangeHandler}
                onKeyDown={onEmailKeyDownHandler}
              />
              <Input
                ref={passwordRef}
                label="비밀번호"
                type={passwordType}
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={onPasswordChangeHandler}
                error={isPasswordError}
                message={passwordErrorMessage}
                icon={passwordButtonIcon}
                onButtonClick={onPasswordButtonClickHandler}
                onKeyDown={onPasswordKeyDownHandler}
              />

              <Input
                ref={passwordCheckRef}
                label="비밀번호 확인"
                type={passwordCheckType}
                placeholder="비밀번호를 다시 입력해주세요."
                value={passwordCheck}
                onChange={onPasswordCheckChangeHandler}
                error={isPasswordCheckError}
                message={passwordCheckErrorMessage}
                icon={passwordCheckButtonIcon}
                onButtonClick={onPasswordCheckButtonClickHandler}
                onKeyDown={onPasswordCheckKeyDownHandler}
              />
               <Input
                ref={nicknameRef}
                label="닉네임*"
                type="text"
                placeholder="닉네임을 입력해주세요."
                value={nickname}
                onChange={onNicknameChangeHandler}
                error={isNicknameError}
                message={nicknameErrorMessage}
                onKeyDown={onNicknameKeyDownHandler}
              />
          <div
            className="large-full-button"
            onClick={onSignUpButtonClickHandler}
          >
            {"회원가입"}
          </div>
          <div className="auth-bottom-box">
            <div className="auth-bottom" onClick={onLoginLinkClickHandler}>
                {"로그인"}
            </div>
        </div>
      </div>
      </div>
    )
  }
  
  
  
  return (
    <div id='auth'>
      <div className='auth-container'>
      {view === "login" ? <LoginCard /> : <SignupCard />}
      </div>
    </div>
  )
}
