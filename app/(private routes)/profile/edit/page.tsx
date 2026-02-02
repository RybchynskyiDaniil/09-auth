"use client";
import css from "./edit.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../../../lib/store/authStore";
import { getMe, updateMe } from "../../../../lib/api/clientApi";
import Loading from "../../../loading";
export default function EditPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getMe();
        if (user) {
          setUsername(user.username ?? "");
          setEmail(user.email ?? "");
          setAvatar(user.avatar ?? "");
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSaveUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload = { username, email };
      const updatedUser = await updateMe(payload);

      setUser(updatedUser);

      router.push("/profile");
    } catch (error) {
      console.error("Update profile error:", error);
    }
  };

  const handleCancel = () => router.push("/profile");

  if (loading) return <Loading />;
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input id="username" type="text" className={css.input} />
          </div>

          <p>Email: user_email@example.com</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
