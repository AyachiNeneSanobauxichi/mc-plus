import type { Ref } from "vue";

// Enum 版本的 IconType - 提供更强的类型安全性和自动补全
export enum IconTypeEnum {
  Loading = "Loading",
  Accept_02 = "Accept_02",
  Accept = "Accept",
  Add = "Add",
  Add_User = "Add_User",
  Add_03 = "Add-03",
  Activate = "Activate",
  Add_02 = "Add-02",
  Align_left = "Align-left",
  Add_Wallet = "Add_Wallet",
  Backward = "Backward",
  Attach = "Attach",
  Avatar = "Avatar",
  Bookmark = "Bookmark",
  Audit_Trail = "Audit_Trail",
  Add_Bank = "Add_Bank",
  ActiveWallet = "ActiveWallet",
  a_BatchTransfers = "a-BatchTransfers",
  Cloud = "Cloud",
  Call_Active = "Call_Active",
  bold = "bold",
  Chainlink = "Chainlink",
  Batch = "Batch",
  Calendar = "Calendar",
  Cloud_Upload = "Cloud_Upload",
  Corner_Arrow_Left = "Corner_Arrow_Left",
  Bookmark_02 = "Bookmark_02",
  Deposit = "Deposit",
  Bar_Chart = "Bar_Chart",
  Bank = "Bank",
  Camera = "Camera",
  Corner_Arrow_Right = "Corner_Arrow_Right",
  Cloud_Download = "Cloud_Download",
  Call_HangUp = "Call_HangUp",
  Document = "Document",
  Down = "Down",
  Downgrade = "Downgrade",
  Collection_Wallet = "Collection_Wallet",
  Down_Chevron = "Down-Chevron",
  Cart = "Cart",
  Chat = "Chat",
  Document_Upload = "Document_Upload",
  Error_03 = "Error_03",
  Download = "Download",
  Coin = "Coin",
  Drag = "Drag",
  Desktop = "Desktop",
  Cross = "Cross",
  Document_Image = "Document_Image",
  Error_02 = "Error_02",
  Email = "Email",
  Down_Chevron02 = "Down-Chevron02",
  Error_03_1 = "Error_03-1",
  Edit = "Edit",
  external = "external",
  Error = "Error",
  Duplicate = "Duplicate",
  Favourite_02 = "Favourite_02",
  Downgrade_Admin = "Downgrade_Admin",
  Face_ID = "Face_ID",
  Filter = "Filter",
  Forward = "Forward",
  First = "First",
  Fingerprint = "Fingerprint",
  Freeze = "Freeze",
  Error_04 = "Error_04",
  Favourite = "Favourite",
  Facebook = "Facebook",
  Info = "Info",
  Hourglass = "Hourglass",
  GasWallet = "GasWallet",
  History = "History",
  Help = "Help",
  italic = "italic",
  Info_02 = "Info_02",
  Globe = "Globe",
  Last = "Last",
  Home = "Home",
  KYC = "KYC",
  Interview = "Interview",
  Image = "Image",
  Laptop = "Laptop",
  Jail = "Jail",
  Grid = "Grid",
  Line_Chart = "Line_Chart",
  Instagram = "Instagram",
  Left_Chevron02 = "Left-Chevron02",
  List = "List",
  Location = "Location",
  Left = "Left",
  Link = "Link",
  Linkedin = "Linkedin",
  Menu = "Menu",
  Login = "Login",
  Logout = "Logout",
  Mic_On = "Mic_On",
  Minus = "Minus",
  Maximise = "Maximise",
  Minus_03 = "Minus-03",
  Lock = "Lock",
  Mnimise = "Mnimise",
  Minus_02 = "Minus-02",
  More_Horizontal = "More_Horizontal",
  Move = "Move",
  Mobile = "Mobile",
  Mic_Off = "Mic_Off",
  Notification_02 = "Notification_02",
  Numbering = "Numbering",
  Notification = "Notification",
  Money = "Money",
  Order = "Order",
  Overview = "Overview",
  Left_Chevron = "Left-Chevron",
  Reject = "Reject",
  Portfolio = "Portfolio",
  Organisation = "Organisation",
  Phone = "Phone",
  Payment = "Payment",
  Remove_User = "Remove_User",
  Reject_02 = "Reject_02",
  Refresh = "Refresh",
  Right = "Right",
  QR = "QR",
  Reverse = "Reverse",
  Pie_Chart = "Pie_Chart",
  Review = "Review",
  Print = "Print",
  Right_Chevron = "Right-Chevron",
  Review_Hidden = "Review-Hidden",
  Right_Chevron02 = "Right-Chevron02",
  Review_1 = "Review-1",
  Rotate = "Rotate",
  Search = "Search",
  RFI = "RFI",
  Scan = "Scan",
  strikethrough = "strikethrough",
  Suspend = "Suspend",
  Share = "Share",
  SpeedUp = "SpeedUp",
  Swap = "Swap",
  Star_02 = "Star_02",
  Send = "Send",
  Tick = "Tick",
  Time = "Time",
  Star = "Star",
  Thumb_Down = "Thumb_Down",
  underline = "underline",
  Tablet = "Tablet",
  Thumb_Up = "Thumb_Up",
  Setting = "Setting",
  Transfer = "Transfer",
  Unlink = "Unlink",
  Up = "Up",
  More_Vertical = "More_Vertical",
  Up_Chevron02 = "Up-Chevron02",
  Up_Chevron = "Up-Chevron",
  Suspend_User = "Suspend_User",
  Roll_Front = "Roll-Front",
  Unknown_Document = "Unknown_Document",
  Upgrade_Admin = "Upgrade_Admin",
  User = "User",
  Trash = "Trash",
  Withdrawal = "Withdrawal",
  Usergroup = "Usergroup",
  X = "X",
  Whitelist = "Whitelist",
  Whatsapp = "Whatsapp",
  Zoom_Out = "Zoom-Out",
  Zoom_In = "Zoom-In",
  Upload = "Upload",
  Wallet = "Wallet",
  Youtube = "Youtube",
  Unlock = "Unlock",
  Indicator = "Indicator",
  Bullet = "Bullet",
  Loading_Line = "Loading_Line",
  Sort = "Sort",
  Sort_Desc = "Sort_Desc",
  Sort_Asc = "Sort_Asc",
}

// 联合类型版本 - 与现有代码兼容
export type IconType =
  | "Loading"
  | "Accept_02"
  | "Accept"
  | "Add"
  | "Add_User"
  | "Add-03"
  | "Activate"
  | "Add-02"
  | "Align-left"
  | "Add_Wallet"
  | "Backward"
  | "Attach"
  | "Avatar"
  | "Bookmark"
  | "Audit_Trail"
  | "Add_Bank"
  | "ActiveWallet"
  | "a-BatchTransfers"
  | "Cloud"
  | "Call_Active"
  | "bold"
  | "Chainlink"
  | "Batch"
  | "Calendar"
  | "Cloud_Upload"
  | "Corner_Arrow_Left"
  | "Bookmark_02"
  | "Deposit"
  | "Bar_Chart"
  | "Bank"
  | "Camera"
  | "Corner_Arrow_Right"
  | "Cloud_Download"
  | "Call_HangUp"
  | "Document"
  | "Down"
  | "Downgrade"
  | "Collection_Wallet"
  | "Down-Chevron"
  | "Cart"
  | "Chat"
  | "Document_Upload"
  | "Error_03"
  | "Download"
  | "Coin"
  | "Drag"
  | "Desktop"
  | "Cross"
  | "Document_Image"
  | "Error_02"
  | "Email"
  | "Down-Chevron02"
  | "Error_03-1"
  | "Edit"
  | "external"
  | "Error"
  | "Duplicate"
  | "Favourite_02"
  | "Downgrade_Admin"
  | "Face_ID"
  | "Filter"
  | "Forward"
  | "First"
  | "Fingerprint"
  | "Freeze"
  | "Error_04"
  | "Favourite"
  | "Facebook"
  | "Info"
  | "Hourglass"
  | "GasWallet"
  | "History"
  | "Help"
  | "italic"
  | "Info_02"
  | "Globe"
  | "Last"
  | "Home"
  | "KYC"
  | "Interview"
  | "Image"
  | "Laptop"
  | "Jail"
  | "Grid"
  | "Line_Chart"
  | "Instagram"
  | "Left-Chevron02"
  | "List"
  | "Location"
  | "Left"
  | "Link"
  | "Linkedin"
  | "Menu"
  | "Login"
  | "Logout"
  | "Mic_On"
  | "Minus"
  | "Maximise"
  | "Minus-03"
  | "Lock"
  | "Mnimise"
  | "Minus-02"
  | "More_Horizontal"
  | "Move"
  | "Mobile"
  | "Mic_Off"
  | "Notification_02"
  | "Numbering"
  | "Notification"
  | "Money"
  | "Order"
  | "Overview"
  | "Left-Chevron"
  | "Reject"
  | "Portfolio"
  | "Organisation"
  | "Phone"
  | "Payment"
  | "Remove_User"
  | "Reject_02"
  | "Refresh"
  | "Right"
  | "QR"
  | "Reverse"
  | "Pie_Chart"
  | "Review"
  | "Print"
  | "Right-Chevron"
  | "Review-Hidden"
  | "Right-Chevron02"
  | "Review-1"
  | "Rotate"
  | "Search"
  | "RFI"
  | "Scan"
  | "strikethrough"
  | "Suspend"
  | "Share"
  | "SpeedUp"
  | "Swap"
  | "Star_02"
  | "Send"
  | "Tick"
  | "Time"
  | "Star"
  | "Thumb_Down"
  | "underline"
  | "Tablet"
  | "Thumb_Up"
  | "Setting"
  | "Transfer"
  | "Unlink"
  | "Up"
  | "More_Vertical"
  | "Up-Chevron02"
  | "Up-Chevron"
  | "Suspend_User"
  | "Roll-Front"
  | "Unknown_Document"
  | "Upgrade_Admin"
  | "User"
  | "Trash"
  | "Withdrawal"
  | "Usergroup"
  | "X"
  | "Whitelist"
  | "Whatsapp"
  | "Zoom-Out"
  | "Zoom-In"
  | "Upload"
  | "Wallet"
  | "Youtube"
  | "Unlock"
  | "Indicator"
  | "Bullet"
  | "Loading_Line"
  | "Sort"
  | "Sort_Desc"
  | "Sort_Asc";

export interface IconProps {
  name: IconType;
  size?: number;
  color?: string;
}

export interface IconEmits {
  (e: "click", val: MouseEvent): void;
}

export interface IconInstance {
  ref: Ref<HTMLElement | void>;
}
