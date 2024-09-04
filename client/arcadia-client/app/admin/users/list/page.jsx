import React from 'react';
import { getUsers } from '@/app/actions/userActions';
import Link from 'next/link';

async function List() {
  const users = await getUsers();

  return (
    <div className="overflow-x-auto p-12">
      <h2 className="text-center text-4xl text-gray-500 my-12">All Users</h2>
      <table className="w-full min-w-max text-left border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-gray-600">Image</th>
            <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-gray-600">Username</th>
            <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-gray-600">Email</th>
            <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-gray-600">Full Name</th>
            <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="bg-white hover:bg-gray-50">
              <td className="px-4 py-3 border-b border-gray-200">
                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Avatar" className="h-10 w-10 rounded-full" />
              </td>
              <td className="px-4 py-3 border-b border-gray-200">{user.userName}</td>
              <td className="px-4 py-3 border-b border-gray-200">{user.email}</td>
              <td className="px-4 py-3 border-b border-gray-200">{user.fullName}</td>
              <td className="px-4 py-3 border-b border-gray-200">
                <Link href={`/admin/users/details/${user.id}`} className="text-gray-600 text-hover">View More</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;
