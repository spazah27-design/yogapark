import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

interface LeadFormProps {
  buttonText?: string;
  onSuccess?: () => void;
}

const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, "");
  const d = digits.startsWith("7") ? digits.slice(1) : digits.startsWith("8") ? digits.slice(1) : digits;
  let result = "+7";
  if (d.length > 0) result += " (" + d.slice(0, 3);
  if (d.length >= 3) result += ") " + d.slice(3, 6);
  if (d.length >= 6) result += "-" + d.slice(6, 8);
  if (d.length >= 8) result += "-" + d.slice(8, 10);
  return result;
};

const LeadForm = ({ buttonText = "Оставить номер и получить приглашение", onSuccess }: LeadFormProps) => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw.length <= 11) {
      setPhone(formatPhone(raw));
      setError("");
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
      // TODO: Connect to Supabase
      // const { error } = await supabase.from('leads').insert({ phone: digits, source: 'vdnh_landing' });
      
      // Yandex Metrika event
      if (typeof window !== "undefined" && (window as any).ym) {
        (window as any).ym((window as any).YM_ID, "reachGoal", "lead_submit");
      }
      
      console.log("Lead submitted:", digits);
      onSuccess?.();
    } catch {
      setError("Ошибка отправки. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-md">
      <input
        ref={inputRef}
        type="tel"
        value={phone}
        onChange={handleChange}
        placeholder="+7 (___) ___-__-__"
        className="w-full px-4 py-3.5 rounded-lg border border-border bg-background text-foreground text-base font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 text-base font-medium rounded-lg"
      >
        {loading ? "Отправка..." : buttonText}
      </Button>
    </form>
  );
};

export default LeadForm;
