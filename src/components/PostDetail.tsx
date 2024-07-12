import { Link, useNavigate, useParams } from "react-router-dom";
import { PostProps } from "./PostList";
import { useEffect, useState } from "react";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { toast } from "react-toastify";
import Comments from "./Comments";
import Loader from "./Loader";

export default function PostDetail() {
  const [post, setPost] = useState<PostProps>();
  const params = useParams();
  const navigate = useNavigate();
  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      const postData = { ...docSnap.data(), id: docSnap.id };
      setPost(postData as PostProps);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("게시글을 삭제하시겠습니까?");
    if (confirm && post) {
      await deleteDoc(doc(db, "posts", post.id));
      toast.success("게시글이 성공적으로 삭제되었습니다.");
      navigate("/");
    }
  };

  useEffect(() => {
    if (params?.id) {
      getPost(params.id);
    }
  }, []);

  return (
    <div className="post__detail">
      {post ? (
        <div className="post__box">
          <div className="post__title">{post?.title}</div>
          <div className="post__profile-box">
            <div className="post__profile" />
            <div className="post__author-name">{post?.email}</div>
            <div className="post__date">{post?.createdAt}</div>
          </div>
          <div className="post__utils-box">
            {post?.category && (
              <div className="post__category">{post?.category}</div>
            )}
            <div
              className="post__delete"
              role="presentation"
              onClick={handleDelete}
            >
              삭제
            </div>
            <div className="post__edit">
              <Link to={`/posts/edit/${post?.id}`}>수정</Link>
            </div>
          </div>

          <div className="post__text post__text--pre-wrap">{post?.content}</div>
          <Comments post={post} getPost={getPost} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
