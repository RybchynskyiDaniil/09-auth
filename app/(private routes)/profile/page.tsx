import Link from "next/link";
import css from "./profile.module.css";
import Image from "next/image";
import { getMeServer } from "../../../lib/api/serverApi";

export default async function Profile() {
  const user = await getMeServer();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt={`${user.username}'s avatar`}
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username} </p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
