import { firebaseDb, firebaseAuth } from "./firebaseApp";
import { sendSignInLinkToEmail } from "firebase/auth";
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import randomWords from "random-words";

const actionCodeSettings = {
  url: process.env.NEXT_PUBLIC_EMAIL_SIGNUP_LINK,
  handleCodeInApp: true,
};

export const defaultProfile = {
  name: "",
  queueOpen: false,
  reservationLength: 10,
  domainPrivacy: "closedDomain",
  url: randomWords({ exactly: 3, join: "-" }),
};

export async function sendLoginLink({ email }) {
  try {
    await sendSignInLinkToEmail(firebaseAuth, email, actionCodeSettings);

    window.localStorage.setItem("emailForSignIn", email);
  } catch (error) {
    console.log(error);
  }
}

export async function seedProfile({ email }) {
  const profile = await getUserProfile({ user: { email } });
  if (!profile) {
    updateUserProfile({ user: { email }, data: defaultProfile });
  }
}

export async function getUserProfile({ user }) {
  const { email } = user;
  const docRef = doc(firebaseDb, "users", email);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) return docSnap.data();
  else return null;
}

export async function getUserInfoFromSlug({ slug }) {
  const response = await fetch("/api/userInfoFromSlug", {
    method: "POST",
    body: JSON.stringify({
      slug,
    }),
  });
  return await response.json();
}

export async function updateUserProfile({ user, data }) {
  const { email } = user;
  const docRef = doc(firebaseDb, "users", email);
  await setDoc(docRef, data, { merge: true });

  return await getUserProfile({ user });
}
