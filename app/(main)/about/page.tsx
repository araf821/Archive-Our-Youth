import EmptyState from "@/components/EmptyState";

const AboutPage = () => {
  return (
    <EmptyState
      title="Coming Soon"
      description="Please check out the other pages while we work on building up this page!"
      link={{ label: "View Posts", route: "/home" }}
    />
  );
};
export default AboutPage;
