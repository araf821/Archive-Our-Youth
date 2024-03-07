"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ModalProvider from "./modals/ModalProvider";
import { Toaster } from "sonner";
import SidebarProvider from "./navbar/SidebarProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors position="bottom-center" theme="dark" />
      <ModalProvider />
      <SidebarProvider />
      {children}
    </QueryClientProvider>
  );
};

export default Providers;
