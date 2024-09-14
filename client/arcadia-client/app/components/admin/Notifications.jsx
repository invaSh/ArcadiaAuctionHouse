'use client';
import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { getNotifs, viewedSet } from '@/app/actions/dashboardActions';
import Link from 'next/link';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [newNotifications, setNewNotifications] = useState([]);
  const [viewedNotifications, setViewedNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:6001/notifications')
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connection
      .start()
      .then(() => {
        console.log('Connected to SignalR hub!');

        connection.on('bidplaced', (message) => {
          setNotifications((prevNotifications) => [
            ...prevNotifications,
            `${message}`,
          ]);
        });

        connection.on('auctionfinished', (message) => {
          setNotifications((prevNotifications) => [
            ...prevNotifications,
            `${message}`,
          ]);
        });
      })
      .catch((error) => console.error('SignalR connection failed: ', error));

    return () => {
      connection.stop();
    };
  }, []);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const notifications = await getNotifs();
        setNewNotifications(notifications.filter((n) => !n.viewed));
        setViewedNotifications(notifications.filter((n) => n.viewed));
      } catch (e) {
        console.error('--->Error fetching notifications', e);
      } finally {
        setLoading(false); // Ensure loading is set to false regardless of success or failure
      }
    }

    fetchNotifications();
  }, []);

  async function handleClick(id) {
    try {
      await viewedSet(id); // Pass the notification id
      console.log('Notification marked as viewed');
    } catch (e) {
      console.error('---->Error marking notification as viewed', e);
    }
  }

  if (loading) {
    return (
      <div className="text-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h3 className="text-2xl my-12 text-center font-semibold">
        New Notifications
      </h3>
      <div>
        <ul className="space-y-4">
          {notifications
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((notification, index) => (
              <li
                key={index}
                className="bg-blue-50 border-l-4 border-yellow-500 p-4 shadow-md rounded-lg"
              >
                <p className="text-yellow-700 font-semibold">{notification}</p>
                <small className="text-gray-500">
                  Received: {new Date().toLocaleString()}
                </small>
              </li>
            ))}
          {newNotifications.length === 0 ? (
            <li className="text-gray-500">No new notifications</li>
          ) : (
            newNotifications.map((notification, index) => (
              <li
                key={index}
                className="bg-blue-50 border-l-4 border-blue-500 p-4 shadow-md rounded-lg flex justify-between"
              >
                <div>
                  <p className="text-blue-700 font-semibold">
                    {notification.message}
                  </p>
                  <small className="text-gray-500">
                    Received:{' '}
                    {new Date(notification.createdAt).toLocaleString()}
                  </small>
                </div>
                <div>
                  {notification.eventType === 'BidPlaced' ? (
                    <Link
                      href={`/admin/bids/list`}
                      className="text-hover"
                      onClick={() => handleClick(notification.id)} // Use a function reference
                    >
                      View more
                    </Link>
                  ) : (
                    <Link
                      href={`/admin/auctions/list`}
                      className="text-hover"
                      onClick={() => handleClick(notification.id)} // Use a function reference
                    >
                      View more
                    </Link>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Viewed Notifications</h3>
        <ul className="space-y-4">
          {viewedNotifications.length === 0 ? (
            <li className="text-gray-500">No viewed notifications</li>
          ) : (
            viewedNotifications.map((notification, index) => (
              <li
                key={index}
                className="bg-gray-100 border-l-4 border-gray-500 p-4 shadow-sm rounded-lg"
              >
                <p className="text-gray-700 font-semibold">
                  {notification.message}
                </p>
                <small className="text-gray-400">
                  Viewed: {new Date(notification.createdAt).toLocaleString()}
                </small>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default Notifications;
