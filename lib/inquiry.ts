import { z } from "zod";
import { projectTypes, timeframes } from "./content";

/** Gemeinsames Schema für Client-Vorprüfung und serverseitige Validierung. */
export const inquirySchema = z.object({
  types: z.array(z.enum(projectTypes)).min(1, { error: "Bitte wählen Sie mindestens eine Projektart." }),
  zeitraum: z.enum(timeframes, { error: "Bitte wählen Sie einen ungefähren Zeitrahmen." }),
  ort: z.string().trim().max(80, { error: "Bitte höchstens 80 Zeichen." }).optional(),
  nachricht: z
    .string()
    .trim()
    .min(20, { error: "Beschreiben Sie Ihr Vorhaben in ein, zwei Sätzen (mindestens 20 Zeichen)." })
    .max(2000, { error: "Bitte höchstens 2000 Zeichen." }),
  name: z
    .string()
    .trim()
    .min(2, { error: "Bitte geben Sie Ihren Namen an." })
    .max(100, { error: "Bitte höchstens 100 Zeichen." }),
  email: z
    .string()
    .trim()
    .max(200, { error: "Bitte höchstens 200 Zeichen." })
    .pipe(z.email({ error: "Bitte geben Sie eine gültige E-Mail-Adresse an, z. B. name@beispiel.de." })),
  telefon: z
    .string()
    .trim()
    .max(40, { error: "Bitte höchstens 40 Zeichen." })
    .regex(/^[+\d\s()/-]*$/, { error: "Bitte nur Ziffern, Leerzeichen und + ( ) / -." })
    .optional(),
  einwilligung: z.literal("ja", { error: "Bitte bestätigen Sie, dass wir Ihre Angaben dafür verwenden dürfen." }),
});

export type InquiryField = keyof z.input<typeof inquirySchema>;
export type FieldErrors = Partial<Record<InquiryField, string>>;

export type InquiryState =
  | { status: "idle" }
  | { status: "error"; errors: FieldErrors }
  | { status: "success"; name: string; types: string[]; zeitraum: string };

const optional = (value: FormDataEntryValue | null) =>
  typeof value === "string" && value.trim() !== "" ? value : undefined;

export function readInquiry(form: FormData) {
  return {
    types: form.getAll("types").filter((v): v is string => typeof v === "string"),
    zeitraum: form.get("zeitraum") ?? undefined,
    ort: optional(form.get("ort")),
    nachricht: form.get("nachricht") ?? "",
    name: form.get("name") ?? "",
    email: form.get("email") ?? "",
    telefon: optional(form.get("telefon")),
    einwilligung: form.get("einwilligung") ?? undefined,
  };
}

export function validateInquiry(form: FormData) {
  const result = inquirySchema.safeParse(readInquiry(form));
  if (result.success) return { ok: true as const, data: result.data };
  const flat = z.flattenError(result.error).fieldErrors as Partial<Record<InquiryField, string[]>>;
  const errors: FieldErrors = {};
  for (const [key, messages] of Object.entries(flat) as Array<[InquiryField, string[] | undefined]>) {
    if (messages?.[0]) errors[key] = messages[0];
  }
  return { ok: false as const, errors };
}
