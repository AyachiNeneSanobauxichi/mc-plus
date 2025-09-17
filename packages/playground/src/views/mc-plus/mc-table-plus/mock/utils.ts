import type { StatusType } from "mc-plus";

// get status type
const getStatusType = (status: string): StatusType => {
  switch (status) {
    case "Pending":
      return "warning";
    case "Partially Completed":
      return "success";
    case "Success":
      return "success";
    case "Failed":
      return "error";
    case "Canceled":
      return "cancel";
    default:
      return "info";
  }
};

export { getStatusType };
