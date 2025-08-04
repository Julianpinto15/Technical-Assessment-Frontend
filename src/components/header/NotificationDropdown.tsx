import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Link } from "react-router";
import { useDashboardNotifications } from "../../hooks/useDashboardNotifications";
import { format, parseISO } from "date-fns";

export default function NotificationDropdown() {
  const {
    data: notifications,
    loading,
    error,
    hasUnread,
    setHasUnread,
  } = useDashboardNotifications();
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const handleClick = () => {
    toggleDropdown();
    // Marcar notificaciones como leídas (quitar el punto naranja)
    if (hasUnread) {
      setTimeout(() => setHasUnread(false), 0);
    }
  };

  return (
    <div className="relative">
      <button
        className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full dropdown-toggle hover:text-gray-700 h-11 w-11 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        onClick={handleClick}
      >
        <span
          className={`absolute right-0 top-0.5 z-10 h-2 w-2 rounded-full bg-orange-400 ${
            !hasUnread ? "hidden" : "flex"
          }`}
        >
          <span className="absolute inline-flex w-full h-full bg-orange-400 rounded-full opacity-75 animate-ping"></span>
        </span>
        <svg
          className="fill-current"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.75 2.29248C10.75 1.87827 10.4143 1.54248 10 1.54248C9.58583 1.54248 9.25004 1.87827 9.25004 2.29248V2.83613C6.08266 3.20733 3.62504 5.9004 3.62504 9.16748V14.4591H3.33337C2.91916 14.4591 2.58337 14.7949 2.58337 15.2091C2.58337 15.6234 2.91916 15.9591 3.33337 15.9591H4.37504H15.625H16.6667C17.0809 15.9591 17.4167 15.6234 17.4167 15.2091C17.4167 14.7949 17.0809 14.4591 16.6667 14.4591H16.375V9.16748C16.375 5.9004 13.9174 3.20733 10.75 2.83613V2.29248ZM14.875 14.4591V9.16748C14.875 6.47509 12.6924 4.29248 10 4.29248C7.30765 4.29248 5.12504 6.47509 5.12504 9.16748V14.4591H14.875ZM8.00004 17.7085C8.00004 18.1228 8.33583 18.4585 8.75004 18.4585H11.25C11.6643 18.4585 12 18.1228 12 17.7085C12 17.2943 11.6643 16.9585 11.25 16.9585H8.75004C8.33583 16.9585 8.00004 17.2943 8.00004 17.7085Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute -right-[240px] mt-[17px] flex h-[480px] w-[350px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark sm:w-[361px] lg:right-0"
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-700">
          <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Notificaciones
          </h5>
          <button
            onClick={toggleDropdown}
            className="text-gray-500 transition dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <svg
              className="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        {loading ? (
          <p className="text-gray-500 text-sm p-4">
            Cargando notificaciones...
          </p>
        ) : error ? (
          <p className="text-red-500 text-sm p-4">{error}</p>
        ) : notifications.length === 0 ? (
          <p className="text-gray-500 text-sm p-4">
            No hay notificaciones pendientes.
          </p>
        ) : (
          <ul className="flex flex-col h-auto overflow-y-auto custom-scrollbar">
            {notifications.map((notification) => (
              <li key={notification.id}>
                <DropdownItem
                  onItemClick={closeDropdown}
                  className="flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
                >
                  <span className="relative block w-full h-10 rounded-full z-1 max-w-10">
                    <span
                      className={`absolute inset-0 flex items-center justify-center rounded-full ${
                        notification.type === "alert"
                          ? "bg-red-500/10"
                          : "bg-blue-500/10"
                      }`}
                    >
                      <svg
                        className={`fill-current ${
                          notification.type === "alert"
                            ? "text-red-500"
                            : "text-blue-500"
                        }`}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10 2.5C7.65279 2.5 5.83337 4.31942 5.83337 6.66667V10.8333C5.83337 11.5174 5.51739 12.1592 4.97487 12.5659L4.16671 13.3333C3.79892 13.7011 3.75004 14.2659 4.05229 14.6833C4.35454 15.1008 4.89754 15.2083 5.31254 14.9667L5.83337 14.6667H14.1667L14.6875 14.9667C15.1025 15.2083 15.6455 15.1008 15.9478 14.6833C16.25 14.2659 16.2011 13.7011 15.8334 13.3333L15.0252 12.5659C14.4827 12.1592 14.1667 11.5174 14.1667 10.8333V6.66667C14.1667 4.31942 12.3473 2.5 10 2.5ZM10 18.3333C10.9167 18.3333 11.6667 17.5833 11.6667 16.6667H8.33337C8.33337 17.5833 9.08337 18.3333 10 18.3333Z"
                        />
                      </svg>
                    </span>
                  </span>
                  <span className="block">
                    <span className="mb-1.5 block text-theme-sm text-gray-500 dark:text-gray-400">
                      {notification.message}
                    </span>
                    <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400">
                      {notification.sku ? (
                        <>
                          <span>SKU: {notification.sku}</span>
                          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        </>
                      ) : null}
                      <span>
                        {notification.type === "alert" ? "Alerta" : "Info"}
                      </span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      <span>
                        {format(
                          parseISO(notification.timestamp),
                          "dd/MM/yyyy HH:mm"
                        )}
                      </span>
                    </span>
                  </span>
                </DropdownItem>
              </li>
            ))}
          </ul>
        )}
        <Link
          to="/notifications"
          className="block px-4 py-2 mt-3 text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          Ver Todas las Notificaciones
        </Link>
      </Dropdown>
    </div>
  );
}
