"use client";
import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
function Page(): JSX.Element {
  const { user } = useAuthContext();
  const router = useRouter();

  React.useEffect(() => {
    if (user == null) router.push("/");
  }, [user]);

  return <h1>Only logged in users can view this page</h1>;
}

export default Page;
