"use client";

import { ELECTION_POSITION } from "@/utils/config/urls";
import {
  _deleteElection,
  _getElections,
} from "@/utils/endpoints/controller/elections.controller";
import { GetElectionsResponse } from "@/utils/endpoints/types/elections.type";
// import { Metadata } from "next";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { v4 } from "uuid";
import Alert, { type Alert as AlertType } from "@/components/Alert";
import ThreeDotsDroplist from "@/components/ThreeDotsDroplist";
import DeleteModal from "@/components/Modal/DeleteModal";

// export const metaData: Metadata = {
//   title: "ELECTIONS - ELECTION MANAGER",
// };

const Elections = () => {
  const [toggle, setToggle] = useState(false);
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const [elections, setElections] = useState<GetElectionsResponse>([]);
  const [alert, setAlert] = useState<AlertType>({
    title: "",
    variant: "warn",
    onClose: () => closeAlert(),
    active: false,
  });

  const closeAlert = () => {
    setAlert({ ...alert, active: false });
  };

  const threeDotActionButton = useMemo(
    () => [
      {
        id: v4(),
        title: "View",
        callback: (id: string | number): void => {},
      },
      {
        id: v4(),
        title: "Add Participants",
        callback: (id: string | number): void => {},
      },
      {
        id: v4(),
        title: <p className="text-red-600">Delete election</p>,
        callback: (id: string | number): void => {
          setSelected(id as number);
        },
      },
    ],
    []
  );

  const handleDelete = async () => {
    const res = await _deleteElection(selected as number, alert, setAlert);

    if (res) {
      const filteredElections = elections.filter(
        (election) => election.id !== selected
      );
      setElections(filteredElections);
      setSelected(undefined);
    }

    setTimeout(() => {
      setAlert({ ...alert, active: false });
    }, 5000);
  };

  const fetchElections = useCallback(async () => {
    const _elections = await _getElections(alert, setAlert);
    setElections(_elections ?? []);

    setTimeout(() => {
      setAlert({ ...alert, active: false });
    }, 5000);
  }, []);

  useEffect(() => {
    fetchElections();
  }, []);

  return (
    <div className="flex flex-col mt-10">
      {elections.map((election, i) => (
        <span
          key={i}
          className="relative border border-gray-300 mx-auto w-[95%] mb-3 p-5 rounded-lg hover:shadow-lg cursor-pointer flex items-center justify-between"
        >
          <div className="w-full">
            <Link href={ELECTION_POSITION}>{election.title}</Link>
          </div>

          <ThreeDotsDroplist
            actionButtons={threeDotActionButton}
            itemId={election.id}
          />
        </span>
      ))}

      <DeleteModal
        context="election"
        isOpen={selected !== undefined}
        done={handleDelete}
        close={() => setSelected(undefined)}
      />

      <span className="z-30 fixed top-3 right-3">
        <Alert alert={alert} />
      </span>
    </div>
  );
};

export default Elections;
