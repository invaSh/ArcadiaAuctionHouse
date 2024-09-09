"use client";
import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  FaUser,
  FaGavel,
  FaBox,
  FaBookOpen,
  FaChevronDown,
  FaAngleRight,
  FaHandPaper,
  FaPowerOff,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaWandSparkles } from "react-icons/fa6";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Navbar() {
  return (
    <Card className="h-screen w-60 fixed p-4 shadow-xl shadow-blue-gray-900 font-syne">
      <div className="mb-2 p-4 border-b">
        <Typography variant="h5" color="blue-gray">
          Arcadia
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <MdDashboard className="h-5 w-5 mr-2" />
          </ListItemPrefix>
          Dashboard
        </ListItem>

        <Menu placement="right-start font-syne">
          <MenuHandler>
            <ListItem className="cursor-pointer flex justify-between items-center">
              <div className="flex items-center">
                <ListItemPrefix>
                  <FaUser className="h-5 w-5 mr-2" />
                </ListItemPrefix>
                Users
              </div>
              <FaChevronDown className="h-4 w-4" />
            </ListItem>
          </MenuHandler>
          <MenuList className="bg-white p-3 font-syne">
            <MenuItem className="p-2 border-b-2 text-lg flex">
              <FaAngleRight className="my-auto mr-2" />
              <Link href={`/admin/users/create`}>Create New User</Link>
            </MenuItem>
            <MenuItem className="p-2 text-lg flex">
              <FaAngleRight className="my-auto mr-2" />
              <Link href={`/admin/users/list`}>View All Users</Link>
            </MenuItem>
          </MenuList>
        </Menu>
        <Menu placement="right-start font-syne">
          <MenuHandler>
            <ListItem className="cursor-pointer flex justify-between items-center">
              <div className="flex items-center">
                <ListItemPrefix>
                  <FaGavel className="h-5 w-5 mr-2" />
                </ListItemPrefix>
                Auctions
              </div>
              <FaChevronDown className="h-4 w-4" />
            </ListItem>
          </MenuHandler>
          <MenuList className="bg-white p-3 font-syne">
            <MenuItem className="p-2 border-b-2 text-lg flex">
              <FaAngleRight className="my-auto mr-2" />
              <Link href={`/admin/auctions/create`}>Create New Auction</Link>
            </MenuItem>
            <MenuItem className="p-2 text-lg flex">
              <FaAngleRight className="my-auto mr-2" />
              <Link href={`/admin/auctions/list`}>View All Auctions</Link>
            </MenuItem>
          </MenuList>
        </Menu>

        <ListItem>
          <ListItemPrefix>
            <FaBox className="h-5 w-5 mr-2" />
          </ListItemPrefix>
          <Link href={`/admin/items/list`}>Items</Link>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <FaHandPaper className="h-5 w-5 mr-2" />
          </ListItemPrefix>
          <Link href={`/admin/bids/list`}>Bids</Link>
        </ListItem>

        <ListItem>
          <ListItemPrefix>
            <FaBookOpen className="h-5 w-5 mr-2" />
          </ListItemPrefix>
          Stories
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <FaWandSparkles className="h-5 w-5 mr-2" />
          </ListItemPrefix>
          <Link href={`/admin/banner-manager`}>Banner Manager</Link>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <FaPowerOff className="h-5 w-5 mr-2" />
          </ListItemPrefix>
          <span onClick={() => signOut({ callbackUrl: "/" })}>Log out</span>
        </ListItem>
      </List>
    </Card>
  );
}
