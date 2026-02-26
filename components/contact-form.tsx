"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type SubmitState = "idle" | "loading" | "success" | "error";

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  location: string;
  budget: string;
  timeline: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  fullName: "",
  email: "",
  phone: "",
  projectType: "",
  location: "",
  budget: "",
  timeline: "",
  message: "",
};

const projectTypes = ["Residencial", "Hotel", "Interior", "Masterplan", "Consultoría"] as const;
const budgetRanges = ["<$50k", "$50–150k", "$150–300k", "$300k+"] as const;
const timelineRanges = ["ASAP", "1–3 meses", "3–6 meses", "6+ meses"] as const;

function validateField(name: keyof FormValues, value: string): string {
  if (name === "fullName" && !value.trim()) return "Ingresa tu nombre completo.";
  if (name === "email") {
    if (!value.trim()) return "Ingresa tu correo electrónico.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Ingresa un correo válido.";
  }
  if (name === "message") {
    if (!value.trim()) return "Escribe un mensaje breve sobre tu proyecto.";
    if (value.trim().length < 20) return "Añade un poco más de detalle (mínimo 20 caracteres).";
  }
  return "";
}

function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  (Object.keys(values) as Array<keyof FormValues>).forEach((key) => {
    const error = validateField(key, values[key]);
    if (error) errors[key] = error;
  });
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  const visibleErrors = useMemo(() => {
    const mapped: FormErrors = {};
    (Object.keys(errors) as Array<keyof FormValues>).forEach((key) => {
      if (touched[key]) mapped[key] = errors[key];
    });
    return mapped;
  }, [errors, touched]);

  const onChange = (name: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    const nextError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: nextError || undefined }));
    if (submitState !== "idle") setSubmitState("idle");
  };

  const onBlur = (name: keyof FormValues) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const nextError = validateField(name, values[name]);
    setErrors((prev) => ({ ...prev, [name]: nextError || undefined }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const nextTouched = (Object.keys(values) as Array<keyof FormValues>).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Partial<Record<keyof FormValues, boolean>>);

    setTouched(nextTouched);
    const formErrors = validateForm(values);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      setSubmitState("error");
      return;
    }

    setSubmitState("loading");

    try {
      // TODO: Replace with your email/API endpoint integration.
      await new Promise((resolve) => window.setTimeout(resolve, 1100));
      setSubmitState("success");
      setValues(initialValues);
      setTouched({});
      setErrors({});
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-paper-alt)] p-5 shadow-[0_10px_28px_rgba(0,0,0,0.08)] sm:p-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre completo" required error={visibleErrors.fullName}>
          <Input value={values.fullName} onChange={(value) => onChange("fullName", value)} onBlur={() => onBlur("fullName")} />
        </Field>

        <Field label="Correo electrónico" required error={visibleErrors.email}>
          <Input type="email" value={values.email} onChange={(value) => onChange("email", value)} onBlur={() => onBlur("email")} />
        </Field>

        <Field label="Teléfono" error={visibleErrors.phone}>
          <Input value={values.phone} onChange={(value) => onChange("phone", value)} onBlur={() => onBlur("phone")} />
        </Field>

        <Field label="Tipo de proyecto" error={visibleErrors.projectType}>
          <Select
            value={values.projectType}
            onChange={(value) => onChange("projectType", value)}
            onBlur={() => onBlur("projectType")}
            placeholder="Selecciona"
            options={projectTypes}
          />
        </Field>

        <Field label="Ubicación (ciudad/país)" error={visibleErrors.location}>
          <Input value={values.location} onChange={(value) => onChange("location", value)} onBlur={() => onBlur("location")} />
        </Field>

        <Field label="Rango de presupuesto" error={visibleErrors.budget}>
          <Select
            value={values.budget}
            onChange={(value) => onChange("budget", value)}
            onBlur={() => onBlur("budget")}
            placeholder="Selecciona"
            options={budgetRanges}
          />
        </Field>

        <Field label="Cronograma" error={visibleErrors.timeline}>
          <Select
            value={values.timeline}
            onChange={(value) => onChange("timeline", value)}
            onBlur={() => onBlur("timeline")}
            placeholder="Selecciona"
            options={timelineRanges}
          />
        </Field>

        <div className="hidden sm:block" />
      </div>

      <div className="mt-4">
        <Field label="Mensaje" required error={visibleErrors.message}>
          <textarea
            value={values.message}
            onChange={(event) => onChange("message", event.target.value)}
            onBlur={() => onBlur("message")}
            rows={5}
            className="w-full resize-none border border-[color:var(--color-border)] bg-[color:var(--color-paper)] px-3 py-3 text-sm outline-none transition-colors focus:border-[color:var(--color-border-strong)]"
            placeholder="Cuéntanos alcance, objetivos y contexto del encargo."
          />
        </Field>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={submitState === "loading"}
          className="inline-flex min-h-11 items-center justify-center border border-[color:var(--color-ink)] bg-[color:var(--color-ink)] px-5 text-xs tracking-[0.2em] uppercase text-[color:var(--color-paper)] transition-opacity hover:opacity-90 disabled:opacity-70"
        >
          {submitState === "loading" ? "Enviando..." : "Enviar solicitud"}
        </button>
        <a href="#" className="text-xs tracking-[0.2em] uppercase text-[color:var(--color-muted-2)] transition-opacity hover:opacity-70">
          Agendar una llamada
        </a>
        <a href="#" className="text-xs tracking-[0.2em] uppercase text-[color:var(--color-muted-2)] transition-opacity hover:opacity-70">
          WhatsApp
        </a>
      </div>

      <div className="mt-4 min-h-5 text-sm">
        {submitState === "success" ? <p className="text-[color:var(--color-muted-1)]">Gracias. Responderemos en 24–48h hábiles.</p> : null}
        {submitState === "error" && Object.keys(errors).length === 0 ? (
          <p className="text-[color:var(--color-muted-1)]">No pudimos enviar tu solicitud. Intenta de nuevo en unos minutos.</p>
        ) : null}
      </div>
    </motion.form>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="space-y-2">
      <span className="text-[11px] tracking-[0.16em] uppercase text-[color:var(--color-muted-3)]">
        {label} {required ? "*" : ""}
      </span>
      {children}
      {error ? <p className="text-xs text-[color:var(--color-muted-2)]">{error}</p> : null}
    </label>
  );
}

function Input({
  value,
  type = "text",
  onChange,
  onBlur,
}: {
  value: string;
  type?: "text" | "email";
  onChange: (value: string) => void;
  onBlur: () => void;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
      className="h-11 w-full border border-[color:var(--color-border)] bg-[color:var(--color-paper)] px-3 text-sm outline-none transition-colors focus:border-[color:var(--color-border-strong)]"
    />
  );
}

function Select({
  value,
  options,
  placeholder,
  onChange,
  onBlur,
}: {
  value: string;
  options: readonly string[];
  placeholder: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
      className="h-11 w-full border border-[color:var(--color-border)] bg-[color:var(--color-paper)] px-3 text-sm outline-none transition-colors focus:border-[color:var(--color-border-strong)]"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

