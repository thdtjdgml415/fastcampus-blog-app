import AuthContext from "context/AuthContext";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export interface PostProps {
  id: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createdAt: string;
  uid: string;
  updatedAt: string;
  category: CategoryType;
}

interface PostListProps {
  hasNavigation?: boolean;
  defaultTap?: TabType | CategoryType;
}
type TabType = "all" | "my";

export type CategoryType = "Frontend" | "Backend" | "Web" | "Native";
export const CATEGORYS: CategoryType[] = [
  "Frontend",
  "Backend",
  "Web",
  "Native",
];

export default function PostList({
  hasNavigation = true,
  defaultTap = "all",
}: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(
    defaultTap
  );
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);

  const getPosts = async () => {
    setPosts([]);
    let postsRef = collection(db, "posts");
    let postsQuery;
    if (activeTab === "my" && user) {
      // 나의 글만 필터링
      postsQuery = query(
        postsRef,
        where("uid", "==", user?.uid),
        orderBy("createdAt", "asc")
      );
    } else if (activeTab === "all" && user) {
      // 모든 글 보여주기
      postsQuery = query(postsRef, orderBy("createdAt", "asc"));
    } else {
      // 카테고리 글 보여주기
      postsQuery = query(
        postsRef,
        where("category", "==", activeTab),
        orderBy("createdAt", "asc")
      );
    }

    const datas = await getDocs(postsQuery);
    const newPosts = datas.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id,
        } as PostProps)
    );

    setPosts(newPosts);
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("게시글을 삭제하시겠습니까?");
    if (confirm && id) {
      await deleteDoc(doc(db, "posts", id));
      toast.success("게시글이 성공적으로 삭제되었습니다.");
      getPosts();
    }
  };

  useEffect(() => {
    getPosts();
  }, [activeTab]);

  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div
            role="presentation"
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "post__navigation--active" : ""}
          >
            전체
          </div>
          <div
            role="presentation"
            onClick={() => setActiveTab("my")}
            className={activeTab === "my" ? "post__navigation--active" : ""}
          >
            나의 글
          </div>
          {CATEGORYS.map((category) => {
            return (
              <div
                key={category}
                role="presentation"
                onClick={() => setActiveTab(category)}
                className={
                  activeTab === `${category}` ? "post__navigation--active" : ""
                }
              >
                {category}
              </div>
            );
          })}
        </div>
      )}

      {posts.length > 0 ? (
        <div className="post__list">
          {posts.map((post) => (
            <div key={post.id} className="post__box">
              <Link to={`/posts/${post.id}`}>
                <div className="post__profile-box">
                  <div className="post__profile" />
                  <div className="post__author-name">{post.email}</div>
                  <div className="post__date">{post.createdAt}</div>
                </div>
                <div className="post__title">{post.title}</div>
                <div className="post__text">{post.summary}</div>
              </Link>
              {post.email === user?.email && (
                <div className="post__utils-box">
                  <button onClick={() => handleDelete(post.id)}>삭제</button>
                  <Link to={`/posts/edit/${post.id}`}>수정</Link>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="post__list">
          <div className="post__no-post">게시글이 존재하지 않습니다.</div>
        </div>
      )}
    </>
  );
}
