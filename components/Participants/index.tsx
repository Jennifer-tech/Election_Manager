import React, { useState } from "react";
import { SELECTED_CANDIDATE } from "@/utils/config/urls";
import Image from "next/image";
import Link from "next/link";
import { ElectionParticipantsResponse } from "@/utils/endpoints/types/elections.type";
import ModalOverlay from "../Modal/ModalOverlay";
import Vote from "../Vote";

export type Participants =
  ElectionParticipantsResponse["posts"][0]["participants"];

type Props = {
  participants: Participants;
  categoryId: number;
  electionId: number;
  close: () => void;
};

const Participants = ({
  participants,
  categoryId,
  close,
  electionId,
}: Props) => {
  const [selected, setSelected] = useState<
    Partial<Participants[0]> | undefined
  >(undefined);

  return (
    <div>
      <div className="w-full grid gap-5 grid-cols-1 p-10 place-items-center cursor-pointer md:grid-cols-3 sm:grid-cols-2">
        {participants.map((participant, i) => (
          <div
            key={i}
            onClick={() => setSelected(participant)}
            className="flex flex-col items-center justify-center h-fit p-5 min-w-40 w-full border shadow-md hover:shadow-lg dark:border-b-white-900 rounded-lg"
          >
            <span className="relative w-28 h-28">
              <Image
                src={participant.photo_url ?? ""}
                alt={participant.name}
                style={{
                  objectFit: "contain",
                  objectPosition: "center",
                }}
                fill
              />
            </span>
            <p className="text-lg font-medium">{participant.name}</p>
          </div>
        ))}
      </div>

      <Vote
        close={() => setSelected(undefined)}
        isOpen={selected !== undefined}
        participant={selected}
      />
    </div>
  );
};

export default Participants;
