import AuthContext from "context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PostForm() {
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { user } = useContext(AuthContext);
  const navigation = useNavigate();
  console.log(title, summary, content);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "posts"), {
        title: title,
        summary: summary,
        content: content,
        createAt: new Date()?.toLocaleDateString(),
        email: user?.email,
      });

      toast.success("게시글을 성공적으로 작성하셨습니다.");
      navigation("/");
    } catch (error) {
      console.error(error);
      toast.error("게시글 작성에 실패하셨습니다..");
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = e;

    if (name === "title") {
      setTitle(value);
    }
    if (name === "summary") {
      setSummary(value);
    }
    if (name === "content") {
      setContent(value);
    }
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <div className="form__block">
        <label htmlFor="title">제목</label>
        <input
          type="text"
          name="title"
          id="title"
          required
          onChange={onChange}
          value={title}
        />
      </div>
      <div className="form__block">
        <label htmlFor="summary">요약</label>
        <input
          type="text"
          name="summary"
          id="summary"
          required
          onChange={onChange}
          value={summary}
        />
      </div>
      <div className="form__block">
        <label htmlFor="content">내용</label>
        <textarea
          name="content"
          id="content"
          required
          onChange={onChange}
          value={content}
        />
      </div>
      <div className="form__block">
        <input type="submit" value="제출" className="form__btn-submit" />
      </div>
    </form>
  );
}
