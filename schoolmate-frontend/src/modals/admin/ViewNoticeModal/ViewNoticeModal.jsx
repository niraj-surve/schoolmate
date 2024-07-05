import { Card, Dialog, DialogPanel, TextInput, Title } from "@tremor/react";
import React from "react";
import { FaXmark } from "react-icons/fa6";
import { formatNoticeDate } from "../../../helpers/DateFormatter";

const ViewNoticeModal = ({ isOpen, noticeData, closeModal }) => {
  return (
    <Dialog
      id="viewNoticeModal"
      open={isOpen}
      onClose={(val) => closeModal(val)}
      static={true}
    >
      <DialogPanel>
        <div className="flex justify-between">
          <Title className="mb-8 text-primary">Notice Details</Title>
          <FaXmark
            className="text-lg text-danger cursor-pointer"
            onClick={() => closeModal()}
          />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Card className="flex gap-4 items-center justify-between">
            <div className="flex gap-4 items-center">
              <span className="text-black font-medium">To</span>
              <span className="text-sm">{noticeData.to}</span>
            </div>
            <div>{formatNoticeDate(noticeData.time)}</div>
          </Card>
          <div>
          </div>
          <Card id="noticebody" className="flex flex-col gap-4 h-[20rem] overflow-y-auto">
            <Title className="font-medium">Subject</Title>
            <span className="font-normal tracking-wide text-sm mb-4">{noticeData.subject}</span>
            <Title className="font-medium">Notice Body</Title>
            <span className="font-normal leading-7 tracking-wide text-sm break-words">
              {noticeData.message}
            </span>
          </Card>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default ViewNoticeModal;
