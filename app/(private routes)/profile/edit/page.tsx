"use client";

import css from "./edit.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
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
        setUsername(user.username);
        setEmail(user.email);
        setAvatar(user.avatar);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedUser = await updateMe({ username });
    setUser(updatedUser);
    router.push("/profile");
  };

  if (loading) return <Loading />;

  return (
    <form onSubmit={handleSaveUser} className={css.form}>
      <h1>Edit Profile</h1>

      <Image src={avatar} alt="User avatar" width={120} height={120} />

      <label>
        Username:
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>

      <p>Email: {email}</p>

      <button type="submit">Save</button>
      <button type="button" onClick={() => router.push("/profile")}>
        Cancel
      </button>
    </form>
  );
}
