import { useState } from "react";

import LogoImage from "../components/logoImage";
import AuthGate from "../components/authGate";
import { createUser, sendLoginLink } from "../lib/user";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

export default function SignupPage() {
  const [email, setEmail] = useState("");

  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();

    try {
      await sendLoginLink({ email });
      router.push("/login-confirmation");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        <title>Rent my Background!</title>
        <meta
          name="description"
          content="Rent out your Twitch, Teams & Zoom virtual backgrounds!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen">
        <AuthGate loggedInRedirect={"/dashboard"} />
        <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="w-full max-w-sm mx-auto lg:w-96">
            <div>
              <Link href={"/"}>
                <a>
                  <LogoImage className="w-auto h-16" />
                </a>
              </Link>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                Start renting out your virtual background!
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Join the background revolution, or access your account by
                entering your email.
              </p>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      onClick={onSubmit}
                      className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Let's go!
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex-1 hidden w-0 lg:block">
          <img
            className="absolute inset-0 object-contain w-full h-full"
            src="/images/screenshot-1.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
