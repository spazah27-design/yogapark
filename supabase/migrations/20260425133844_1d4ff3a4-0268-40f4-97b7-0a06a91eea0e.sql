-- Tighten the leads INSERT policy: require valid phone format and allowlisted source
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.leads;

CREATE POLICY "Allow anonymous inserts with validation"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  phone ~ '^[0-9]{10,11}$'
  AND source IN ('vdnh_landing')
  AND status = 'new'
);