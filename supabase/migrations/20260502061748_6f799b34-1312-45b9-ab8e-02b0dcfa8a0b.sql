-- Update RLS policy on leads to allow new source 'turgenevskaya_landing'
DROP POLICY IF EXISTS "Anyone can insert leads with valid data" ON public.leads;

CREATE POLICY "Anyone can insert leads with valid data"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  phone ~ '^[0-9]{10,11}$'
  AND source IN ('vdnh_landing', 'turgenevskaya_landing')
  AND status = 'new'
);