import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const firebaseConfig = {
    apiKey: "AIzaSyCqcF-IovC9aIcFcz3uzSl5a38RFQdrAvk",
    authDomain: "dims-d867f.firebaseapp.com",
    projectId: "dims-d867f",
    storageBucket: "dims-d867f.appspot.com",
    messagingSenderId: "1098008483419",
    appId: "1:1098008483419:web:30b29d7be90d102220517e",
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const auth = getAuth();

  const handleRegister = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        set(ref(db, "users/" + user.uid), {
          email: email,
          password: password,
        });
        alert("Register Success");
        router.push("/dashboard");
        setEmail("");
        setPassword("");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/weak-password") {
          alert("The password is too weak.");
        } else if (errorCode === "auth/email-already-in-use") {
          alert("Email already in use");
        } else {
          alert(errorMessage);
        }
      });
  };

  return (
    <div className="flex justify-center self-center bg-stone-800 h-screen">
      <div className="w-96 h-96 bg-white my-auto rounded-md">
        <form className="flex flex-col justify-center h-full">
          <div className="flex flex-col justify-center items-center mb-7">
            <h1 className="text-2xl font-bold text-gray-800">Register</h1>
            <p className="text-gray-500">Silahkan Daftar Kan Email</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
            <input
              type="email"
              placeholder="Email"
              className="w-80 h-10 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-80 h-10 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p>
              Sudah punya akun?{" "}
              <Link href="/" className="text-blue-500">
                Login
              </Link>
            </p>
            <button
              type="submit"
              className="w-80 h-10 rounded-md bg-blue-500 text-white font-bold"
              onClick={(e) => handleRegister(e)}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
