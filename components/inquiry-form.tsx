"use client";
import { startTransition, useActionState, useEffect, useRef, useState, type CSSProperties, type ReactNode, type SubmitEvent } from "react";
import { ArrowRight, Check, LoaderCircle, RotateCcw } from "lucide-react";
import { submitInquiry } from "@/app/actions";
import { projectTypes, timeframes } from "@/lib/content";
import { validateInquiry, type FieldErrors, type InquiryField, type InquiryState } from "@/lib/inquiry";

const required: InquiryField[] = ["types", "zeitraum", "nachricht", "name", "email", "einwilligung"];

/** Wie viele Pflichtangaben sind schon gültig? */
function countDone(form: HTMLFormElement) {
  const check = validateInquiry(new FormData(form));
  const errs: FieldErrors = check.ok ? {} : check.errors;
  return required.filter((key) => !errs[key]).length;
}

const order: InquiryField[] = ["types", "zeitraum", "ort", "nachricht", "name", "email", "telefon", "einwilligung"];

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="field__error">
      {message}
    </p>
  );
}

function Field({
  name,
  label,
  hint,
  error,
  children,
}: {
  name: InquiryField;
  label: string;
  hint?: string;
  error?: string;
  children: (describedBy: string | undefined) => ReactNode;
}) {
  const ids = [hint && `${name}-hint`, error && `${name}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <div className="field" data-invalid={error ? "" : undefined}>
      <label htmlFor={name} className="field__label">
        {label}
      </label>
      {hint && (
        <p id={`${name}-hint`} className="field__hint">
          {hint}
        </p>
      )}
      {children(ids)}
      <ErrorText id={`${name}-error`} message={error} />
    </div>
  );
}

function Form({ onDone }: { onDone: () => void }) {
  const [state, dispatch, pending] = useActionState<InquiryState, FormData>(submitInquiry, { status: "idle" });
  const [clientErrors, setClientErrors] = useState<FieldErrors | null>(null);
  const [done, setDone] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  const errors: FieldErrors = clientErrors ?? (state.status === "error" ? state.errors : {});
  const errorCount = Object.keys(errors).length;

  const focusFirstError = (errs: FieldErrors) => {
    const first = order.find((key) => errs[key]);
    if (!first) return;
    const target = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
    target?.focus();
  };

  useEffect(() => {
    if (state.status === "error") focusFirstError(state.errors);
    if (state.status === "success") successRef.current?.focus();
  }, [state]);

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const check = validateInquiry(data);
    if (!check.ok) {
      setClientErrors(check.errors);
      focusFirstError(check.errors);
      return;
    }
    setClientErrors(null);
    // Ohne automatisches Zurücksetzen: Eingaben bleiben bei Serverfehlern erhalten
    startTransition(() => dispatch(data));
  };

  if (state.status === "success") {
    return (
      <div className="inquiry__done" role="status">
        <p className="label text-accent">Demo · nichts wurde versendet</p>
        <h3 ref={successRef} tabIndex={-1} className="display inquiry__done-title">
          Danke{state.name ? `, ${state.name.split(" ")[0]}` : ""}.
        </h3>
        <p className="mt-5 max-w-[32rem]">
          Ihre Angaben sind vollständig und wurden auf dem Server geprüft. In einer echten Umgebung
          ginge die Anfrage jetzt an die Werkstatt — in dieser Konzeptstudie wird sie weder
          gespeichert noch verschickt.
        </p>
        {state.types.length > 0 && (
          <dl className="inquiry__summary">
            <dt className="label">Projekt</dt>
            <dd>{state.types.join(", ")}</dd>
            <dt className="label">Zeitrahmen</dt>
            <dd>{state.zeitraum}</dd>
          </dl>
        )}
        <button type="button" onClick={onDone} className="action action--ghost mt-8">
          <RotateCcw size={18} aria-hidden="true" />
          Neue Anfrage beginnen
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      className="inquiry__form"
      noValidate
      // Ohne JavaScript übernimmt die Server Action (Progressive Enhancement)
      action={dispatch}
      onSubmit={onSubmit}
      onChange={(event) => {
        setDone(countDone(event.currentTarget));
        // Korrigierte Felder verlieren ihre Fehlermeldung sofort
        const target = event.target as EventTarget & { name?: string };
        const name = target.name as InquiryField;
        if (clientErrors?.[name]) {
          const rest = { ...clientErrors };
          delete rest[name];
          setClientErrors(rest);
        }
      }}
      aria-describedby="form-note"
    >
      <p id="form-note" className="inquiry__note label">
        Demo-Formular: Angaben werden geprüft, aber nicht versendet oder gespeichert.
      </p>

      <div aria-live="polite" className="sr-only">
        {errorCount > 0 ? `${errorCount} Angaben fehlen oder sind ungültig.` : ""}
      </div>

      <fieldset
        className="field"
        aria-describedby={errors.types ? "types-error" : undefined}
        data-invalid={errors.types ? "" : undefined}
      >
        <legend className="field__label">Was soll entstehen?</legend>
        <p className="field__hint">Mehrfachauswahl möglich.</p>
        <div className="chips">
          {projectTypes.map((t) => (
            <label key={t} className="chip">
              <input type="checkbox" name="types" value={t} />
              <span>
                <Check size={16} aria-hidden="true" className="chip__check" />
                {t}
              </span>
            </label>
          ))}
        </div>
        <ErrorText id="types-error" message={errors.types} />
      </fieldset>

      <fieldset
        className="field"
        aria-describedby={errors.zeitraum ? "zeitraum-error" : undefined}
        data-invalid={errors.zeitraum ? "" : undefined}
      >
        <legend className="field__label">Wann soll es fertig sein?</legend>
        <div className="chips">
          {timeframes.map((t) => (
            <label key={t} className="chip">
              <input type="radio" name="zeitraum" value={t} />
              <span>{t}</span>
            </label>
          ))}
        </div>
        <ErrorText id="zeitraum-error" message={errors.zeitraum} />
      </fieldset>

      <Field
        name="nachricht"
        label="Erzählen Sie vom Raum"
        hint="Wofür wird er genutzt, was stört heute, was soll bleiben? Grobe Maße helfen, sind aber kein Muss."
        error={errors.nachricht}
      >
        {(describedBy) => (
          <textarea
            id="nachricht"
            name="nachricht"
            rows={5}
            maxLength={2000}
            required
            aria-invalid={errors.nachricht ? true : undefined}
            aria-describedby={describedBy}
            className="input"
          />
        )}
      </Field>

      <Field name="ort" label="Ort oder Postleitzahl (optional)" error={errors.ort}>
        {(describedBy) => (
          <input
            id="ort"
            name="ort"
            type="text"
            autoComplete="postal-code"
            maxLength={80}
            aria-invalid={errors.ort ? true : undefined}
            aria-describedby={describedBy}
            className="input"
          />
        )}
      </Field>

      <div className="inquiry__pair">
        <Field name="name" label="Ihr Name" error={errors.name}>
          {(describedBy) => (
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={100}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={describedBy}
              className="input"
            />
          )}
        </Field>
        <Field name="email" label="E-Mail" error={errors.email}>
          {(describedBy) => (
            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              maxLength={200}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describedBy}
              className="input"
            />
          )}
        </Field>
      </div>

      <Field name="telefon" label="Telefon (optional)" hint="Falls Sie lieber einen Rückruf möchten." error={errors.telefon}>
        {(describedBy) => (
          <input
            id="telefon"
            name="telefon"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={40}
            aria-invalid={errors.telefon ? true : undefined}
            aria-describedby={describedBy}
            className="input"
          />
        )}
      </Field>

      {/* Honeypot — für Menschen unsichtbar und nicht fokussierbar */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="field" data-invalid={errors.einwilligung ? "" : undefined}>
        <label className="consent">
          <input
            type="checkbox"
            name="einwilligung"
            value="ja"
            aria-invalid={errors.einwilligung ? true : undefined}
            aria-describedby={errors.einwilligung ? "einwilligung-error" : undefined}
          />
          <span>
            Ich bin einverstanden, dass meine Angaben zur Beantwortung dieser Anfrage verwendet
            werden.
            {/* TODO(content): Link zur Datenschutzerklärung, Text juristisch zu prüfen */}
          </span>
        </label>
        <ErrorText id="einwilligung-error" message={errors.einwilligung} />
      </div>

      {/* Fortschritt als Maßkette; ohne JavaScript ausgeblendet, weil er dort nicht mitläuft */}
      <noscript>
        <style>{".inquiry__progress{display:none}"}</style>
      </noscript>
      <div
        className="inquiry__progress"
        data-complete={done === required.length ? "" : undefined}
        style={{ "--f": done / required.length } as CSSProperties}
      >
        <span className="inquiry__track" aria-hidden="true">
          <span className="inquiry__fill" />
        </span>
        <span className="label">
          {done === required.length
            ? "Alle Pflichtangaben vollständig"
            : `${done} von ${required.length} Pflichtangaben`}
        </span>
      </div>

      <button type="submit" className="action inquiry__submit" disabled={pending}>
        {pending ? (
          <>
            <LoaderCircle size={18} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
            Wird geprüft …
          </>
        ) : (
          <>
            Anfrage prüfen (Demo)
            <ArrowRight size={18} aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}

export function InquiryForm() {
  const [round, setRound] = useState(0);
  return <Form key={round} onDone={() => setRound((r) => r + 1)} />;
}
