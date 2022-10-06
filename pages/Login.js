import { initializeApp } from "firebase/app";
import { getDatabase, update, ref } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const firebaseConfig = {
    apiKey: "AIzaSyCvlGQMM9cqSDfZzbbahlOhAcxjhCB3ORo",
    authDomain: "login-5c258.firebaseapp.com",
    databaseURL: "https://login-5c258-default-rtdb.firebaseio.com",
    projectId: "login-5c258",
    storageBucket: "login-5c258.appspot.com",
    messagingSenderId: "286389018438",
    appId: "1:286389018438:web:c04d89abb3940076d1cf47",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = getDatabase();

  const myAlert = (icon, title, text) => {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  };

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
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          myAlert(
            "error",
            "Password Salah",
            "Password yang anda masukkan salah"
          );
        } else if (errorCode === "auth/user-not-found") {
          myAlert("error", "Email Salah", "Email yang anda masukkan salah");
        }
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
              <a href="./register" className="text-blue-500">
                Daftar
              </a>
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
