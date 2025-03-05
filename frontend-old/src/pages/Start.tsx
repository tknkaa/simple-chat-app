import { User } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";

interface StartProps {
  loading: boolean;
  user: User | null;
}

export default function Start(props: StartProps) {
  const navigate = useNavigate();
  return (
    <>
      {props.loading ? (
        <div>Loading</div>
      ) : (
        <>
          {props.user !== null ? (
            <Navigate to="/chat" />
          ) : (
            <>
              <button onClick={() => navigate("/login")}>ログイン</button>
              <button onClick={() => navigate("/signup")}>サインアップ</button>
            </>
          )}
        </>
      )}
    </>
  );
}
