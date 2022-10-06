import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const myAlert = (icon, title, text) => {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  };

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
    // cek pasword harus lebih dari 6 karakter ,mengandung hurup kapital , hurup kecil dan angka
    if (password.length < 6) {
      myAlert(
        "error",
        "Password Salah",
        "Password harus lebih dari 6 karakter"
      );
    } else if (!password.match(/[A-Z]/)) {
      myAlert(
        "error",
        "Password Salah",
        "Password harus mengandung huruf kapital"
      );
    } else if (!password.match(/[a-z]/)) {
      myAlert(
        "error",
        "Password Salah",
        "Password harus mengandung huruf kecil"
      );
    } else if (!password.match(/[0-9]/)) {
      myAlert("error", "Password Salah", "Password harus mengandung angka");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          set(ref(db, "users/" + user.uid), {
            email: email,
            password: password,
          });

          localStorage.setItem("user", JSON.stringify(user));
          myAlert("success", "Register Berhasil", "Selamat Datang");
          router.push("/dashboard");
          setEmail("");
          setPassword("");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/weak-password") {
            myAlert("error", "Password Salah", "Password terlalu lemah");
          } else if (errorCode === "auth/email-already-in-use") {
            myAlert("error", "Email Salah", "Email sudah terdaftar");
          } else {
            myAlert("error", "Error", errorMessage);
          }
        });
    }
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
              <a href="./" className="text-blue-500">
                Login
              </a>
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
