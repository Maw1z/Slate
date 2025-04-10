import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

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

function SignUpPage() {
  const navigate = useNavigate();

  const handleSignup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log("User signed up:", userCredential.user);
      setAccountCreated(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        console.error("Email already in use");
        setSignUpError("Account with this email already exists.");
      } else if (error.code === "auth/internal-error") {
        console.error("Internal error");
        setSignUpError("Something went wrong. Please try again.");
      }
    }
  };

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const [signupError, setSignUpError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const verifyPassword = (e) => {
    const confirmPasswordValue = e.target.value;

    if (confirmPasswordValue != formData.password) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup(formData.email, formData.password);
  };

  return (
    <section className="font-Lex bg-secondary-background flex h-screen w-screen">
      <div
        className={`${accountCreated ? "blur-xs" : ""} bg-secondary-background flex h-screen w-screen flex-col items-center justify-center bg-[linear-gradient(to_right,#8080804D_1px,transparent_1px),linear-gradient(to_bottom,#80808090_1px,transparent_1px)] [background-size:40px_40px] bg-[15px_20px]`}
      >
        <div className="flex w-2/5 flex-col items-center gap-3">
          <h1 className="font-Lex text-4xl">Join Us!</h1>
          <Card className="w-1/2">
            <CardHeader>
              <CardTitle>Create your account</CardTitle>
              <CardDescription>
                Create an account to start capturing and organizing your
                thoughts.
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
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
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
                  <div className="mb-6 grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="confirm password">Confirm Password</Label>
                    </div>
                    <div>
                      <Input
                        id="confirm-password"
                        name="confirmPassword"
                        onChange={verifyPassword}
                        type="password"
                        required
                      />
                      {passwordsMatch && (
                        <span className="text-sm text-red-600">
                          Passwords dont match
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <CardFooter className="flex-col gap-2">
                  <Button type="submit" className="w-full">
                    Sign Up
                  </Button>
                  <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="underline underline-offset-4">
                      Login
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      {accountCreated && (
        <div className="absolute inset-0 z-10 flex w-1/4 items-center justify-center self-center justify-self-center">
          <Alert>
            <CheckCircle2Icon />
            <AlertTitle>Success! Your account has been created</AlertTitle>
            <AlertDescription>
              You will be shortly redirected to the login page
            </AlertDescription>
          </Alert>
        </div>
      )}
      {signupError && (
        <div className="absolute bottom-1/10 left-1/2 z-10 flex w-1/4 -translate-x-1/2 items-center justify-center">
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>{signupError}</AlertDescription>
          </Alert>
        </div>
      )}
    </section>
  );
}

export default SignUpPage;
