import { initializeApp } from "firebase/app";
import { getDatabase, update, ref } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
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
  const auth = getAuth();
  const db = getDatabase();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        update(ref(db, "users/" + user.uid), {
          email: email,
          password: password,
        });
        // ...
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <div className="flex justify-center self-center bg-stone-800 h-screen">
      <div className="w-96 h-96 bg-white my-auto rounded-md">
        <form className="flex flex-col justify-center h-full">
          <div className="flex flex-col justify-center items-center mb-7">
            <h1 className="text-2xl font-bold text-gray-800">Login</h1>
            <p className="text-gray-500">Masuk ke akun anda</p>
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
              Belum punya akun?{" "}
              <Link href="./register" className="text-blue-500">
                Daftar
              </Link>
            </p>
            <button
              type="submit"
              className="w-80 h-10 rounded-md bg-blue-500 text-white font-bold"
              onClick={(e) => handleLogin(e)}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
