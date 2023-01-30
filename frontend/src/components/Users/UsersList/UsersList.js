import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAction } from "../../../redux/slices/users/usersSlices";
import LoadingComponent from "../../../utils/LoadingComponent";

import UsersListHeader from "./UsersListHeader";
import UsersListItem from "./UsersListItem";

const UsersList = () => {
  const dispatch = useDispatch();

  const users = useSelector(state => state?.users);
  const { usersList, appErr, serverErr, loading, block, unblock } = users;

  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [block, unblock]);

  return (
    <>
      <UsersListHeader />
      <section class='py-8 bg-gray-100 min-h-screen'>
        {loading ? (
          <LoadingComponent />
        ) : appErr || serverErr ? (
          <h3 className='text-yellow-600 text-center text-lg'>
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
