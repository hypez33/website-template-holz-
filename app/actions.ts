"use server";
import { validateInquiry, type InquiryState } from "@/lib/inquiry";

/**
 * Demo-Endpunkt: validiert serverseitig, versendet aber nichts und speichert nichts.
 * TODO(content): Für einen echten Versand Mail-Dienst, Rate Limiting und
 * Datenschutzhinweise ergänzen (juristisch zu prüfen).
 */
export async function submitInquiry(_prev: InquiryState, form: FormData): Promise<InquiryState> {
  // Honeypot: Bots füllen das versteckte Feld aus — still „erfolgreich“ beenden
  const trap = form.get("website");
  if (typeof trap === "string" && trap !== "") {
    return { status: "success", name: "", types: [], zeitraum: "" };
  }

  const result = validateInquiry(form);
  if (!result.ok) return { status: "error", errors: result.errors };

  return {
    status: "success",
    name: result.data.name,
    types: result.data.types,
    zeitraum: result.data.zeitraum,
  };
}
