import axios from "axios";
import React, { useEffect, useState } from "react";
import { formatNoticeDate } from "../../helpers/DateFormatter";
import { Card } from "@tremor/react";
import ViewNoticeModal from "../../modals/admin/ViewNoticeModal/ViewNoticeModal";

const Notice = () => {
  const apiKey = import.meta.env.VITE_API_URL;

  const [viewNoticeModal, setViewNoticeModal] = useState(false);

  const [data, setData] = useState([]);
  const [notice, setNotice] = useState(null);

  const fetchNotices = async () => {
    try {
      const response = await axios.get(`${apiKey}/home/get-notices`);
      if (response.status === 200) {
        // Sort the data before updating the state
        const sortedData = response.data.sort(
          (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
        );
        setData(sortedData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div className="flex flex-col gap-8 bg-white w-full max-md:px-10 md:px-14 py-20">
      <h1 className="font-bold text-3xl font-opensans text-center">
        Noticeboard
      </h1>
      <Card className="h-[20rem] overflow-hidden bg-[#f6efe6]">
        <div
          id="notices"
          className="rounded-lg overflow-y-auto overflow-x-hidden pr-4 p-4 h-full"
        >
          {data.length !== 0 ? (
            data.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setViewNoticeModal(true);
                  setNotice(item);
                }}
                className="cursor-pointer shadow-tremor-card hover:scale-x-[1.01] flex justify-between bg-info mb-4 px-4 py-2 rounded-lg"
              >
                <div className="flex justify-between w-full text-dark font-mulish">
                  <span className="flex gap-4 items-center">
                    <span className="font-medium">
                      {item.subject.length > 40
                        ? `${item.subject.slice(0, 40)}...`
                        : item.subject}
                    </span>
                    <span className="text-sm">
                      {item.message.length > 60
                        ? `${item.message.slice(0, 60)}...`
                        : item.message}
                    </span>
                  </span>
                  <span className="text-sm">{formatNoticeDate(item.time)}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-4 text-gray-600">
              Data is not available.
            </p>
          )}
        </div>
      </Card>
      {viewNoticeModal && (
        <ViewNoticeModal
          isOpen={viewNoticeModal}
          noticeData={notice}
          closeModal={() => setViewNoticeModal(false)}
        />
      )}
    </div>
  );
};

export default Notice;
