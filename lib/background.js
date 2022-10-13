import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { firebaseDb, firebaseStorage } from "./firebaseApp";
import * as QRCode from "qrcode";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

export function getUserLink({ profile }) {
  return process.env.NEXT_PUBLIC_BACKGROUND_RENDERER_LINK.replace(
    "[SWAP]",
    profile.url
  );
}

export function getUserSubmissionLink({ profile }) {
  return process.env.NEXT_PUBLIC_BACKGROUND_SUBMISSION_LINK.replace(
    "[SWAP]",
    profile.url
  );
}

export async function generateQRImageDataURL({ profile, width, height }) {
  const canvas = document.createElement("canvas");

  return new Promise((res, rej) => {
    QRCode.toCanvas(
      canvas,
      getUserSubmissionLink({ profile }),
      {
        width,
        height,
        light: "#0000",
      },
      (error) => {
        if (error) rej(error);
        else res(canvas.toDataURL("image/png"));
      }
    );
  });
}

export async function submitBackground({ file, userSlug, email }) {
  const fileRef = ref(
    firebaseStorage,
    `${userSlug}/${new Date().valueOf()}-${file.name}`
  );

  const snapshot = await uploadBytes(fileRef, file);

  const collectionRef = collection(firebaseDb, "backgrounds");
  await addDoc(collectionRef, {
    uploaded: serverTimestamp(),
    path: snapshot.ref.fullPath,
    uploader: email,
    targetSlug: userSlug,
  });
}

export async function getBackground({ profile }) {
  const backgroundsRef = collection(firebaseDb, "backgrounds");
  const q = query(backgroundsRef, where("targetSlug", "==", profile.url));
  const qSnapshot = await getDocs(q);

  if (!qSnapshot.docs.length) return null;

  const bg = qSnapshot.docs[qSnapshot.docs.length - 1].data();
  if (bg && bg.useTimestamp == null) {
    await setDoc(
      qSnapshot.docs[qSnapshot.docs.length - 1].ref,
      {
        useTimestamp: serverTimestamp(),
      },
      { merge: true }
    );
  }

  if (!bg) return null;

  const url = await getDownloadURL(ref(firebaseStorage, bg.path));
  return {
    url,
    uploader: bg.uploader,
  };
}

export async function cleanupBackgrounds({ profile }) {
  try {
    const expirationTime = new Date(
      new Date().valueOf() - 1000 * profile.reservationLength
    );
    const backgroundsRef = collection(firebaseDb, "backgrounds");
    const q = query(
      backgroundsRef,
      where("targetSlug", "==", profile.url),
      where("useTimestamp", "!=", false),
      where("useTimestamp", "<", expirationTime)
    );
    const qSnapshot = await getDocs(q);

    qSnapshot.forEach(async (doc) => {
      const data = doc.data();

      const deleteFileRef = ref(firebaseStorage, data.path);
      await deleteObject(deleteFileRef);

      await deleteDoc(doc.ref);
    });
  } catch (e) {
    console.error(e);
  }
}
