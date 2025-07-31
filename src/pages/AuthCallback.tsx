import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      const { error } = await supabase.auth.getSessionFromUrl(); // ✅ 正確方法

      if (error) {
        console.error("登入回調失敗：", error.message);
        alert("登入失敗：" + error.message);
      } else {
        console.log("登入成功");
        navigate("/"); // ✅ 登入成功後導回首頁
      }
    };

    handleAuthRedirect();
  }, [navigate]);

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold">登入中，請稍候...</h1>
    </div>
  );
}
