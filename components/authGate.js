import {
  getAuth,
  isSignInWithEmailLink,
  onAuthStateChanged,
  signInWithEmailLink,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { seedProfile } from "../lib/user";

export default function AuthGate({
  loggedOutRedirect,
  loggedInRedirect,
  onUser = () => {},
}) {
  const router = useRouter();
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (!user && loggedOutRedirect) router.push(loggedOutRedirect);
    if (user && loggedInRedirect) router.push(loggedInRedirect);
    else if (user) onUser(user);
  });

  async function performLogin() {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");

      if (!email || email == "") {
        email = window.prompt("Please provide your email for confirmation");
      }

      await signInWithEmailLink(auth, email, window.location.href);

      window.localStorage.removeItem("emailForSignIn");
      await seedProfile({ email });

      router.push(loggedInRedirect);
    }
  }

  useEffect(() => {
    performLogin();
  }, []);

  return <></>;
}
