import * as React from "react";

interface ClaimVerificationEmailProps {
  businessName: string;
  verificationUrl: string;
  ownerName: string;
}

export function ClaimVerificationEmail({
  businessName,
  verificationUrl,
  ownerName,
}: ClaimVerificationEmailProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ backgroundColor: "#16a34a", padding: "20px", color: "white" }}>
        <h1 style={{ margin: 0, fontSize: "24px" }}>Verify Your Business Claim</h1>
      </div>

      <div style={{ padding: "20px", backgroundColor: "#f9fafb" }}>
        <p style={{ fontSize: "16px", color: "#374151" }}>
          Hello {ownerName},
        </p>

        <p style={{ fontSize: "16px", color: "#374151" }}>
          You have requested to claim <strong>{businessName}</strong> on SoCal Stump Removal Directory.
        </p>

        <p style={{ fontSize: "16px", color: "#374151" }}>
          To complete your claim and verify that you are the owner of this business, please click the button below:
        </p>

        <div style={{ textAlign: "center", margin: "30px 0" }}>
          <a
            href={verificationUrl}
            style={{
              backgroundColor: "#16a34a",
              color: "white",
              padding: "14px 28px",
              textDecoration: "none",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: "bold",
              display: "inline-block",
            }}
          >
            Verify Business Claim
          </a>
        </div>

        <p style={{ fontSize: "14px", color: "#6b7280" }}>
          Or copy and paste this link into your browser:
        </p>
        <p style={{ fontSize: "14px", color: "#16a34a", wordBreak: "break-all" }}>
          {verificationUrl}
        </p>

        <div style={{ backgroundColor: "#fef3c7", padding: "16px", borderRadius: "8px", marginTop: "20px", borderLeft: "4px solid #f59e0b" }}>
          <p style={{ fontSize: "14px", color: "#92400e", margin: 0 }}>
            <strong>Security Note:</strong> This link will expire in 24 hours. If you did not request to claim this business, please ignore this email.
          </p>
        </div>
      </div>

      <div style={{ padding: "20px", backgroundColor: "#e5e7eb", textAlign: "center" }}>
        <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
          This email was sent from SoCal Stump Removal Directory
        </p>
      </div>
    </div>
  );
}

interface ContactEmailProps {
  businessName: string;
  name: string;
  email: string;
  phone?: string;
  serviceType: string;
  message: string;
}

export function ContactEmail({
  businessName,
  name,
  email,
  phone,
  serviceType,
  message,
}: ContactEmailProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ backgroundColor: "#16a34a", padding: "20px", color: "white" }}>
        <h1 style={{ margin: 0, fontSize: "24px" }}>New Contact Form Submission</h1>
      </div>

      <div style={{ padding: "20px", backgroundColor: "#f9fafb" }}>
        <p style={{ fontSize: "16px", color: "#374151" }}>
          You have received a new contact form submission for <strong>{businessName}</strong>.
        </p>

        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", marginTop: "20px" }}>
          <h2 style={{ fontSize: "18px", color: "#111827", marginTop: 0 }}>Contact Information</h2>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td style={{ padding: "8px 0", color: "#6b7280", fontWeight: "bold", width: "120px" }}>Name:</td>
                <td style={{ padding: "8px 0", color: "#111827" }}>{name}</td>
              </tr>
              <tr>
                <td style={{ padding: "8px 0", color: "#6b7280", fontWeight: "bold" }}>Email:</td>
                <td style={{ padding: "8px 0", color: "#111827" }}>
                  <a href={`mailto:${email}`} style={{ color: "#16a34a", textDecoration: "none" }}>
                    {email}
                  </a>
                </td>
              </tr>
              {phone && (
                <tr>
                  <td style={{ padding: "8px 0", color: "#6b7280", fontWeight: "bold" }}>Phone:</td>
                  <td style={{ padding: "8px 0", color: "#111827" }}>
                    <a href={`tel:${phone}`} style={{ color: "#16a34a", textDecoration: "none" }}>
                      {phone}
                    </a>
                  </td>
                </tr>
              )}
              <tr>
                <td style={{ padding: "8px 0", color: "#6b7280", fontWeight: "bold" }}>Service Type:</td>
                <td style={{ padding: "8px 0", color: "#111827" }}>{serviceType}</td>
              </tr>
            </tbody>
          </table>

          <div style={{ marginTop: "20px" }}>
            <h3 style={{ fontSize: "16px", color: "#111827", marginBottom: "8px" }}>Message:</h3>
            <p style={{ color: "#374151", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>{message}</p>
          </div>
        </div>

        <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "20px" }}>
          Please respond to this lead as soon as possible to increase your conversion rate.
        </p>
      </div>

      <div style={{ padding: "20px", backgroundColor: "#e5e7eb", textAlign: "center" }}>
        <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
          This email was sent from SoCal Stump Removal Directory
        </p>
      </div>
    </div>
  );
}

interface QuoteEmailProps {
  businessName: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  propertySize: string;
  stumpCount: string;
  urgency: string;
  message?: string;
}

export function QuoteEmail({
  businessName,
  name,
  email,
  phone,
  serviceType,
  propertySize,
  stumpCount,
  urgency,
  message,
}: QuoteEmailProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ backgroundColor: "#16a34a", padding: "20px", color: "white" }}>
        <h1 style={{ margin: 0, fontSize: "24px" }}>New Quote Request</h1>
      </div>

      <div style={{ padding: "20px", backgroundColor: "#f9fafb" }}>
        <p style={{ fontSize: "16px", color: "#374151" }}>
          You have received a new quote request for <strong>{businessName}</strong>.
        </p>

        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", marginTop: "20px" }}>
          <h2 style={{ fontSize: "18px", color: "#111827", marginTop: 0 }}>Contact Information</h2>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td style={{ padding: "8px 0", color: "#6b7280", fontWeight: "bold", width: "140px" }}>Name:</td>
                <td style={{ padding: "8px 0", color: "#111827" }}>{name}</td>
              </tr>
              <tr>
                <td style={{ padding: "8px 0", color: "#6b7280", fontWeight: "bold" }}>Email:</td>
                <td style={{ padding: "8px 0", color: "#111827" }}>
                  <a href={`mailto:${email}`} style={{ color: "#16a34a", textDecoration: "none" }}>
                    {email}
                  </a>
                </td>
              </tr>
              <tr>
                <td style={{ padding: "8px 0", color: "#6b7280", fontWeight: "bold" }}>Phone:</td>
                <td style={{ padding: "8px 0", color: "#111827" }}>
                  <a href={`tel:${phone}`} style={{ color: "#16a34a", textDecoration: "none" }}>
                    {phone}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", marginTop: "20px" }}>
          <h2 style={{ fontSize: "18px", color: "#111827", marginTop: 0 }}>Project Details</h2>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td style={{ padding: "8px 0", color: "#6b7280", fontWeight: "bold", width: "140px" }}>Service Type:</td>
                <td style={{ padding: "8px 0", color: "#111827" }}>{serviceType}</td>
              </tr>
              <tr>
                <td style={{ padding: "8px 0", color: "#6b7280", fontWeight: "bold" }}>Property Size:</td>
                <td style={{ padding: "8px 0", color: "#111827" }}>{propertySize}</td>
              </tr>
              <tr>
                <td style={{ padding: "8px 0", color: "#6b7280", fontWeight: "bold" }}>Number of Stumps:</td>
                <td style={{ padding: "8px 0", color: "#111827" }}>{stumpCount}</td>
              </tr>
              <tr>
                <td style={{ padding: "8px 0", color: "#6b7280", fontWeight: "bold" }}>Urgency:</td>
                <td style={{ padding: "8px 0", color: "#111827" }}>
                  <span style={{
                    backgroundColor: urgency === "urgent" ? "#fef2f2" : "#f0fdf4",
                    color: urgency === "urgent" ? "#dc2626" : "#16a34a",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "14px"
                  }}>
                    {urgency}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          {message && (
            <div style={{ marginTop: "20px" }}>
              <h3 style={{ fontSize: "16px", color: "#111827", marginBottom: "8px" }}>Additional Details:</h3>
              <p style={{ color: "#374151", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>{message}</p>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: "#fef3c7", padding: "16px", borderRadius: "8px", marginTop: "20px", borderLeft: "4px solid #f59e0b" }}>
          <p style={{ fontSize: "14px", color: "#92400e", margin: 0 }}>
            <strong>Action Required:</strong> This customer is requesting a quote. Respond quickly to increase your chances of winning this job!
          </p>
        </div>
      </div>

      <div style={{ padding: "20px", backgroundColor: "#e5e7eb", textAlign: "center" }}>
        <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
          This email was sent from SoCal Stump Removal Directory
        </p>
      </div>
    </div>
  );
}
