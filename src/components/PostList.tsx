import { Link } from "react-router-dom";
interface PostListProps {
  hasNavigation?: boolean;
}
export default function PostList({ hasNavigation = true }: PostListProps) {
  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div className="post__navigation-active">전체</div>
          <div className="">나의 글</div>
        </div>
      )}

      <div className="post__list">
        {[...Array(10)].map((e, index) => {
          return (
            <div key={index} className="post__box">
              <Link to={`/posts/${index}`}>
                <div className="post__profile-box">
                  <div className="post__profile" />
                  <div className="post__author-name">패스트캠퍼스</div>
                  <div className="post__date">2024-07-10 수요일</div>
                </div>
                <div className="post__title">게시글 {index}</div>
                <div className="post__text">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
                  dolor sit amet, consectetur, adipisci velit, sed quia non
                  numquam eius modi tempora incidunt ut labore et dolore magnam
                  aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
                  nostrum exercitationem ullam corporis suscipit laboriosam,
                  nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum
                  iure reprehenderit qui in ea voluptate velit esse quam nihil
                  molestiae consequatur, vel illum qui dolorem eum fugiat quo
                  voluptas nulla pariatur?"
                </div>
                <div className="post__utils-box">
                  <div className="post__delete">삭제</div>
                  <div className="post__edit">수정</div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
