import { collection, getDocs, query, where } from "firebase/firestore";
import { firebaseDb } from "../../lib/firebaseApp";

export default async function handler(req, res) {
  if (req.method != "POST") return res.status(404);

  let errors = [],
    data = {};

  try {
    const { slug } = JSON.parse(req.body);

    const usersRef = collection(firebaseDb, "users");

    const q = query(usersRef, where("url", "==", slug));

    const qSnapshop = await getDocs(q);

    const userData = qSnapshop.docs[0].data();
    data = {
      url: userData.url,
      firstName: userData.firstName,
      reservationLength: userData.reservationLength,
    };
  } catch (e) {
    errors.push(e.message);
  }

  res.status(200).json({ errors, data });
}
