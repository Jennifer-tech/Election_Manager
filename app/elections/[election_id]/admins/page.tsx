"use client";

import Alert, { type Alert as AlertType } from "@/components/Alert";
import AddParticipantModal from "@/components/Modal/AddParticipantModal";
import ThreeDotsDroplist from "@/components/ThreeDotsDroplist";
import { _deleteAdmin } from "@/utils/endpoints/controller/admin.controller";
import {
  _getElectionAdmin,
  _getElectionCategories,
} from "@/utils/endpoints/controller/elections.controller";
import { GetAdminsResponse } from "@/utils/endpoints/types/admin.type";
import {
  ElectionAdminResponse,
  ElectionCategoriesResponse,
} from "@/utils/endpoints/types/elections.type";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";

const Admins = () => {
  const params = useParams();
  const [admins, setAdmins] = useState<ElectionAdminResponse>([]);
  const [addParticipant, setAddParticipant] = useState(false);
  const [selected, setSelected] = useState<GetAdminsResponse[0] | undefined>(
    undefined
  );

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
        title: <p className="text-red-600">Delete admin</p>,
        callback: (id: string | number): void => {
          handleAdminDelete(id);
        },
      },
    ],
    []
  );

  const handleAdminDelete = useCallback(async (id: string | number) => {
    const res = await _deleteAdmin(id ?? "", alert, setAlert);

    const filteredAdmins = admins.filter((admin) => admin.id !== id);
    setAdmins(filteredAdmins);

    setTimeout(() => {
      setAlert({ ...alert, active: false });
    }, 5000);
  }, []);

  const fetchElectionAdmins = useCallback(async () => {
    const _admins = await _getElectionAdmin(
      params["election_id"] ?? "",
      alert,
      setAlert
    );

    setAdmins(_admins ?? []);

    setTimeout(() => {
      setAlert({ ...alert, active: false });
    }, 5000);
  }, []);

  useEffect(() => {
    fetchElectionAdmins();
  }, []);

  return (
    <div className="flex flex-col mt-10">
      {admins.map((admin, i) => (
        <span
          key={i}
          className="relative border border-gray-300 mx-auto w-[95%] mb-3 p-5 rounded-lg hover:shadow-lg cursor-pointer flex items-center justify-between"
        >
          <div className="w-full">
            <Link href={"ELECTION_CATEGORIES(category.id)"}>{admin.email}</Link>
          </div>

          <ThreeDotsDroplist
            actionButtons={threeDotActionButton}
            itemId={admin.id}
          />
        </span>
      ))}

      {/* <AddParticipantModal
        election_id={params["election_id"] as unknown as number}
        post_id={selected as number}
        isOpen={addParticipant}
        close={() => {
          setSelected(undefined), setAddParticipant(false);
        }}
      /> */}

      <span className="z-30 fixed top-3 right-3">
        <Alert alert={alert} />
      </span>
    </div>
  );
};

export default Admins;
