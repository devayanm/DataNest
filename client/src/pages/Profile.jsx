import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/slices/dataSlice';
import { fetchUserProfile } from '../utils/api';

const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.data.userData);
  const loading = !userData;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserProfile();
        dispatch(setUserData(data));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>User Profile</h2>
      {userData ? (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          {/* Add more user data as needed */}
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default Profile;
