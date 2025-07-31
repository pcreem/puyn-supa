import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthCallback from "./pages/AuthCallback.tsx";
import type { User } from "@supabase/supabase-js";

// LoginPage Component
type LoginPageProps = {
  onEmailChange: (email: string) => void;
  onLogin: () => void;
  email: string;
};

function LoginPage({ onEmailChange, onLogin, email }: LoginPageProps) {
  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">登入系統</h1>
      <input
        type="email"
        placeholder="請輸入 Email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        className="border rounded px-3 py-2 w-full mb-4"
      />
      <button
        onClick={onLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        登入 / 寄送驗證連結
      </button>
    </div>
  );
}

// Dashboard Component
type DashboardProps = {
  user: User;
};

function Dashboard({ user }: DashboardProps) {
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

// App Component
export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOtp({ email });
    alert("驗證連結已寄出，請查收 Email！");
  };

  return (
    <Router>
      <Routes>
        <Route path="/auth-callback" element={<AuthCallback />} />
        <Route
          path="/"
          element={
            user ? (
              <Dashboard user={user} />
            ) : (
              <LoginPage
                email={email}
                onEmailChange={setEmail}
                onLogin={handleLogin}
              />
            )
          }
        />
      </Routes>
    </Router>
  );
}
