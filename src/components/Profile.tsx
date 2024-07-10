import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div className="profile__box">
      <div className="flex___box-lg">
        <div className="profile__image" />
        <div>
          <div className="profile__email">@email</div>
          <div className="profile__name">송성희</div>
        </div>
      </div>
      <Link to="/" className="profile__logout">
        로그아웃
      </Link>
    </div>
  );
}
