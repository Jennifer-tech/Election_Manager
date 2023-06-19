import React from "react";

const SelectedCandidate = () => {
  return (
    <div className="flex w-full min-h-screen border border-red-700 justify-center items-center">
      <div className="flex flex-col items-center justify-center relative h-60 w-80 my-5 md:w-80 md:h-80 border shadow-md hover:shadow-lg dark:border-b-white-900 rounded-lg">
        <div className="text-lg text-bold text text-blue-950 text-center">
          <p>
            Do you wish
            <br />
            to vote for
            <br /> Muofunanya Chioma
          </p>
        </div>
        <div>
          <span>Yes</span>
          <span>No</span>
        </div>
      </div>
    </div>
  );
};

export default SelectedCandidate;
