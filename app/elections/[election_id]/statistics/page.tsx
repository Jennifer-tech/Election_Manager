"use client";

import { ELECTION_CATEGORIES } from "@/utils/config/urls";
import {
  _deleteElection,
  _getElectionResults,
  _getElections,
} from "@/utils/endpoints/controller/elections.controller";
import {
  ElectionResultsResponse,
  GetElectionsResponse,
} from "@/utils/endpoints/types/elections.type";
// import { Metadata } from "next";
import Alert, { type Alert as AlertType } from "@/components/Alert";
import AddVotersModal from "@/components/Modal/AddVotersModal";
import CreatePostModal from "@/components/Modal/CreatePostModal";
import DeleteModal from "@/components/Modal/DeleteModal";
import ThreeDotsDroplist from "@/components/ThreeDotsDroplist";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";

// export const metaData: Metadata = {
//   title: "ELECTIONS - ELECTION MANAGER",
// };

const Statistics = () => {
  const router = useRouter();
  const params = useParams();
  const [selected, setSelected] = useState<
    ElectionResultsResponse["posts"][0] | undefined
  >(undefined);
  const [statistics, setStatistics] = useState<
    ElectionResultsResponse | undefined
  >(undefined);
  const [alert, setAlert] = useState<AlertType>({
    title: "",
    variant: "warn",
    onClose: () => closeAlert(),
    active: false,
  });

  const closeAlert = () => {
    setAlert({ ...alert, active: false });
  };

  // const threeDotActionButton = useMemo(
  //   () => [
  //     {
  //       id: v4(),
  //       title: "Add voters",
  //       callback: (id: string | number): void => {
  //         setAddVotersToggle(true), setSelected(id as number);
  //       },
  //     },
  //     {
  //       id: v4(),
  //       title: "Create category",
  //       callback: (id: string | number): void => {
  //         setSelected(id as number), setCreatePostToggle(true);
  //       },
  //     },
  //     {
  //       id: v4(),
  //       title: "View categories",
  //       callback: (id: string | number): void => {
  //         router.push(`/elections/${id}/categories`);
  //       },
  //     },
  //     {
  //       id: v4(),
  //       title: "View admins",
  //       callback: (id: string | number): void => {
  //         router.push(`/elections/${id}/admins`);
  //       },
  //     },
  //     {
  //       id: v4(),
  //       title: <p className="text-red-600">Delete election</p>,
  //       callback: (id: string | number): void => {
  //         setSelected(id as number);
  //         setDeleteToggle(true);
  //       },
  //     },
  //   ],
  //   []
  // );

  // const handleDelete = async () => {
  //   const res = await _deleteElection(selected as number, alert, setAlert);

  //   if (res) {
  //     const filteredElections = elections.filter(
  //       (election) => election.id !== selected
  //     );
  //     setElections(filteredElections);
  //     setSelected(undefined);
  //   }

  //   setTimeout(() => {
  //     setAlert({ ...alert, active: false });
  //   }, 5000);
  // };

  const fetchStatistics = useCallback(async () => {
    const _statistics = await _getElectionResults(
      params["election_id"] ?? "",
      alert,
      setAlert
    );
    setStatistics(_statistics);

    setTimeout(() => {
      setAlert({ ...alert, active: false });
    }, 5000);
  }, []);
  console.log(selected);

  useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <>
      <div className="flex flex-col mt-10">
        <h1 className="text-xl font-semibold py-6 text-blue-950 uppercase px-10 mx-auto">
          {statistics?.title}
        </h1>

        {statistics?.posts.map((post, i) => (
          <div key={i} className="px-10">
            <span
              onClick={() =>
                selected !== undefined
                  ? setSelected(undefined)
                  : setSelected(post)
              }
              className="relative border border-gray-300 mx-auto w-[95%] mb-3 p-5 rounded-lg hover:shadow-lg cursor-pointer flex items-center justify-between"
            >
              <div className="w-full">{post?.post}</div>
            </span>

            {selected?.id === post.id ? (
              <table className="w-[90%] p-10 mx-auto table-fixed border border-grey-500 rounded-lg overflow-hidden">
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
                  {post.participants.map((each, i) => (
                    <tr key={i} className="bg-white">
                      <td className="p-3 text-sm text-gray-700">
                        {each.name}
                      </td>
                      <td className="p-3 text-sm text-gray-700">{each.total_votes}</td>
                      <td className="p-3 text-sm text-gray-700">{each.percent_votes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
          </div>
        ))}

        <span className="z-30 fixed top-3 right-3">
          <Alert alert={alert} />
        </span>
      </div>
    </>
  );
};

export default Statistics;

// const Statistics = () => {
//   return (
//     <div className="flex flex-col mt-10">
//       <Link href={ONGOING_ELECTION}>
//         <div className="border border-gray-300 mx-5 mb-3 p-5 rounded-lg hover:shadow-lg cursor-pointer">
//           SEES Election 2023{" "}
//         </div>
//       </Link>
//       <div className="border border-gray-300 mx-5 mb-3 p-5 rounded-lg hover:shadow-lg cursor-pointer">
//         SEES Election 2022
//       </div>
//       <div className="border border-gray-300 mx-5 mb-3 p-5 rounded-lg hover:shadow-lg cursor-pointer">
//         SEES Election 2021
//       </div>
//       <div className="border border-gray-300 mx-5 mb-3 p-5 rounded-lg hover:shadow-lg cursor-pointer">
//         SEES Election 2020
//       </div>
//     </div>
//   );
// };

// export default ;
