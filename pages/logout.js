import { getAuth, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function LogoutPage() {
  const auth = getAuth();
  const router = useRouter();

  async function signout() {
    await signOut(auth);
    router.push("/");
  }

  useEffect(() => {
    signout();
  }, []);

  return <></>;
}
