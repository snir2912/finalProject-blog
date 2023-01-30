import React from "react";
import { Link, useHistory } from "react-router-dom";
import { MailIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  blockUserAction,
  unBlockUserAction,
} from "../../../redux/slices/users/usersSlices";

const UsersListItem = user => {
  const dispatch = useDispatch();

  const history = useHistory();

  const sendMailNavigator = () => {
    history.push({
      pathname: "/send-mail",
      state: {
        email: user?.user?.email,
        id: user?.user?._id,
      },
    });
  };
  return (
    <>
      <div className='p-8 mb-4 bg-garay-100 shadow rounded'>
        <div className='flex flex-wrap items-center -mx-4'>
          <div className='w-full lg:w-3/12 flex px-4 mb-6 lg:mb-0'>
            <img
              className='w-10 h-10 mr-4 object-cover rounded-full'
              src={user?.user?.profilePhoto}
              alt='profile '
            />
            <div>
              <p className='text-sm font-medium'>
                {user?.user?.firstName} {user?.user?.lastName}
              </p>
              <p className='text-xs text-gray-500'>{user?.user?.email}</p>
            </div>
          </div>
          <div className='w-1/2 lg:w-2/12 px-4 mb-6 lg:mb-0'>
            <p className='py-1 px-2 text-xs text-purple-500 bg-purple-50 rounded-full'>
              {user?.user?.accountType}
            </p>
          </div>
          <div className='w-1/2 lg:w-2/12 px-4 mb-6 lg:mb-0'>
            <p className='text-sm font-medium'>
              <span className='text-base mr-2  text-bold text-indigo-600'>
                {user.user?.followers?.length}
              </span>
              followers
            </p>
          </div>
          <div className='w-full flex lg:w-4/12 px-4  mb-6 lg:mb-0'>
            <p className='inline-block py-1 px-2 mr-2 mb-1 lg:mb-0 text-xs border-2 rounded'>
              <span className='text-base mr-2  boder-2 text-bold text-indigo-600'>
                {user.user?.posts?.length} - Posts
              </span>
            </p>
            <Link
              to={`/profile/${user?.user?._id}`}
              className=' text-gray-100 inline-block py-1 px-2 text-center mr-2 mb-1 lg:mb-0 text-xs border-2 border-indigo-500 bg-indigo-500 rounded hover:bg-indigo-400 hover:border-indigo-400 hover:text-white'
            >
              <span className='text-base mr-2  text-bold text-gray-100'>
                Profile
              </span>
            </Link>

            {user?.user?.isBlocked ? (
              <button
                onClick={() => dispatch(unBlockUserAction(user?.user?._id))}
                className='inline-block py-1 px-2 text-center bg-gray-500 text-gray-300 mr-2 mb-1 lg:mb-0 text-xs border rounded'
              >
                <span className='text-base mr-2  text-bold text-gray-100 text-center'>
                  Unblock
                </span>
              </button>
            ) : (
              <button
                onClick={() => dispatch(blockUserAction(user?.user?._id))}
                className=' text-gray-100 inline-block py-1 px-2 text-center mr-2 mb-1 lg:mb-0 text-xs border-2 border-red-500 bg-red-500 rounded hover:bg-red-400 hover:border-red-400 hover:text-white'
              >
                <span className='text-base mr-2  text-bold text-gray-100 text-center'>
                  Block
                </span>
              </button>
            )}

            <button
              onClick={sendMailNavigator}
              className=' text-gray-100 py-1 px-2 text-center mr-2 mb-1 lg:mb-0 text-xs border-2 border-green-500 bg-green-500 rounded hover:bg-green-400 hover:border-green-400 hover:text-white focus:ring-pink-500 flex'
            >
              <MailIcon
                className='-ml-1 mr-2 h-5 w-5 text-gray-100 justify-center align-middle'
                aria-hidden='true'
              />
              <span className='text-base mr-2  text-bold text-gray-100'>
                Message
              </span>
            </button>
          </div>
          <div className='w-full lg:w-1/12 px-4'>
            <div className='flex items-center'>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersListItem;
