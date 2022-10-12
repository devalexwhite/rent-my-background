import Link from "next/link";
import { useEffect, useState } from "react";
import AuthGate from "../components/authGate";
import BackgroundRenderer from "../components/backgroundRenderer";
import LoadingIndicator from "../components/loadingIndicator";
import DefaultLayout from "../layouts/default";
import { getUserLink } from "../lib/background";
import { defaultProfile, getUserProfile } from "../lib/user";

export default function DashboardPage() {
  const [user, setUser] = useState();
  const [profile, setProfile] = useState(defaultProfile);
  const [loading, setLoading] = useState(true);

  async function fetchUserProfile({ user }) {
    const profile = await getUserProfile({ user });
    if (profile) setProfile(profile);
    setLoading(false);
  }

  useEffect(() => {
    if (user) {
      setLoading(true);

      setProfile({
        ...profile,
        email: user.email,
      });

      fetchUserProfile({ user });
    }
  }, [user]);

  return (
    <DefaultLayout>
      <AuthGate loggedOutRedirect={"/login"} onUser={setUser} />

      {loading && <LoadingIndicator />}

      <div>
        <h3 className="text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
          Your virtual background
        </h3>
        <div className="mb-8 md:grid md:grid-cols-3 md:gap-6">
          <div className="mt-4 md:col-span-2">
            <label
              htmlFor="backgroundLink"
              className="block text-sm font-medium text-gray-700"
            >
              Use this link in OBS to link your background{" "}
              <Link href={"/faq#linking"}>
                <a className="text-blue-600">(read how here).</a>
              </Link>
            </label>
            <input
              type="text"
              readOnly={true}
              name="backgroundLink"
              id="backgroundLink"
              autoComplete="given-name"
              value={getUserLink({ profile })}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <p className="mb-2 text-sm font-medium text-gray-700">
          Virtual background preview:
        </p>
        <div className="w-full bg-white shadow-sm ring ring-offset-1 aspect-video">
          <BackgroundRenderer profile={profile} user={user} />
        </div>
      </div>
    </DefaultLayout>
  );
}
