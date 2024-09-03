"use client"
import React from "react";
import { Dropdown } from "flowbite-react";
import Link from "next/link";
import { GiColumnVase, GiPorcelainVase } from "react-icons/gi";
import { BsTagsFill } from "react-icons/bs";
import { VscSignOut } from "react-icons/vsc";
import { PiUserCircleThin } from "react-icons/pi";
import { signOut } from "next-auth/react";

function UserActions({ user }) {
    
  return (
    <Dropdown
      label={
        <div className="flex items-center drop-button text-xl font-syne">
          {user.username}
          <PiUserCircleThin
            className="mx-2 text-4xl"
            style={{ display: "block" }}
          />
        </div>
      }
      className="font-syne bg-white"
    >
      <Dropdown.Header className="flex items-center">
        <img
          src="https://img.freepik.com/free-vector/user-group-with-shadow_78370-7019.jpg?t=st=1723127117~exp=1723130717~hmac=28dee4f76e7d066d8fde8a6f3713ed0498fc5658a4254742885e7af8af99817b&w=740"
          alt="User"
          className="w-10 h-10 rounded-full mr-2"
        />
        <div>
          <span className="block text-sm">{user.name[1]}</span>
          <span className="block truncate text-sm font-medium">
            {user.email}
          </span>
        </div>
      </Dropdown.Header>
      <Dropdown.Item icon={GiPorcelainVase}>
        <Link href={`/user/items/won-list/${user.username}`}>Items Won</Link>
      </Dropdown.Item>
      <Dropdown.Item icon={GiColumnVase}>
        <Link href={`/user/items/sold-list/${user.username}`}>Items on Sale</Link>
      </Dropdown.Item>
      <Dropdown.Item icon={BsTagsFill}>
        <Link href="/user/items/create">Sell My Own</Link>
      </Dropdown.Item>
      <Dropdown.Item>
        <Link href="/session">
          <span className="block text-sm">Session</span>
        </Link>
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item
        icon={VscSignOut}
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Sign out
      </Dropdown.Item>
    </Dropdown>
  );
}

export default UserActions;
