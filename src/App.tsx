import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";

export default function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOtp({ email });
    alert("驗證連結已寄出，請查收 Email！");
  };

  if (!user) {
    return (
      <div className="p-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">登入系統</h1>
        <input
          type="email"
          placeholder="請輸入 Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-3 py-2 w-full mb-4"
        />
        <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          登入 / 寄送驗證連結
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">您好，{user.email}</h1>
      <button
        onClick={() => supabase.auth.signOut()}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        登出
      </button>
    </div>
  );
}