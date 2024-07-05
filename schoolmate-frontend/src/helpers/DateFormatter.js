export const formatDate = (dobString) => {
  const date = new Date(dobString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const formatDateReverse = (dateString) => {
  if (!dateString) return ""; // Return empty string if dateString is falsy

  const parts = dateString.split("-"); // Split dateString by "-"
  if (parts.length !== 3) return dateString; // Return dateString if not in expected format

  // Rearrange the parts to match the desired format "YYYY-MM-DD"
  const [day, month, year] = parts;
  return `${year}-${month}-${day}`;
};

export const formatNoticeDate = (datetimeString) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(new Date(datetimeString));
};
