'use client'

import { MdClose } from 'react-icons/md'
import ModalOverlay from '../ModalOverlay';

type Props = {
  isOpen: boolean;
  close: () => void;
  done: () => void;
  context: string;
};

const DeleteModal = ({ isOpen, close, done, context }: Props) => {
  return (
    <ModalOverlay isOpen={isOpen} close={close} animate="UP">
      <div className="z-10 relative bg-white rounded-md px-5 py-3 h-fit w-96 flex flex-col self-center mx-auto space-y-5">
        <MdClose
          onClick={() => close()}
          className="text-shade-dark w-4 h-4 absolute top-3 right-3 hover:cursor-pointer"
        />
        <p className="text-bold">Delete</p>
        <p className="text-sm text-shade-dark w-[95%]">
          Are you sure you want to delete this {context}? This
          cannot be undone.
        </p>

        <span className="w-fit self-end flex space-x-3 items-center pt-5">
          <button
            type="button"
            onClick={() => close()}
            className="bordr py-2 px-4"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => done()}
            className="delete-button py-2 px-4"
          >
            Delete
          </button>
        </span>
      </div>
    </ModalOverlay>
  )
}

export default DeleteModal
