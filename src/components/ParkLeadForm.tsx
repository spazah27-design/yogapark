import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const PARKS = [
  "Сад Эрмитаж",
  "Сад Аквариум / Маяковская",
  "Патриаршие пруды",
  "Екатерининский / Делегатский парк",
  "Парк Горького / Музеон",
  "ВДНХ / Останкино",
  "Другой парк — обсудить",
];

export const FORMATS = ["Мини-группа", "Индивидуально", "Пока не знаю"];

const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, "");
  const d = digits.startsWith("7") || digits.startsWith("8") ? digits.slice(1) : digits;
  let result = "+7";
  if (d.length > 0) result += " (" + d.slice(0, 3);
  if (d.length >= 3) result += ") " + d.slice(3, 6);
  if (d.length >= 6) result += "-" + d.slice(6, 8);
  if (d.length >= 8) result += "-" + d.slice(8, 10);
  return result;
};

const getUtm = () => {
  if (typeof window === "undefined") return {} as Record<string, string | null>;
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source"),
    utm_medium: p.get("utm_medium"),
    utm_campaign: p.get("utm_campaign"),
    utm_content: p.get("utm_content"),
    utm_term: p.get("utm_term"),
  };
};

const trackYM = (goal: string, params?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && (window as any).ym) {
    (window as any).ym((window as any).YM_ID, "reachGoal", goal, params);
  }
};

interface Props {
  buttonText?: string;
  onSuccess?: () => void;
  formId?: string;
}

const ParkLeadForm = ({ buttonText = "Оставить номер", onSuccess, formId = "park-form" }: Props) => {
  const [park, setPark] = useState("");
  const [format, setFormat] = useState("");
  const [phone, setPhone] = useState("");
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw.length <= 11) {
      setPhone(formatPhone(raw));
      setError("");
      if (!touched) {
        trackYM("form_start");
        setTouched(true);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 11) {
      setError("Введите корректный номер телефона");
      return;
    }
    setLoading(true);
    try {
      const utm = getUtm();
      const payload = {
        phone: digits,
        park: park || null,
        format: format || null,
        source: "parks_landing",
        ...utm,
      };

      const { error: dbError } = await supabase.from("park_leads").insert(payload);
      if (dbError) throw dbError;

      supabase.functions
        .invoke("notify-lead", {
          body: { ...payload, source: "parks_landing" },
        })
        .catch(console.error);

      trackYM("lead_submit", { park, format });
      onSuccess?.();
    } catch {
      setError("Ошибка отправки. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full" id={formId}>
      {/* Park select */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">Удобный парк</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {PARKS.map((p) => (
            <button
              type="button"
              key={p}
              onClick={() => {
                setPark(p);
                trackYM("park_select", { park: p });
              }}
              className={`text-left px-3 py-2.5 rounded-lg border text-sm transition ${
                park === p
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-card text-foreground hover:bg-secondary/60"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <label htmlFor={`${formId}-phone`} className="block text-sm font-medium text-foreground">
          Телефон
        </label>
        <input
          id={`${formId}-phone`}
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={handlePhone}
          placeholder="+7 (___) ___-__-__"
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
        />
      </div>

      {/* Format segmented */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Формат <span className="text-muted-foreground font-normal">(необязательно)</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {FORMATS.map((f) => (
            <button
              type="button"
              key={f}
              onClick={() => {
                setFormat(f);
                trackYM("format_select", { format: f });
              }}
              className={`px-2 py-2 rounded-lg border text-sm transition ${
                format === f
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-card text-foreground hover:bg-secondary/60"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" disabled={loading} className="w-full py-3.5 text-base font-medium rounded-lg">
        {loading ? "Отправка..." : buttonText}
      </Button>

      <p className="text-xs text-muted-foreground leading-relaxed">
        Я свяжусь с вами, уточню парк, погоду и ближайшее удобное окно. После заявки открою доступ в закрытый канал с расписанием и наборами.
      </p>
    </form>
  );
};

export default ParkLeadForm;