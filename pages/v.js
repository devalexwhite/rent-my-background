import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import LoadingIndicator from "../components/loadingIndicator";
import BackgroundRenderer from "../components/backgroundRenderer";
import { getUserInfoFromSlug, getUserProfile } from "../lib/user";
import { cleanupBackgrounds, getBackground } from "../lib/background";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firebaseDb } from "../lib/firebaseApp";

export default function VPage() {
  const router = useRouter();

  const [slug, setSlug] = useState();
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);
  const [bgUrl, setBgUrl] = useState(null);
  const [uploader, setUploader] = useState(null);

  async function fetchUserProfile(id) {
    setLoading(true);
    const info = await getUserInfoFromSlug({ slug: id });
    setProfile(info.data);

    setLoading(false);
  }

  async function fetchBackground(profile) {
    const background = await getBackground({ profile });

    setBgUrl(background?.url);
    setUploader(background?.uploader);
  }

  async function runCleanup(profile) {
    cleanupBackgrounds({ profile });
  }

  useEffect(() => {
    if (profile?.url) {
      fetchBackground(profile, setBgUrl, setUploader);
      runCleanup(profile);
      setInterval(() => {
        fetchBackground(profile, setBgUrl, setUploader);
        runCleanup(profile);
      }, 10000);
    }
  }, [profile]);

  useEffect(() => {
    if (router.query.id) fetchUserProfile(router.query.id);
  }, [router]);

  return (
    <div className="relative w-screen h-screen">
      {loading && <LoadingIndicator />}
      {!loading && (
        <BackgroundRenderer
          background={bgUrl}
          uploader={uploader}
          qrSize={300}
          profile={profile}
        />
      )}
    </div>
  );
}
