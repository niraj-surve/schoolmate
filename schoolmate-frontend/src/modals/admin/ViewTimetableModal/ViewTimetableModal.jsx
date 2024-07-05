import { Button, Dialog, DialogPanel, Title } from "@tremor/react";
import React from "react";
import { IoMdDownload } from "react-icons/io";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FaXmark } from "react-icons/fa6";

const ViewTimetableModal = ({ isOpen, timetableData, closeModal }) => {
  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(10, 30, 'Jeevan Shikshan School, Guhagar No. 1');
    doc.setFontSize(12);
    doc.text(10, 40, `Timetable of Standard ${timetableData.standard}`);

    const table = document.getElementById("timetableTable");

    html2canvas(table, {
      scale: 2, // Increase scale to improve quality
      scrollY: -window.scrollY,
      allowTaint: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const imgWidth = 190; // Adjust according to your table width
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      doc.addImage(imgData, "PNG", 10, 50, imgWidth, imgHeight);
      doc.save(`Timetable_Standard_${timetableData.standard}.pdf`);
    });
  };

  return (
    <Dialog
      id="viewTimetableModal"
      open={isOpen}
      onClose={(val) => closeModal(val)}
      static={true}
    >
      <DialogPanel>
        <div className="flex justify-between">
          <Title className="mb-2 text-primary">
            Timetable of Standard {timetableData.standard}
          </Title>
          <FaXmark
            className="text-lg text-danger cursor-pointer"
            onClick={() => closeModal()}
          />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <table id="timetableTable" className="text-[0.6rem]">
            <thead className="">
              <th>Time/Day</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Time/Day</th>
              <th>Saturday</th>
            </thead>
            <tbody>
              <tr>
                <td>10.30 - 10.45</td>
                <td className="font-bold text-red-700" colSpan={5}>
                  Cleaning
                </td>
                <td>7.00 - 7.15</td>
                <td>Cleaning</td>
              </tr>
              <tr>
                <td>10.45 - 11.00</td>
                <td className="font-bold text-red-700" colSpan={5}>
                  Prayer
                </td>
                <td>7.15 - 7.30</td>
                <td>Prayer</td>
              </tr>
              <tr>
                <td>11.00 - 11.30</td>
                <td>{timetableData.timetable.Monday["11_00 to 11_30"].subject}</td>
                <td>{timetableData.timetable.Tuesday["11_00 to 11_30"].subject}</td>
                <td>{timetableData.timetable.Wednesday["11_00 to 11_30"].subject}</td>
                <td>{timetableData.timetable.Thursday["11_00 to 11_30"].subject}</td>
                <td>{timetableData.timetable.Friday["11_00 to 11_30"].subject}</td>
                <td>7.30 - 8.00</td>
                <td>{timetableData.saturdayTimetable.Saturday["7_30 to 8_00"].subject}</td>
              </tr>
              <tr>
                <td>11.30 - 12.00</td>
                <td>{timetableData.timetable.Monday["11_30 to 12_00"].subject}</td>
                <td>{timetableData.timetable.Tuesday["11_30 to 12_00"].subject}</td>
                <td>{timetableData.timetable.Wednesday["11_30 to 12_00"].subject}</td>
                <td>{timetableData.timetable.Thursday["11_30 to 12_00"].subject}</td>
                <td>{timetableData.timetable.Friday["11_30 to 12_00"].subject}</td>
                <td>8.00 - 8.30</td>
                <td>{timetableData.saturdayTimetable.Saturday["8_00 to 8_30"].subject}</td>
              </tr>
              <tr>
                <td>12.00 - 12.30</td>
                <td className="font-bold text-red-700" colSpan={5}>
                  Short Break
                </td>
                <td>8.30 - 9.00</td>
                <td>{timetableData.saturdayTimetable.Saturday["8_30 to 9_00"].subject}</td>
              </tr>
              <tr>
                <td>12.30 - 1.00</td>
                <td>{timetableData.timetable.Monday["12_30 to 1_00"].subject}</td>
                <td>{timetableData.timetable.Tuesday["12_30 to 1_00"].subject}</td>
                <td>{timetableData.timetable.Wednesday["12_30 to 1_00"].subject}</td>
                <td>{timetableData.timetable.Thursday["12_30 to 1_00"].subject}</td>
                <td>{timetableData.timetable.Friday["12_30 to 1_00"].subject}</td>
                <td>9.00 - 9.30</td>
                <td>{timetableData.saturdayTimetable.Saturday["9_00 to 9_30"].subject}</td>
              </tr>
              <tr>
                <td>1.00 - 1.30</td>
                <td>{timetableData.timetable.Monday["1_00 to 1_30"].subject}</td>
                <td>{timetableData.timetable.Tuesday["1_00 to 1_30"].subject}</td>
                <td>{timetableData.timetable.Wednesday["1_00 to 1_30"].subject}</td>
                <td>{timetableData.timetable.Thursday["1_00 to 1_30"].subject}</td>
                <td>{timetableData.timetable.Friday["1_00 to 1_30"].subject}</td>
                <td>9.30 - 10.00</td>
                <td className="font-bold text-red-700">Lunch Break</td>
              </tr>
              <tr>
                <td>1.30 - 2.30</td>
                <td className="font-bold text-red-700" colSpan={5}>
                  Lunch Break
                </td>
                <td>10.00 - 10.30</td>
                <td>{timetableData.saturdayTimetable.Saturday["10_00 to 10_30"].subject}</td>
              </tr>
              <tr>
                <td>2.30 - 3.00</td>
                <td>{timetableData.timetable.Monday["2_30 to 3_00"].subject}</td>
                <td>{timetableData.timetable.Tuesday["2_30 to 3_00"].subject}</td>
                <td>{timetableData.timetable.Wednesday["2_30 to 3_00"].subject}</td>
                <td>{timetableData.timetable.Thursday["2_30 to 3_00"].subject}</td>
                <td>{timetableData.timetable.Friday["2_30 to 3_00"].subject}</td>
              </tr>
              <tr>
                <td>3.00 - 3.30</td>
                <td>{timetableData.timetable.Monday["3_00 to 3_30"].subject}</td>
                <td>{timetableData.timetable.Tuesday["3_00 to 3_30"].subject}</td>
                <td>{timetableData.timetable.Wednesday["3_00 to 3_30"].subject}</td>
                <td>{timetableData.timetable.Thursday["3_00 to 3_30"].subject}</td>
                <td>{timetableData.timetable.Friday["3_00 to 3_30"].subject}</td>
              </tr>
              <tr>
                <td>3.30 - 4.00</td>
                <td className="font-bold text-red-700" colSpan={5}>
                  Short Break
                </td>
              </tr>
              <tr>
                <td>4.00 - 4.30</td>
                <td>{timetableData.timetable.Monday["4_00 to 4_30"].subject}</td>
                <td>{timetableData.timetable.Tuesday["4_00 to 4_30"].subject}</td>
                <td>{timetableData.timetable.Wednesday["4_00 to 4_30"].subject}</td>
                <td>{timetableData.timetable.Thursday["4_00 to 4_30"].subject}</td>
                <td>{timetableData.timetable.Friday["4_00 to 4_30"].subject}</td>
              </tr>
              <tr>
                <td>4.30 - 5.00</td>
                <td>{timetableData.timetable.Monday["4_30 to 5_00"].subject}</td>
                <td>{timetableData.timetable.Tuesday["4_30 to 5_00"].subject}</td>
                <td>{timetableData.timetable.Wednesday["4_30 to 5_00"].subject}</td>
                <td>{timetableData.timetable.Thursday["4_30 to 5_00"].subject}</td>
                <td>{timetableData.timetable.Friday["4_30 to 5_00"].subject}</td>
              </tr>
            </tbody>
          </table>
          <Button icon={IoMdDownload} className="btn-transition self-center mt-2 w-fit border-primary bg-primary hover:bg-white hover:text-primary hover:border-primary" onClick={downloadPdf}>Download</Button>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default ViewTimetableModal;
