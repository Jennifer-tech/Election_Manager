import { _createVote } from "@/utils/endpoints/controller/votes.controller";
import ModalOverlay from "../Modal/ModalOverlay";
import { Participants } from "../Participants";

type VoteProps = {
  participant: Partial<Participants[0]> | undefined;
  isOpen: boolean;
  close: () => void;
};

const Vote = ({ isOpen, close, participant }: VoteProps) => {
//   const handleVote = async () => {
//     const res = await _createVote({
//       election_id: participant?.election_id,
//       post_id: participant?.post_id,
//       participant_id: participant?.id,
//       reg_num: 'participant?'.
//     });
//   };

  return (
    <ModalOverlay animate="UP" close={close} isOpen={isOpen}>
      <div className="flex flex-col items-center justify-center relative self-center mx-auto bg-white h-fit w-[90%] md:w-[60%] lg:w-[45%] py-10 border shadow-md hover:shadow-lg rounded-lg">
        <div className="w-full text-lg text-blue-950 text-center font-medium">
          <p className="mb-5">
            Do you wish
            <br />
            to vote for
          </p>
        </div>

        <div className="w-full text-xl font-extrabold text-blue-950 mb-5 text-center">
          {participant?.name ?? ""}
        </div>

        <section className="w-full flex flex-row items-center justify-center space-x-2.5">
          <div className="button-outline border border-blue-950 rounded-2xl text-blue-950 w-fit px-6 lg:px-8 flex items-center py-2 lg:py-3 space-x-2 cursor-pointer hover:bg-blue-950">
            <p className="text-lg text-blue-950 font-semibold hover:text-white">
              Yes
            </p>
          </div>

          <div className="button-outline border border-blue-950 rounded-2xl text-blue-950 w-fit px-6 lg:px-8 flex items-center py-2 lg:py-3 space-x-2 cursor-pointer hover:bg-blue-950">
            <p className="text-lg text-blue-950 font-semibold hover:text-white">
              No
            </p>
          </div>
        </section>
      </div>
    </ModalOverlay>
  );
};

export default Vote;
