"use client";

import { ELECTION_CATEGORIES } from "@/utils/config/urls";
import {
  _deleteElection,
  _getElections,
} from "@/utils/endpoints/controller/elections.controller";
import { GetElectionsResponse } from "@/utils/endpoints/types/elections.type";
// import { Metadata } from "next";
import Alert, { type Alert as AlertType } from "@/components/Alert";
import AddVotersModal from "@/components/Modal/AddVotersModal";
import CreatePostModal from "@/components/Modal/CreatePostModal";
import DeleteModal from "@/components/Modal/DeleteModal";
import ThreeDotsDroplist from "@/components/ThreeDotsDroplist";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";

// export const metaData: Metadata = {
//   title: "ELECTIONS - ELECTION MANAGER",
// };

const Elections = () => {
  const router = useRouter()
  const [createPostToggle, setCreatePostToggle] = useState(false);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const [addVotersToggle, setAddVotersToggle] = useState(false);
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
        title: "Add voters",
        callback: (id: string | number): void => {
          setAddVotersToggle(true), setSelected(id as number);
        },
      },
      {
        id: v4(),
        title: "Create category",
        callback: (id: string | number): void => {
          setSelected(id as number), setCreatePostToggle(true);
        },
      },
      {
        id: v4(),
        title: "View categories",
        callback: (id: string | number): void => {
          router.push(`/elections/${id}/categories`);
        },
      },
      {
        id: v4(),
        title: "View admins",
        callback: (id: string | number): void => {
          router.push(`/elections/${id}/admins`);
        },
      },
      {
        id: v4(),
        title: <p className="text-red-600">Delete election</p>,
        callback: (id: string | number): void => {
          setSelected(id as number);
          setDeleteToggle(true);
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
            <Link href={ELECTION_CATEGORIES(election.id)}>
              {election.title}
            </Link>
          </div>

          <ThreeDotsDroplist
            actionButtons={threeDotActionButton}
            itemId={election.id}
          />
        </span>
      ))}

      <DeleteModal
        context="election"
        isOpen={deleteToggle}
        done={handleDelete}
        close={() => setSelected(undefined)}
      />

      <CreatePostModal
        election_id={selected as number}
        isOpen={createPostToggle}
        close={() => {
          setSelected(undefined), setCreatePostToggle(false);
        }}
      />

      <AddVotersModal
        election_id={selected as number}
        isOpen={addVotersToggle}
        close={() => {
          setSelected(undefined), setAddVotersToggle(false);
        }}
      />

      <span className="z-30 fixed top-3 right-3">
        <Alert alert={alert} />
      </span>
    </div>
  );
};

export default Elections;
