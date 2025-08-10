import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function Layout() {
  return (
    <>
      <Outlet />
      <Toaster position="top-center" />
    </>
  );
}
