"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserDetails, editUser } from "@/app/actions/userActions";
import Form from "@/app/components/admin/UsersForm";

export default function Edit({ params }) {
  const router = useRouter();
  const userId = params.id;

  const [user, setUser] = useState({
    fullName: "",
    username: "",
    email: "",
    role: "",
    password: "", 
    oldPassword: "", 
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const userDetails = await getUserDetails(userId);
        setUser({
            fullName: userDetails.fullName || "", // Ensure fields are never undefined
            username: userDetails.username || "",
            email: userDetails.email || "",
            role: userDetails.role || "",
            password: "",
            oldPassword: "",
        });
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Failed to load user details.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUserDetails();
  }, [userId]);

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
    { name: "role", label: "Role", type: "select", placeholder: "Role" },
    {
      name: "oldPassword",
      label: "Old Password",
      type: "password",
      placeholder: "******",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "******",
    },
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
      const response = await editUser(userId, user);
      if (response.error) {
        setError(response.error.message);
      } else {
        console.log("User updated successfully");
        setSuccess("User updated successfully!");
        router.replace(`/admin/users/details/${userId}`);
      }
    } catch (err) {
      console.error("Error updating user:", err);
      setError("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-12">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          {error && (
            <p className="text-red-500 text-center">
              {typeof error === "string" ? error : error.message}
            </p>
          )}
          {success && <p className="text-green-500 text-center">{success}</p>}
          <Form
            title="Edit User"
            fields={userFields}
            values={user}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </>
      )}
    </div>
  );
  
}
