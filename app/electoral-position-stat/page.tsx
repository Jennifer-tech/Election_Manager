import React from "react";

const ElectoralPositionStat = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-center mt-6">
        <h1 className="text-xl font-semibold text-blue-950">
          PRESIDENTIAL STATISTICS
        </h1>
      </div>
      <div className="w-full my-5 px-10">
        <table className="w-full table-fixed border border-grey-500 rounded-lg overflow-hidden">
          <thead className="text-left border-b-2 border-grey-200 bg-gray-100 ">
            <tr className="p-7">
              <th className="p-3 text-sm font-semibold tracking-wide">
                Candidates
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide">
                No of votes
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide">
                % of votes
              </th>
            </tr>
          </thead>
          <tbody className=" text-left border border-grey">
            <tr className="bg-white">
              <td className="p-3 text-sm text-gray-700">Nwoye Chioma</td>
              <td className="p-3 text-sm text-gray-700">82</td>
              <td className="p-3 text-sm text-gray-700">0.82</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="p-3 text-sm text-gray-700">Jennifer Charity</td>
              <td className="p-3 text-sm text-gray-700">87</td>
              <td className="p-3 text-sm text-gray-700">0.87</td>
            </tr>
            <tr className="bg-white">
              <td className="p-3 text-sm text-gray-700">Muofunanya Chioma</td>
              <td className="p-3 text-sm text-gray-700">90</td>
              <td className="p-3 text-sm text-gray-700">0.9</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ElectoralPositionStat;
