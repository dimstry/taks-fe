import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logout from "../../public/logout.svg";
import Avatar from "../../public/avatar.svg";
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function NavBar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

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
  const auth = getAuth(app);

  // alert confirm logout
  const myAlert = (display) => {
    Swal.fire({
      title: "Yakin?",
      text: "Kamu yakin ingin logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yess!",
    }).then((result) => {
      // jika iya
      if (result.isConfirmed) {
        signOut(auth)
          .then(() => {
            localStorage.removeItem("user");
            router.push("/");
          })
          .catch((error) => {
            alert(error);
          });
      }
    });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    myAlert();
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  return (
    <div className="h-20 bg-gradient-to-r from-sky-500 to-indigo-500 flex justify-center self-center">
      {/* navbar */}
      <div className="flex items-center w-11/12 ">
        <div className="w-1/4 h-full  justify-start items-center hidden md:flex">
          <div className="w-3/4 h-3/4 rounded-md flex justify-center items-center">
            {/* navbar home dan projeck */}
            <Link href="/dashboard">
              <a className="text-gray-50 font-bold text-xl mr-10">Home</a>
            </Link>
            <Link href="/dashboard">
              <a className="text-gray-50 font-bold text-xl hidden md:block">
                Project
              </a>
            </Link>
          </div>
        </div>
        {/* navbar kanan */}
        <div className="w-screen h-full flex justify-end items-center md:w-3/4">
          <div className="h-3/4 rounded-md flex justify-center items-center gap-6">
            {/* img user */}
            <Image src={Avatar} alt="user" width={50} height={50} />
            <p className="font-bold text-gray-50">
              Halo, {user ? user.email : "User"}
            </p>
          </div>
          {/* logout button icon */}
          <div className="flex justify-center items-center mx-3">
            <a
              className="text-gray-500 font-bold text-xl flex justify-center items-center cursor-pointer"
              onClick={(e) => handleLogout(e)}
            >
              <Image src={Logout} alt="logout" width={35} height={35} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
