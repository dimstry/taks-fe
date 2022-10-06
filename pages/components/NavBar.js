import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logout from "../../public/logout.svg";
import Avatar from "../../public/avatar.svg";
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const firebaseConfig = {
    apiKey: "AIzaSyCqcF-IovC9aIcFcz3uzSl5a38RFQdrAvk",
    authDomain: "dims-d867f.firebaseapp.com",
    projectId: "dims-d867f",
    storageBucket: "dims-d867f.appspot.com",
    messagingSenderId: "1098008483419",
    appId: "1:1098008483419:web:30b29d7be90d102220517e",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // log out firebase
  const handleLogout = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert("Logout Success");
        router.push("/");
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  return (
    <div className="h-20 w-screen bg-gradient-to-r from-sky-500 to-indigo-500 flex justify-center self-center">
      {/* navbar kiri */}
      <div className="flex items-center w-11/12">
        <div className="w-1/4 h-full flex justify-start items-center">
          <div className="w-3/4 h-3/4 rounded-md flex justify-center items-center">
            {/* navbar home dan projeck */}
            <Link href="/">
              <a className="text-gray-50 font-bold text-xl mr-10">Home</a>
            </Link>
            <Link href="/project">
              <a className="text-gray-50 font-bold text-xl">Project</a>
            </Link>
          </div>
        </div>
        {/* navbar kanan */}
        <div className="w-3/4 h-full flex justify-end items-center">
          <div className="h-3/4 rounded-md flex justify-center items-center gap-6">
            {/* img next js user */}
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
