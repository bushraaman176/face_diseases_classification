import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

declare global {
  interface Window {
    google: any;
  }
}

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }

    // Initialize Google Sign-In
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || "",
        callback: handleGoogleSignIn,
      });
    }
  }, [navigate]);

  const handleGoogleSignIn = async (response: any) => {
    setGoogleLoading(true);
    try {
      const token = response.credential;

      // Send token to backend
      const backendResponse = await fetch(`${API_URL}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await backendResponse.json();

      if (!backendResponse.ok) {
        throw new Error(data.detail || "Google login failed");
      }

      // Store user data
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.id,
          email: data.email,
          name: data.name,
        })
      );

      toast({
        title: "Success",
        description: data.message,
      });

      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Google login failed",
        variant: "destructive",
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isLogin ? "/login" : "/signup";
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Authentication failed");
      }

      // Store user data in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.id,
          email: data.email,
          name: data.name,
        })
      );

      toast({
        title: "Success",
        description: data.message,
      });

      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">DermAI</h1>
            <p className="text-muted-foreground text-sm">
              {isLogin
                ? "Welcome back to your skincare journey"
                : "Start your personalized skincare journey"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Full Name
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required={!isLogin}
                  className="w-full"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Email Address
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Password
              </label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 rounded-lg transition-all duration-200 mt-6"
            >
              {loading
                ? "Loading..."
                : isLogin
                ? "Sign In"
                : "Create Account"}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 border-t border-border"></div>
            <span className="text-sm text-muted-foreground font-medium">or</span>
            <div className="flex-1 border-t border-border"></div>
          </div>

          {/* Google Login Button */}
          {/* <div id="google-signin-btn">
            <button
              type="button"
              onClick={() => {
                if (window.google) {
                  window.google.accounts.id.renderButton(
                    document.getElementById("google-signin-btn") || document.body,
                    {
                      type: "standard",
                      size: "large",
                      text: "continue_with",
                      locale: "en_US",
                    }
                  );
                }
              }}
              disabled={googleLoading}
              className="w-full border border-border hover:bg-accent bg-card text-foreground font-semibold py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.25 3.52 9.7 8.26 11.15-.1-.88-.18-2.24.04-3.2.2-.87 1.3-5.55 1.3-5.55s-.33-.67-.33-1.66c0-1.56.9-2.72 2.04-2.72 1.07 0 1.59.8 1.59 1.76 0 1.07-.68 2.68-.68 2.68s.66 2.36 1.3 2.36c1.56 0 2.77-1.64 2.77-4 0-2.09-1.5-3.66-3.64-3.66-2.48 0-3.94 1.86-3.94 3.77 0 .75.29 1.55.65 1.98.07.09.08.17.06.26-.07.28-.22.92-.25 1.05-.04.16-.12.2-.28.12-1.56-.77-2.53-3.2-2.53-5.15 0-2.73 1.99-5.24 5.73-5.24 3.01 0 5.35 2.15 5.35 5.02 0 2.99-1.88 5.4-4.5 5.4-.88 0-1.71-.46-1.99-1 0 0-.44 1.68-.54 2.05-.2.75-.73 1.7-1.09 2.27 1.32.37 2.77.57 4.26.57 6.63 0 12-5.37 12-12S18.63 0 12 0z"
                />
              </svg>
              {googleLoading ? "Connecting..." : "Continue with Google"}
            </button>
          </div> */}

          {/* Toggle Auth Mode */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({ email: "", password: "", name: "" });
                }}
                className="text-primary font-semibold hover:text-primary/80 transition-colors"
              >
                {isLogin ? "Sign up here" : "Sign in here"}
              </button>
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-muted-foreground text-xs mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
