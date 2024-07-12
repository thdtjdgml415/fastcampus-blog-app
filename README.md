```json
    "firebase": "^10.12.3",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-icons": "^5.2.1",
    "react-router-dom": "^6.24.1",
    "react-scripts": "5.0.1",
    "react-toastify": "^10.0.5",
    "typescript": "^4.4.2"
```

주요내용

- firebase를 활용한 기본적인 crud 구현
- 라우터 돔을 활용한 로그인 처리
- useContext를 활용한 전역 상태관리 처리
- 댓글 기능 추가

## 아래 문서에서 db에서 데이터를 가져와 활용 할 수 있는 방법이 존재

https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ko&authuser=0

## firebase 기본설정 방법

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/12657389-0f9c-46b5-bb62-6f11ae228c69/93affce1-696d-4f73-b1ec-7d59f8db2d3e/Untitled.png)

### 색인

**색인은 검색 엔진 데이터베이스에 웹 페이지가 등록되는 것이다.**

인덱스(index)는 매우 다양한 장면에서 사용되는 용어로, 각각 다른 의미로 사용된다. 본래 인덱스란 「색인」 「제목」등의 의미를 가지는 말이다.

데이터베이스와 관련된 장면에서 사용되는 경우에는 저장된 데이터를 보다 빨리 검색하거나 추출할 수 있도록 만들어지는 색인 데이터를 말한다.

firebase에서 조건절을 이용해 데이터를 가져오게 되면 에러가 발생해 색인을 생성하도록 하고 자동으로 생성한다.

```jsx
projects/**project-id**/databases/(default)/operations/ASA1MTAwNDQxNAgadGx1YWZlZAcSeWx0aGdpbi1zYm9qLW5pbWRhEgopEg
```

firebase에서는 데이터를 가져올때 색인을 사용해 가져오도록 한다.

기본적으로 firebase를 사용해 배포해놓은 상태입니다.

### context api

컨텍스트 api를 활용해 auth와 theme를 전역으로 사용하였습니다.

```jsx
// AuthContext
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "firebaseApp";
import { ReactNode, createContext, useEffect, useState } from "react";

interface AuthProps {
  children: ReactNode;
}

const AuthContext = createContext({ user: null as User | null });

export const AuthContextProvider = ({ children }: AuthProps) => {
  const auth = getAuth(app);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(user);
      }
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

```

```jsx
// theme context
import { ReactNode, createContext, useState } from "react";

const ThemeContext = createContext({
  theme: "light",
  toggleMode: () => {},
});

interface ThemePorps {
  children: ReactNode;
}
export const ThemeContextProvider = ({ children }: ThemePorps) => {
  const [theme, setTheme] = useState(
    window.localStorage.getItem("theme") || "light"
  );

  const toggleMode = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    window.localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
```
