import { Link, useNavigate } from "react-router-dom";
import logoImage from "../assets/lws-logo-light.svg";
import Error from "./../components/ui/Error";
import { useEffect, useState } from "react";
import { useRegisterMutation } from "../features/auth/authApi";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [register, { data, isLoading, error: responseError }] =
    useRegisterMutation();

  const handleRegister = (e) => {
    e.preventDefault();

    setError("");

    if (confirmPassword !== password) {
      setError("Password did not match");
    } else {
      register({ name, email, password });
    }
  };

  useEffect(() => {
    if (responseError?.data) {
      setError(responseError.data);
    }
    if (data?.accessToken && data?.user) {
      navigate("/inbox");
    }
  }, [data, responseError, navigate]);

  return (
    <div className="grid place-items-center h-screen bg-slate-200">
      <div className="bg-slate-100 min-h-fit flex items-center justify-center rounded-sm py-12 px-6 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-xl w-full space-y-8">
          <div>
            <Link to="/">
              <img
                className="mx-auto h-12 w-auto"
                src={logoImage}
                alt="Learn with sumit"
              />
            </Link>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
              Create your account
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            method="POST"
            onSubmit={handleRegister}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  id="name"
                  name="Name"
                  type="Name"
                  autoComplete="Name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-slate-500 text-slate-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-confirmPassword"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-slate-500 text-slate-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="agree"
                  name="agree"
                  type="checkbox"
                  className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-slate-300 rounded"
                  required
                  checked={agree}
                  onChange={(e) => setAgree(e.target.value)}
                />
                <label
                  htmlFor="accept-terms"
                  className="ml-2 block text-sm text-slate-900"
                >
                  Agreed with the terms and condition
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p>Already have an Account?</p>
              <div className="text-sm">
                <Link
                  to="/"
                  className="font-medium text-violet-600 hover:text-violet-500"
                >
                  Log In
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                Sign up
              </button>
            </div>

            {error !== "" && <Error message={error} />}
          </form>
        </div>
      </div>
    </div>
  );
}
