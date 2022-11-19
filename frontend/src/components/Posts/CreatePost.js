export default function CreatePost() {
  return (
    <>
      <div className='min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-300'>
            Create Post
          </h2>

          <p className='mt-2 text-center text-sm text-gray-600'>
            <p className='font-medium text-green-600 hover:text-indigo-500'>
              Share your ideas to the word. Your post must be free from
              profanity
            </p>
          </p>
        </div>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <form className='space-y-6'>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'
                >
                  Title
                </label>
                <div className='mt-1'>
                  {/* Title */}
                  <input
                    id='title'
                    name='title'
                    type='title'
                    autoComplete='title'
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
                {/* Err msg */}
                <div className='text-red-500'>
                  {/* {formik.touched.title && formik.errors.title} */}Err here
                </div>
              </div>
              Category input goes here
              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700'
                >
                  Description
                </label>
                {/* Description */}
                <textarea
                  rows='5'
                  cols='10'
                  className='rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none'
                  type='text'
                ></textarea>
                {/* Err msg */}
                <div className='text-red-500'>Err here</div>
              </div>
              <div>
                {/* Submit btn */}
                <button
                  type='submit'
                  className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
