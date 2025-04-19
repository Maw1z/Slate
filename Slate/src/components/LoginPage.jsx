import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2Icon, AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log("User logged in:", userCredential.user);
      setLoginSuccessfull(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        console.error("Incorrect credentials");
        setLoginError("Incorrect email or password. Please try again.");
      } else {
        console.error("Login error:", error.message);
        setLoginError("Something went wrong. Please try again.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google user:", user);
    } catch (error) {
      console.error("Google login error:", error.message);
    }
  };

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loginSuccessfull, setLoginSuccessfull] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(formData.email, formData.password);
  };

  return (
    <section className="font-Lex bg-secondary-background flex h-screen w-screen">
      <div
        className={`${loginSuccessfull ? "blur-xs" : ""} bg-secondary-background flex h-screen w-screen flex-col items-center justify-center bg-[linear-gradient(to_right,#8080804D_1px,transparent_1px),linear-gradient(to_bottom,#80808090_1px,transparent_1px)] [background-size:40px_40px] bg-[15px_20px]`}
      >
        <div className="flex w-2/5 flex-col items-center gap-3">
          <h1 className="font-Lex text-4xl">Welcome Back!</h1>
          <Card className="w-1/2">
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Sign in to access your notes and start writing again.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="me@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-5 grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      {/* //TODO: Create forget password page */}
                      <Link
                        to="/"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <CardFooter className="flex-col gap-2">
                  <Button type="submit" className="mb-2 w-full">
                    Login
                  </Button>
                  <Button
                    variant="neutral"
                    className="w-full"
                    onClick={handleGoogleLogin}
                  >
                    Login with Google
                  </Button>
                  <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link to="/signup" className="underline underline-offset-4">
                      Sign up
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      {loginSuccessfull && (
        <div className="absolute inset-0 z-10 flex w-1/4 items-center justify-center self-center justify-self-center">
          <Alert>
            <CheckCircle2Icon />
            <AlertTitle>Success! Your account has been created</AlertTitle>
            <AlertDescription>
              You will be shortly redirected to the homepage
            </AlertDescription>
          </Alert>
        </div>
      )}
      {loginError && (
        <div className="absolute bottom-1/10 left-1/2 z-10 flex w-1/4 -translate-x-1/2 items-center justify-center">
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>{loginError}</AlertDescription>
          </Alert>
        </div>
      )}
    </section>
  );
}

export default LoginPage;
