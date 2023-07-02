"use client";

import Alert, { type Alert as AlertType } from "@/components/Alert";
import AddParticipantModal from "@/components/Modal/AddParticipantModal";
import ThreeDotsDroplist from "@/components/ThreeDotsDroplist";
import { _getElectionCategories } from "@/utils/endpoints/controller/elections.controller";
import { _deletePost } from "@/utils/endpoints/controller/post.controller";
import { ElectionCategoriesResponse } from "@/utils/endpoints/types/elections.type";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";

const Categories = () => {
  const params = useParams();
  const [electionsCategories, setElectionsCategories] =
    useState<ElectionCategoriesResponse>([]);
  const [addParticipant, setAddParticipant] = useState(false);
  const [selected, setSelected] = useState<number | undefined>(undefined);

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
        callback: (id: string | number): void => {
          // router.push(`/elections/${id}/categories`);
        },
      },
      {
        id: v4(),
        title: "Add participants",
        callback: (id: string | number): void => {
          setAddParticipant(true), setSelected(id as number);
        },
      },
      {
        id: v4(),
        title: <p className="text-red-600">Delete Post</p>,
        callback: (id: string | number): void => {
          handleAdminDelete(id);
        },
      },
    ],
    []
  );

  const handleAdminDelete = useCallback(async (id: string | number) => {
    const res = await _deletePost(id ?? "", alert, setAlert);

    if (res) {
      const filteredcategories = electionsCategories.filter(
        (admin) => admin.id !== id
      );
      setElectionsCategories(filteredcategories);
    }

    setTimeout(() => {
      setAlert({ ...alert, active: false });
    }, 5000);
  }, []);

  const fetchElectionCategories = useCallback(async () => {
    const _electionsCategories = await _getElectionCategories(
      params["election_id"] ?? "",
      alert,
      setAlert
    );
    setElectionsCategories(_electionsCategories ?? []);

    setTimeout(() => {
      setAlert({ ...alert, active: false });
    }, 5000);
  }, []);

  useEffect(() => {
    fetchElectionCategories();
  }, []);

  return (
    <div className="flex flex-col mt-10">
      {electionsCategories.map((category, i) => (
        <span
          key={i}
          className="relative border border-gray-300 mx-auto w-[95%] mb-3 p-5 rounded-lg hover:shadow-lg cursor-pointer flex items-center justify-between"
        >
          <div className="w-full">
            <Link href={"ELECTION_CATEGORIES(category.id)"}>
              {category.post}
            </Link>
          </div>

          <ThreeDotsDroplist
            actionButtons={threeDotActionButton}
            itemId={category.id}
          />
        </span>
      ))}

      <AddParticipantModal
        election_id={params["election_id"] as unknown as number}
        post_id={selected as number}
        isOpen={addParticipant}
        close={() => {
          setSelected(undefined), setAddParticipant(false);
        }}
      />

      <span className="z-30 fixed top-3 right-3">
        <Alert alert={alert} />
      </span>
    </div>
  );
};

export default Categories;
