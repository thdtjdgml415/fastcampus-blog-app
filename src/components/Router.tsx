import Home from "pages/home";
import LoginPage from "pages/login";
import Posts from "pages/posts";
import PostsDetail from "pages/posts/detail";
import PostNew from "pages/posts/new";
import PorfilePage from "pages/profile";
import SignupPage from "pages/signup";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

export default function Router() {
  // firebase Auth가 인증되었으면 true로 변경해주는 로직 추가
  const [isAuthentic, setIsAutenticated] = useState<boolean>(false);
  return (
    <Routes>
      {isAuthentic ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostsDetail />} />
          <Route path="/posts/new" element={<PostNew />} />
          <Route path="/posts/edit" element={<h1>post edit Page</h1>} />
          <Route path="/profile" element={<PorfilePage />} />
          <Route path="*" element={<Navigate replace to="/"></Navigate>} />
        </>
      ) : (
        <>
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/signupPage" element={<SignupPage />} />
          <Route path="*" element={<LoginPage />} />
        </>
      )}
    </Routes>
  );
}
