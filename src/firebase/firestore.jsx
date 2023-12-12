
import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "./firebase";

const db = getFirestore(app);
const formDataCollection = collection(db, "formData");

export { formDataCollection };
