/* eslint-disable @next/next/no-img-element */
interface EmailTemplateProps {
  email: string;
  message: string;
}

export const EmailTemplate = ({ email, message }: EmailTemplateProps) => (
  <div
    style={{
      backgroundColor: "#18181b",
      padding: "1rem",
      borderRadius: "0.5rem",
      border: "2px solid #252525",
    }}
  >
    <p style={{ fontSize: "1.25rem", color: "white", marginBottom: "0.5rem" }}>
      <span style={{ fontWeight: "semibold", fontSize: "1rem" }}>From:</span>{" "}
      <span style={{ color: "#5465ff" }}>{email}</span>
    </p>
    <p
      style={{ color: "#f5f5f5", whiteSpace: "pre-line", fontSize: "1.25rem" }}
    >
      <span style={{ fontWeight: "semibold", fontSize: "1rem" }}>Message:</span>
      {message}
    </p>
  </div>
);
