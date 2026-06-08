import { Resend } from "resend";

function asTrimmedString(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function asStringArray(value, maxItems = 20, maxLength = 180) {
  return Array.isArray(value)
    ? value
        .filter((item) => typeof item === "string")
        .slice(0, maxItems)
        .map((item) => item.trim().slice(0, maxLength))
        .filter(Boolean)
    : [];
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderEmailValue(value) {
  return value ? escapeHtml(value) : '<span style="color:#8d9aa6;">Not specified</span>';
}

function renderEmailPills(items) {
  if (!items.length) return '<span style="color:#8d9aa6;">Not specified</span>';

  return items
    .map(
      (item) => `
        <span style="display:inline-block;margin:0 6px 7px 0;padding:8px 11px;border:1px solid #d7e0e8;border-radius:999px;background:#f7fafc;color:#202124;font-size:13px;line-height:1.1;">
          ${escapeHtml(item)}
        </span>
      `,
    )
    .join("");
}

function renderBookingEmail({ fullName, phone, previousVisit, visitGoals, concerns, painFrequency, painIntensity, problem }) {
  const submittedAt = new Date().toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Tallinn",
  });

  const card = (icon, label, value) => `
    <td style="width:50%;padding:7px;vertical-align:top;">
      <div style="min-height:112px;padding:16px;border:1px solid #dbe5ee;border-radius:16px;background:#ffffff;box-shadow:0 12px 32px rgba(54,72,88,.07);">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
          <tr>
            <td style="width:42px;vertical-align:top;">
              <div style="width:34px;height:34px;border:1px solid #d7e0e8;border-radius:999px;background:#edf3f8;color:#202124;text-align:center;font-size:17px;line-height:34px;">${icon}</div>
            </td>
            <td style="vertical-align:top;">
              <div style="margin-bottom:6px;color:#7f8f9c;font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;">${escapeHtml(label)}</div>
              <div style="color:#202124;font-size:15px;line-height:1.45;">${value}</div>
            </td>
          </tr>
        </table>
      </div>
    </td>
  `;

  const row = (left, right) => `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
      <tr>${left}${right}</tr>
    </table>
  `;

  const wideCard = (icon, label, value) => `
    <div style="margin:7px;padding:18px;border:1px solid #dbe5ee;border-radius:16px;background:#ffffff;box-shadow:0 12px 32px rgba(54,72,88,.07);">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
        <tr>
          <td style="width:42px;vertical-align:top;">
            <div style="width:34px;height:34px;border:1px solid #d7e0e8;border-radius:999px;background:#edf3f8;color:#202124;text-align:center;font-size:17px;line-height:34px;">${icon}</div>
          </td>
          <td style="vertical-align:top;">
            <div style="margin-bottom:8px;color:#7f8f9c;font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;">${escapeHtml(label)}</div>
            <div style="color:#202124;font-size:15px;line-height:1.5;">${value}</div>
          </td>
        </tr>
      </table>
    </div>
  `;

  return `
    <div style="margin:0;padding:32px;background:#edf3f8;font-family:Inter,Arial,sans-serif;color:#202124;line-height:1.5;">
      <div style="max-width:760px;margin:0 auto;">
        <div style="overflow:hidden;border:1px solid #d7e0e8;border-radius:24px;background:#f7fafc;box-shadow:0 26px 80px rgba(54,72,88,.14);">
          <div style="padding:26px 28px 24px;background:linear-gradient(135deg,#ffffff 0%,#edf3f8 100%);border-bottom:1px solid #d7e0e8;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
              <tr>
                <td style="vertical-align:middle;">
                  <div style="font-family:Georgia,'Times New Roman',serif;color:#202124;font-size:33px;line-height:.88;letter-spacing:.18em;">Caninus</div>
                  <div style="margin-top:7px;color:#202124;font-size:11px;letter-spacing:.34em;">Hambaravi</div>
                </td>
                <td style="vertical-align:middle;text-align:right;">
                  <span style="display:inline-block;padding:9px 12px;border:1px solid #d7e0e8;border-radius:999px;background:#ffffff;color:#202124;font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;">New request</span>
                </td>
              </tr>
            </table>
            <h1 style="margin:26px 0 0;color:#202124;font-size:30px;line-height:1.05;font-weight:750;">Consultation request</h1>
            <p style="max-width:560px;margin:12px 0 0;color:#647482;font-size:15px;">
              A patient submitted the website booking form. Please contact them to confirm the appointment time.
            </p>
          </div>

          <div style="padding:18px 18px 8px;background:#edf3f8;">
            ${row(
              card("&#128100;", "Patient", renderEmailValue(fullName)),
              card("&#9742;", "Contact phone", renderEmailValue(phone)),
            )}
            ${row(
              card("&#10003;", "Previous clinic visit", renderEmailValue(previousVisit)),
              card("&#128197;", "Submitted", escapeHtml(submittedAt)),
            )}
            ${wideCard("&#9877;", "Visit goal", renderEmailPills(visitGoals))}
            ${wideCard("&#10010;", "What is bothering the patient", renderEmailPills(concerns))}
            ${row(
              card("&#9201;", "Pain frequency", renderEmailValue(painFrequency)),
              card("&#9888;", "Pain intensity", renderEmailValue(painIntensity)),
            )}
            ${wideCard(
              "&#9998;",
              "Additional complaint",
              problem ? escapeHtml(problem).replaceAll("\n", "<br>") : '<span style="color:#8d9aa6;">Not specified</span>',
            )}
          </div>

          <div style="padding:15px 25px 20px;background:#edf3f8;color:#7f8f9c;font-size:12px;border-top:1px solid #d7e0e8;">
            Sent by Caninus website
          </div>
        </div>
      </div>
    </div>
  `;
}

function normalizeBody(body) {
  if (!body) return {};
  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return typeof body === "object" ? body : {};
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const body = normalizeBody(req.body);
  const fullName = asTrimmedString(body.fullName, 120);
  const phone = asTrimmedString(body.phone, 80);
  const previousVisit = asTrimmedString(body.previousVisit, 120);
  const visitGoals = asStringArray(body.visitGoals);
  const concerns = asStringArray(body.concerns);
  const painFrequency = asTrimmedString(body.painFrequency, 160);
  const painIntensity = asTrimmedString(body.painIntensity, 240);
  const problem = asTrimmedString(body.problem, 1200);

  if (!fullName || !phone) {
    res.status(400).json({ error: "Name and phone are required." });
    return;
  }

  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "re_xxxxxxxxx") {
    res.status(500).json({ error: "Resend API key is not configured." });
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "no-reply@caninus.ee",
    to: process.env.CONTACT_EMAIL || "caninushambakliinik@gmail.com",
    // cc: process.env.CONTACT_CC_EMAIL || "jegorbakunin@gmail.com",
    subject: `Caninus consultation request from ${fullName}`,
    html: renderBookingEmail({ fullName, phone, previousVisit, visitGoals, concerns, painFrequency, painIntensity, problem }),
  });

  if (error) {
    console.error("Resend email error:", error);
    res.status(502).json({ error: "Email provider failed to send the message." });
    return;
  }

  res.status(200).json({ id: data?.id || null });
}
