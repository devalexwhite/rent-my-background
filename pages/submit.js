import { useEffect, useState } from "react";
import { RocketLaunchIcon } from "@heroicons/react/20/solid";

import ImageUploader from "../components/imageUploader";
import Logo from "../components/logo";
import Link from "next/link";
import { useRouter } from "next/router";
import { getUserInfoFromSlug } from "../lib/user";
import LoadingIndicator from "../components/loadingIndicator";
import { submitBackground } from "../lib/background";

export default function SubmitPage() {
  const router = useRouter();

  const [file, setFile] = useState();
  const [email, setEmail] = useState();
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);
  const [uploaded, setUploaded] = useState(false);

  async function fetchUserProfile(id) {
    setLoading(true);
    const info = await getUserInfoFromSlug({ slug: id });
    if (!info?.errors?.length) setProfile(info.data);

    setLoading(false);
  }

  async function onSubmit() {
    setLoading(true);
    await submitBackground({ file, userSlug: router.query.id, email });
    setLoading(false);
    setUploaded(true);
  }

  useEffect(() => {
    if (router.query.id) fetchUserProfile(router.query.id);
  }, [router]);

  return (
    <div className="relative h-full min-h-screen min-w-screen bg-gradient-to-r from-green-300 to-purple-400">
      {loading && <LoadingIndicator />}
      {!loading && !profile?.url && (
        <div className="flex flex-col items-center justify-center h-screen max-w-2xl mx-auto">
          <img src="/images/lost.svg" className="w-64 h-auto mb-16" />
          <h1 className="mb-4 text-3xl font-bold leading-8 tracking-tight text-gray-200 sm:text-4xl">
            Oh my, you seem to be lost!
          </h1>
          <Link href={"/"}>
            <a className="text-blue-100 underline">Go back to safety</a>
          </Link>
        </div>
      )}
      {!loading && profile?.url && (
        <div className="flex flex-col items-center max-w-2xl px-6 py-16 mx-auto">
          <Link href={"/"}>
            <a>
              <Logo className="w-16 h-auto mb-8" />
            </a>
          </Link>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h1 className="mb-4 text-3xl font-bold leading-8 tracking-tight text-gray-700 sm:text-4xl">
              {uploaded
                ? `Awesome, your background will show up on ${profile.firstName}'s stream!`
                : `Help out ${profile.firstName} with a rad new background!`}
            </h1>
            {!uploaded && (
              <>
                <div className="flex items-center justify-center w-full mb-8">
                  <ImageUploader file={file} onUpload={setFile} />
                </div>

                <div className="max-w-sm mb-8">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Enter your email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      placeholder="mrGoogle@theGoogles.com"
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="mb-8 text-sm text-gray-900">
                  <p>By using this service, you agree to the following:</p>
                  <ul className="pl-8 list-disc">
                    <li>
                      You will not upload obscene or offensive imagery. No
                      exceptions!
                    </li>
                    <li>You must own the rights to the image.</li>
                    <li>
                      You agree to allow Rent My Background to store and
                      publicly display your image without attribution.
                    </li>
                  </ul>
                </div>

                <div className="flex items-center justify-center w-full">
                  <button
                    onClick={onSubmit}
                    type="button"
                    disabled={!file || !email}
                    className={`inline-flex items-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                      !file || !email ? "opacity-50" : ""
                    }`}
                  >
                    <RocketLaunchIcon
                      className={`w-5 h-5 mr-3 -ml-1 ${
                        file && email && "group-hover:animate-spin"
                      }`}
                      aria-hidden="true"
                    />
                    Send It!
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
