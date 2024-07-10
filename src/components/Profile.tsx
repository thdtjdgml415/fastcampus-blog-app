import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Profile() {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const onSignOut = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);
      toast.success("로그아웃 되었습니다.");
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.code);
    }
  };

  return (
    <div className="profile__box">
      <div className="flex___box-lg">
        <div className="profile__image" />
        <div>
          <div className="profile__email">{auth?.currentUser?.email}</div>
          <div className="profile__name">
            {auth.currentUser?.displayName || "인증되지 않은 사용자"}
          </div>
        </div>
      </div>
      <div role="presentation" className="profile__logout" onClick={onSignOut}>
        로그아웃
      </div>
    </div>
  );
}
