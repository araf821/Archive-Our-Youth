import EmptyState from "@/components/EmptyState";

const NotFoundPage = () => {
  return (
    <EmptyState
      classNames="h-[100dvh]"
      description="Could not find the resource you are looking for."
      link={{ label: "Back to Home", route: "/home" }}
    />
  );
};

export default NotFoundPage;
