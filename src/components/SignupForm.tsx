import React, { useState } from "react";
import { Link } from "react-router-dom";
import { app } from "firebaseApp";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

export default function SignupForm() {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("회원가입에 성공했습니다.");
    } catch (e) {
      console.error(e);
      toast.error("회원가입에 실패하셨습니다.");
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!value?.match(validRegex)) {
        setError("이메일 형식이 올바르지 않습니다.");
      } else {
        setError("");
      }
    }
    if (name === "password") {
      setPassword(value);

      if (value?.length < 8) {
        setError("비밀번호를 8자리 이상 입력해주세요.");
      } else if (passwordConfirm?.length > 0 && value !== passwordConfirm) {
        setError("비밀번호 확인 값과 같지 않습니다.");
      } else {
        setError("");
      }
    }
    if (name === "password__confirm") {
      setPasswordConfirm(value);
      if (value?.length < 8) {
        setError("비밀번호를 8자리 이상 입력해주세요.");
      } else if (value !== password) {
        setError("비밀번호와 값이 다릅니다.");
      } else {
        setError("");
      }
    }
  };
  return (
    <form action="" onSubmit={onSubmit} className="form form--lg">
      <h1 className="form__title">회원가입</h1>
      <div className="form__block">
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          name="email"
          id="email"
          required
          onChange={onChange}
        />
      </div>
      <div className="form__block">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          onChange={onChange}
        />
      </div>
      <div className="form__block">
        <label htmlFor="password__confirm">비밀번호 확인</label>
        <input
          type="password"
          name="password__confirm"
          id="password__confirm"
          onChange={onChange}
          required
        />
      </div>
      {error && error.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}
      <div className="form__block">
        계정이 이미 있으신가요?
        <Link to="/signup">로그인 하러하기</Link>
      </div>
      <div className="form__block">
        <input
          type="submit"
          value="로그인"
          className="form__btn-submit"
          disabled={error?.length > 0}
        />
      </div>
    </form>
  );
}
