"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/app/actions/userActions";
import Form from "@/app/components/admin/UsersForm";

export default function Create() {
  const router = useRouter();
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    email: "",
    role: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const userFields = [
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      placeholder: "Full Name",
    },
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Username",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "email@example.com",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "******",
    },
    { name: "role", label: "Role", type: "select", placeholder: "Role" },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      console.log("-->user", user);
      const response = await createUser(user);
      if (response.error) {
        setError(response.error.message);
      } else {
        console.log("User created successfully");
        setSuccess("User created successfully!");
        router.replace(`/admin/users/details/${response.userId}`);
      }
    } catch (err) {
      console.error("Error creating user:", err);
      setError("Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-12">
      {loading && <p className="text-center">Loading...</p>}
      {error && (
        <p className="text-red-500 text-center">
          {typeof error === "string" ? error : error.message}
        </p>
      )}
      {success && <p className="text-green-500 text-center">{success}</p>}
      <Form
        title="Create User"
        fields={userFields}
        values={user}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
