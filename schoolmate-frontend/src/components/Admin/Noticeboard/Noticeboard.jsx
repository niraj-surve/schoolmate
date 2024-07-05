import React, { useEffect, useState } from "react";
import { Button, Card, TextInput } from "@tremor/react";
import { PiPaperPlaneTiltFill } from "react-icons/pi";
import { FaEye, FaPenToSquare, FaTrash } from "react-icons/fa6";
import AddNoticeModal from "../../../modals/admin/AddNoticeModal/AddNoticeModal";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { formatNoticeDate } from "../../../helpers/DateFormatter";
import ViewNoticeModal from "../../../modals/admin/ViewNoticeModal/ViewNoticeModal";
import UpdateNoticeModal from "../../../modals/admin/UpdateNoticeModal/UpdateNoticeModal";
import DeleteNoticeModal from "../../../modals/admin/DeleteNoticeModal/DeleteNoticeModal";

const Noticeboard = () => {
  const apiKey = import.meta.env.VITE_API_URL;

  const [addNoticeModal, setAddNoticeModal] = useState(false);
  const [viewNoticeModal, setViewNoticeModal] = useState(false);
  const [updateNoticeModal, setUpdateNoticeModal] = useState(false);
  const [deleteNoticeModal, setDeleteNoticeModal] = useState(false);

  const [data, setData] = useState([]);
  const [notice, setNotice] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const filteredData = data.filter((item) =>
    item.subject.toLowerCase().includes(searchValue.toLowerCase())
  );

  const sortedData = [...filteredData].sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );

  const fetchNotices = async () => {
    try {
      const res = await axios.get(`${apiKey}/home/get-notices`);
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Card className="h-[80vh]">
        <div className="flex flex-col gap-4 h-full">
          <div className="flex gap-4">
            <TextInput
              className="w-64"
              icon={FaSearch}
              placeholder="Search by subject"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button
              onClick={() => setAddNoticeModal(true)}
              icon={PiPaperPlaneTiltFill}
              color="green"
              className="w-fit"
            >
              New Notice
            </Button>
          </div>
          <Card className="h-full overflow-hidden">
            <div
              id="notices"
              className="rounded-lg overflow-y-auto pr-4 h-full"
            >
              {sortedData.length !== 0 ? (
                sortedData.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between bg-info mb-4 px-4 py-2 rounded-lg"
                  >
                    <div className="flex justify-between w-[calc(100%-7rem)] text-dark font-mulish">
                      <span className="flex gap-4 items-center">
                        <span className="font-medium">
                          {item.subject.length > 20
                            ? `${item.subject.slice(0, 20)}...`
                            : item.subject}
                        </span>
                        <span className="text-sm">
                          {item.message.length > 30
                            ? `${item.message.slice(0, 30)}...`
                            : item.message}
                        </span>
                      </span>
                      <span className="text-sm">
                        {formatNoticeDate(item.time)}
                      </span>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          setViewNoticeModal(true);
                          setNotice(item);
                        }}
                        className="mx-2 text-primary"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => {
                          setUpdateNoticeModal(true);
                          setNotice(item);
                        }}
                        className="mx-2 text-warning"
                      >
                        <FaPenToSquare />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteNoticeModal(true);
                          setNotice(item);
                        }}
                        className="mx-2 text-danger"
                      >
                        <FaTrash />
                      </button>
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
        </div>
      </Card>

      {addNoticeModal && (
        <AddNoticeModal
          isOpen={addNoticeModal}
          closeModal={() => setAddNoticeModal(false)}
          fetchNotices={fetchNotices}
        />
      )}

      {viewNoticeModal && (
        <ViewNoticeModal
          isOpen={viewNoticeModal}
          noticeData={notice}
          closeModal={() => setViewNoticeModal(false)}
        />
      )}

      {updateNoticeModal && (
        <UpdateNoticeModal
          isOpen={updateNoticeModal}
          noticeData={notice}
          fetchNotices={fetchNotices}
          closeModal={() => setUpdateNoticeModal(false)}
        />
      )}

      {deleteNoticeModal && (
        <DeleteNoticeModal
          isOpen={deleteNoticeModal}
          noticeData={notice}
          fetchNotices={fetchNotices}
          closeModal={() => setDeleteNoticeModal(false)}
        />
      )}
    </div>
  );
};

export default Noticeboard;
