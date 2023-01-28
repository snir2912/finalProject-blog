import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAction } from "../../../redux/slices/users/usersSlices";

import UsersListHeader from "./UsersListHeader";
import UsersListItem from "./UsersListItem";

const UsersList = () => {
  //dispatch
  const dispatch = useDispatch();
  //fetch all users
  useEffect(() => {
    dispatch(fetchUsersAction());
  }, []);
  //data from store
  const users = useSelector(state => state?.users);
  const { usersList, appErr, serverErr, loading } = users;
  return (
    <>
      <section class='py-8 bg-gray-900 min-h-screen'>
        {loading ? (
          <h1>Loading</h1>
        ) : appErr || serverErr ? (
          <h3>
            {serverErr} {appErr}
          </h3>
        ) : usersList?.length <= 0 ? (
          <h2>No User Found</h2>
        ) : (
          usersList?.map(user => (
            <>
              <UsersListItem user={user} />
            </>
          ))
        )}
      </section>
    </>
  );
};

export default UsersList;
