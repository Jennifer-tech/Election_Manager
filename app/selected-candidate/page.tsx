import React from "react";

const SelectedCandidate = () => {
  return (
    <div className="flex w-full min-h-screen justify-center items-center">
      <div className="flex flex-col items-center justify-center relative h-60 w-80 my-5 md:w-80 md:h-80 border shadow-md hover:shadow-lg dark:border-b-white-900 rounded-lg">
        <div className="w-full text-lg text-blue-950 text-center font-medium">
          <p className="mb-5">
            Do you wish
            <br />
            to vote for
          </p>
        </div>
        <div className="w-full text-xl font-extrabold text-blue-950 mb-5 text-center">
          Muofunanya Chioma
        </div>
        <div className="w-full flex flex-row items-center justify-center space-x-2.5">
          <div className="button-outline border border-blue-950 rounded-2xl text-blue-950 w-fit px-6 lg:px-8 flex items-center py-2 lg:py-3 space-x-2 cursor-pointer hover:bg-blue-950">
            <p className="text-lg text-blue-950 font-semibold hover:text-white">Yes</p>
          </div>
          {/* <div className='text-white bg-blue-950 hover:bg-blue-800 focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Yes</div> */}
          <div className="button-outline border border-blue-950 rounded-2xl text-blue-950 w-fit px-6 lg:px-8 flex items-center py-2 lg:py-3 space-x-2 cursor-pointer hover:bg-blue-950">
            <p className="text-lg text-blue-950 font-semibold hover:text-white">No</p>
          </div>
        </div>
      </div>
    </div>
  );
};
``;

export default SelectedCandidate;
