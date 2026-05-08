CREATE TABLE public.park_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text NOT NULL,
  park text,
  format text,
  source text NOT NULL DEFAULT 'parks_landing',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.park_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert park leads with valid data"
ON public.park_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  phone ~ '^[0-9]{10,11}$'
  AND source = 'parks_landing'
  AND status = 'new'
);

CREATE POLICY "No public reads on park_leads"
ON public.park_leads
FOR SELECT
TO public
USING (false);