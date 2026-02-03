import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import css from "./profile.module.css";
import { getMeServer } from "../../../lib/api/serverApi";

export const metadata: Metadata = {
  title: "Profile",
  description: "User profile page",
};

export default async function Profile() {
  const user = await getMeServer();

  return (
    <div className={css.container}>
      <h1 className={css.title}>Profile Page</h1>

      <Link href="/profile/edit" className={css.editProfileButton}>
        Edit Profile
      </Link>

      <Image
        src={user.avatar}
        alt={`${user.username}'s avatar`}
        width={120}
        height={120}
        className={css.avatar}
      />

      <p className={css.username}>Username: {user.username}</p>
      <p className={css.email}>Email: {user.email}</p>
    </div>
  );
}
