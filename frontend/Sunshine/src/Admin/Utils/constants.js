import { faServicestack } from "@fortawesome/free-brands-svg-icons";
import {
  faTachometerAlt,
  faCalendarAlt,
  faLightbulb,
  faNewspaper,
  faImages,
  faHospital,
  faUsers,
  faHandHoldingHeart,
  faUserPlus,
  faUser,
  faChartLine,
  faDonate,
  faUsersCog,
  faClipboardList,
  faCog,
  faSignOutAlt,
  faBell,
  faSearch,
  faEdit,
  faTrash,
  faPlus,
  faEye,
  faDownload,
  faFilter,
  faSort,
  faChevronDown,
  faBars,
  faTimes,
  faHome,
  faProjectDiagram,
  faCamera,
  faUserFriends,
  faHeart,
  faChartBar,
  faFileAlt,
  faStar,
  faSuitcase,
  faMessage,
  faEarListen,
  faPaperclip,
  faHeartbeat,
  faThermometer,
} from "@fortawesome/free-solid-svg-icons";

export const APP_CONFIG = {
  name: "Empathy Foundation",
  description: "Mental Health Awareness & Support",
  instagram: {
    manoday: "https://www.instagram.com/manoday_hospital/",
    sunshine: "https://www.instagram.com/sunshinecounsellingnashik/",
  },
  theme: {
    primary: "#1e3c72", // Dark Blue
    secondary: "#f47058", // Coral Orange
    accent: "#2a5298", // Light Blue
    background: "#f8fafc",
    text: {
      primary: "#1e3c72",
      secondary: "#2a5298",
      light: "#94a3b8",
    },
  },
};

export const SIDEBAR_MENU = [
  {
    title: "Dashboard",
    icon: faTachometerAlt,
    path: "/admin",
  },
  {
    title: "Events",
    icon: faCalendarAlt,
    path: "/admin/events",
  },
  {
    title: "Blogs",
    icon: faFileAlt,
    path: "/admin/Blogss",
  },
  {
    title: "Appointments",
    icon: faNewspaper,
    path: "/admin/AdminAppoint",
  },
  {
    title: "Reviews",
    icon: faStar,
    path: "/admin/Reviews",
  },
  {
    title: "Hospitals",
    icon: faHospital,
    path: "/admin/hospitals",
  },
  {
    title: "Team",
    icon: faUsersCog,
    path: "/admin/team",
  },
  {
    title: "Jobs",
    icon: faSuitcase,
    path: "/admin/Jobs",
  },
  {
    title: "Services",
    icon: faServicestack,
    path: "/admin/Services",
  },
  {
    title: "Therapy",
    icon: faHeartbeat,
    path: "/admin/AdminTherapy",
  },
  // {
  //   title: "Tests",
  //   icon: faThermometer,
  //   path: "/admin/AdminTest",
  // },
  {
    title: "Messages",
    icon: faMessage,
    path: "/admin/AdminMessages",
  },
  {
    title: "Enquiries",
    icon: faEarListen,
    path: "/admin/AdminEnquiries",
  },
  {
    title: "Articles",
    icon: faPaperclip,
    path: "/admin/AdminArticles",
  },
];

export const NOTIFICATIONS = [
  {
    id: 1,
    title: "New Volunteer Registration",
    message:
      "Anita Sharma has registered as a volunteer for the Mental Health Workshop",
    time: "5 min ago",
    type: "success",
    unread: true,
    icon: faUserPlus,
  },
  {
    id: 2,
    title: "Donation Received",
    message: "New donation of ₹5,000 received from Rajesh Kumar",
    time: "1 hour ago",
    type: "info",
    unread: true,
    icon: faDonate,
  },
  {
    id: 3,
    title: "Event Reminder",
    message: "Mental Health Workshop starts in 2 days. Finalize preparations.",
    time: "2 hours ago",
    type: "warning",
    unread: false,
    icon: faCalendarAlt,
  },
  {
    id: 4,
    title: "New Blog Comment",
    message:
      "Someone commented on your latest blog post about anxiety management",
    time: "1 day ago",
    type: "info",
    unread: false,
    icon: faNewspaper,
  },
  {
    id: 5,
    title: "Team Member Added",
    message: "Dr. Priya Sharma has been added to the counseling team",
    time: "2 days ago",
    type: "success",
    unread: false,
    icon: faUsers,
  },
];
