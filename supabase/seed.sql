-- Seed data for SoCal Stump Removal Directory
-- This creates 15 sample businesses across Southern California

-- Insert sample businesses
INSERT INTO public.businesses (
  slug, name, description, phone, email, website, address, city, county, zip_code,
  latitude, longitude, service_areas, is_featured, price_range, hours
) VALUES
-- San Diego County
(
  'precision-stump-grinding-san-diego',
  'Precision Stump Grinding',
  'Family-owned stump removal service serving San Diego County for over 15 years. We specialize in residential and commercial stump grinding with state-of-the-art equipment. Our team is fully licensed, insured, and committed to leaving your property clean and ready for your next project.',
  '(619) 555-0101',
  'info@precisionstumpsd.com',
  'https://precisionstumpsd.com',
  '4567 Mission Blvd',
  'San Diego',
  'San Diego County',
  '92109',
  32.7839,
  -117.2543,
  '["San Diego", "La Jolla", "Pacific Beach", "Mission Beach", "Ocean Beach"]'::jsonb,
  true,
  '$$',
  '{"Monday": "7:00 AM - 6:00 PM", "Tuesday": "7:00 AM - 6:00 PM", "Wednesday": "7:00 AM - 6:00 PM", "Thursday": "7:00 AM - 6:00 PM", "Friday": "7:00 AM - 6:00 PM", "Saturday": "8:00 AM - 4:00 PM", "Sunday": "Closed"}'::jsonb
),
(
  'coastal-tree-stump-removal',
  'Coastal Tree & Stump Removal',
  'Expert stump removal and tree services for North County San Diego. We offer fast, affordable stump grinding with same-day service available. Our experienced crew handles stumps of all sizes with precision and care.',
  '(760) 555-0202',
  'contact@coastaltreestump.com',
  'https://coastaltreestump.com',
  '890 Carlsbad Village Dr',
  'Carlsbad',
  'San Diego County',
  '92008',
  33.1581,
  -117.3506,
  '["Carlsbad", "Oceanside", "Vista", "Encinitas", "San Marcos"]'::jsonb,
  true,
  '$',
  '{"Monday": "6:00 AM - 7:00 PM", "Tuesday": "6:00 AM - 7:00 PM", "Wednesday": "6:00 AM - 7:00 PM", "Thursday": "6:00 AM - 7:00 PM", "Friday": "6:00 AM - 7:00 PM", "Saturday": "7:00 AM - 5:00 PM", "Sunday": "8:00 AM - 2:00 PM"}'::jsonb
),

-- Los Angeles County
(
  'la-stump-masters',
  'LA Stump Masters',
  'Los Angeles''s premier stump removal service. We provide comprehensive stump grinding and removal for residential, commercial, and municipal clients. Available 24/7 for emergency services. Free estimates and competitive pricing.',
  '(323) 555-0303',
  'service@lastumpmasters.com',
  'https://lastumpmasters.com',
  '1234 Wilshire Blvd',
  'Los Angeles',
  'Los Angeles County',
  '90017',
  34.0522,
  -118.2437,
  '["Los Angeles", "Hollywood", "Santa Monica", "Beverly Hills", "Culver City"]'::jsonb,
  true,
  '$$$',
  '{"Monday": "Open 24 Hours", "Tuesday": "Open 24 Hours", "Wednesday": "Open 24 Hours", "Thursday": "Open 24 Hours", "Friday": "Open 24 Hours", "Saturday": "Open 24 Hours", "Sunday": "Open 24 Hours"}'::jsonb
),
(
  'pasadena-stump-grinding-co',
  'Pasadena Stump Grinding Co.',
  'Professional stump grinding services for the greater Pasadena area. We use environmentally friendly methods and guarantee complete stump removal below ground level. Perfect for both residential yards and commercial properties.',
  '(626) 555-0404',
  'hello@pasadenastump.com',
  'https://pasadenastump.com',
  '567 E Colorado Blvd',
  'Pasadena',
  'Los Angeles County',
  '91101',
  34.1478,
  -118.1445,
  '["Pasadena", "Altadena", "Sierra Madre", "South Pasadena", "San Marino"]'::jsonb,
  false,
  '$$',
  '{"Monday": "7:00 AM - 5:00 PM", "Tuesday": "7:00 AM - 5:00 PM", "Wednesday": "7:00 AM - 5:00 PM", "Thursday": "7:00 AM - 5:00 PM", "Friday": "7:00 AM - 5:00 PM", "Saturday": "8:00 AM - 2:00 PM", "Sunday": "Closed"}'::jsonb
),
(
  'long-beach-tree-stump-pros',
  'Long Beach Tree & Stump Pros',
  'Trusted stump removal experts serving Long Beach and surrounding communities. We offer quick turnaround times, competitive rates, and exceptional customer service. Fully insured and licensed.',
  '(562) 555-0505',
  'info@lbstumppros.com',
  'https://lbstumppros.com',
  '2345 Pacific Coast Hwy',
  'Long Beach',
  'Los Angeles County',
  '90806',
  33.7701,
  -118.1937,
  '["Long Beach", "Signal Hill", "Lakewood", "Carson", "San Pedro"]'::jsonb,
  false,
  '$',
  '{"Monday": "7:00 AM - 6:00 PM", "Tuesday": "7:00 AM - 6:00 PM", "Wednesday": "7:00 AM - 6:00 PM", "Thursday": "7:00 AM - 6:00 PM", "Friday": "7:00 AM - 6:00 PM", "Saturday": "8:00 AM - 3:00 PM", "Sunday": "Closed"}'::jsonb
),

-- Orange County
(
  'oc-stump-removal-experts',
  'OC Stump Removal Experts',
  'Orange County''s most reliable stump removal service. Specializing in large stump removal and difficult access situations. We bring professional-grade equipment and years of experience to every job. Same-day service available.',
  '(714) 555-0606',
  'service@ocstumpexperts.com',
  'https://ocstumpexperts.com',
  '789 S Harbor Blvd',
  'Anaheim',
  'Orange County',
  '92805',
  33.8366,
  -117.9143,
  '["Anaheim", "Fullerton", "Orange", "Garden Grove", "Santa Ana"]'::jsonb,
  true,
  '$$',
  '{"Monday": "6:30 AM - 6:30 PM", "Tuesday": "6:30 AM - 6:30 PM", "Wednesday": "6:30 AM - 6:30 PM", "Thursday": "6:30 AM - 6:30 PM", "Friday": "6:30 AM - 6:30 PM", "Saturday": "7:00 AM - 4:00 PM", "Sunday": "Closed"}'::jsonb
),
(
  'irvine-professional-stump-grinding',
  'Irvine Professional Stump Grinding',
  'High-quality stump grinding services for residential and commercial properties in Irvine and South Orange County. We pride ourselves on clean work, efficient service, and customer satisfaction. Free consultations available.',
  '(949) 555-0707',
  'contact@irvinestumpgrinding.com',
  'https://irvinestumpgrinding.com',
  '456 Technology Dr',
  'Irvine',
  'Orange County',
  '92618',
  33.6846,
  -117.8265,
  '["Irvine", "Newport Beach", "Costa Mesa", "Tustin", "Lake Forest"]'::jsonb,
  false,
  '$$$',
  '{"Monday": "7:00 AM - 5:00 PM", "Tuesday": "7:00 AM - 5:00 PM", "Wednesday": "7:00 AM - 5:00 PM", "Thursday": "7:00 AM - 5:00 PM", "Friday": "7:00 AM - 5:00 PM", "Saturday": "By Appointment", "Sunday": "Closed"}'::jsonb
),
(
  'huntington-beach-stump-service',
  'Huntington Beach Stump Service',
  'Local, family-run stump removal business serving Huntington Beach and nearby coastal communities. We offer affordable rates without compromising on quality. Our friendly team ensures minimal disruption to your property.',
  '(714) 555-0808',
  'info@hbstumpservice.com',
  'https://hbstumpservice.com',
  '123 Pacific Coast Hwy',
  'Huntington Beach',
  'Orange County',
  '92648',
  33.6595,
  -117.9988,
  '["Huntington Beach", "Fountain Valley", "Westminster", "Seal Beach"]'::jsonb,
  false,
  '$',
  '{"Monday": "7:00 AM - 6:00 PM", "Tuesday": "7:00 AM - 6:00 PM", "Wednesday": "7:00 AM - 6:00 PM", "Thursday": "7:00 AM - 6:00 PM", "Friday": "7:00 AM - 6:00 PM", "Saturday": "8:00 AM - 4:00 PM", "Sunday": "Closed"}'::jsonb
),

-- Riverside County
(
  'riverside-stump-grinding-solutions',
  'Riverside Stump Grinding Solutions',
  'Professional stump grinding and removal for the Inland Empire. We handle residential, commercial, and municipal projects with equal expertise. Our modern equipment allows us to tackle any size stump efficiently.',
  '(951) 555-0909',
  'service@riversidestumpsolutions.com',
  'https://riversidestumpsolutions.com',
  '3456 Market St',
  'Riverside',
  'Riverside County',
  '92501',
  33.9533,
  -117.3962,
  '["Riverside", "Corona", "Norco", "Moreno Valley", "Jurupa Valley"]'::jsonb,
  false,
  '$$',
  '{"Monday": "6:00 AM - 6:00 PM", "Tuesday": "6:00 AM - 6:00 PM", "Wednesday": "6:00 AM - 6:00 PM", "Thursday": "6:00 AM - 6:00 PM", "Friday": "6:00 AM - 6:00 PM", "Saturday": "7:00 AM - 3:00 PM", "Sunday": "Closed"}'::jsonb
),
(
  'temecula-valley-stump-removal',
  'Temecula Valley Stump Removal',
  'Serving Temecula Valley wine country and surrounding areas with professional stump removal services. We understand the unique needs of vineyard and ranch properties. Experienced, reliable, and reasonably priced.',
  '(951) 555-1010',
  'info@temeculastump.com',
  'https://temeculastump.com',
  '789 Rancho California Rd',
  'Temecula',
  'Riverside County',
  '92590',
  33.4936,
  -117.1484,
  '["Temecula", "Murrieta", "Wildomar", "Lake Elsinore", "Menifee"]'::jsonb,
  true,
  '$',
  '{"Monday": "7:00 AM - 5:00 PM", "Tuesday": "7:00 AM - 5:00 PM", "Wednesday": "7:00 AM - 5:00 PM", "Thursday": "7:00 AM - 5:00 PM", "Friday": "7:00 AM - 5:00 PM", "Saturday": "8:00 AM - 2:00 PM", "Sunday": "Closed"}'::jsonb
),

-- San Bernardino County
(
  'san-bernardino-stump-masters',
  'San Bernardino Stump Masters',
  'Expert stump grinding and removal for San Bernardino and the High Desert. We provide fast, professional service with competitive pricing. Our team is equipped to handle the toughest stumps in any terrain.',
  '(909) 555-1111',
  'contact@sbstumpmasters.com',
  'https://sbstumpmasters.com',
  '567 E Hospitality Ln',
  'San Bernardino',
  'San Bernardino County',
  '92408',
  34.1083,
  -117.2898,
  '["San Bernardino", "Highland", "Redlands", "Loma Linda", "Colton"]'::jsonb,
  false,
  '$',
  '{"Monday": "6:30 AM - 6:00 PM", "Tuesday": "6:30 AM - 6:00 PM", "Wednesday": "6:30 AM - 6:00 PM", "Thursday": "6:30 AM - 6:00 PM", "Friday": "6:30 AM - 6:00 PM", "Saturday": "7:00 AM - 4:00 PM", "Sunday": "Closed"}'::jsonb
),
(
  'rancho-cucamonga-tree-stump-service',
  'Rancho Cucamonga Tree & Stump Service',
  'Full-service tree care and stump removal for the Rancho Cucamonga area. Family-owned business with over 20 years of experience. We take pride in our work and customer satisfaction is our top priority.',
  '(909) 555-1212',
  'service@rcstumpservice.com',
  'https://rcstumpservice.com',
  '890 Foothill Blvd',
  'Rancho Cucamonga',
  'San Bernardino County',
  '91730',
  34.1064,
  -117.5931,
  '["Rancho Cucamonga", "Fontana", "Ontario", "Upland", "Chino"]'::jsonb,
  false,
  '$$',
  '{"Monday": "7:00 AM - 5:00 PM", "Tuesday": "7:00 AM - 5:00 PM", "Wednesday": "7:00 AM - 5:00 PM", "Thursday": "7:00 AM - 5:00 PM", "Friday": "7:00 AM - 5:00 PM", "Saturday": "8:00 AM - 3:00 PM", "Sunday": "Closed"}'::jsonb
),

-- Additional businesses for variety
(
  'emergency-stump-removal-socal',
  'Emergency Stump Removal SoCal',
  '24/7 emergency stump removal services across Southern California. Storm damage? Fallen tree? We respond quickly to urgent situations. Our mobile crews are ready to help when you need it most.',
  '(800) 555-1313',
  'emergency@stumpremovalsocal.com',
  'https://stumpremovalsocal.com',
  '123 Main St',
  'Los Angeles',
  'Los Angeles County',
  '90001',
  34.0522,
  -118.2437,
  '["Los Angeles County", "Orange County", "San Diego County", "Riverside County", "San Bernardino County"]'::jsonb,
  true,
  '$$$',
  '{"Monday": "Open 24 Hours", "Tuesday": "Open 24 Hours", "Wednesday": "Open 24 Hours", "Thursday": "Open 24 Hours", "Friday": "Open 24 Hours", "Saturday": "Open 24 Hours", "Sunday": "Open 24 Hours"}'::jsonb
),
(
  'eco-friendly-stump-grinding',
  'Eco-Friendly Stump Grinding',
  'Environmentally conscious stump removal using sustainable practices. We recycle all wood chips and offer mulch delivery. Serving all of Orange County with green solutions for your stump removal needs.',
  '(714) 555-1414',
  'info@ecostumpgrinding.com',
  'https://ecostumpgrinding.com',
  '456 Green Valley Rd',
  'Santa Ana',
  'Orange County',
  '92705',
  33.7455,
  -117.8677,
  '["Santa Ana", "Orange", "Tustin", "Costa Mesa", "Irvine"]'::jsonb,
  false,
  '$$',
  '{"Monday": "7:00 AM - 5:00 PM", "Tuesday": "7:00 AM - 5:00 PM", "Wednesday": "7:00 AM - 5:00 PM", "Thursday": "7:00 AM - 5:00 PM", "Friday": "7:00 AM - 5:00 PM", "Saturday": "8:00 AM - 2:00 PM", "Sunday": "Closed"}'::jsonb
),
(
  'budget-stump-removal',
  'Budget Stump Removal',
  'Affordable stump grinding without compromising quality. We serve homeowners and small businesses throughout San Diego County. No job too small, free quotes, and same-day service when available.',
  '(619) 555-1515',
  'contact@budgetstumpremoval.com',
  'https://budgetstumpremoval.com',
  '234 University Ave',
  'San Diego',
  'San Diego County',
  '92103',
  32.7488,
  -117.1473,
  '["San Diego", "Chula Vista", "National City", "El Cajon", "La Mesa"]'::jsonb,
  false,
  '$',
  '{"Monday": "8:00 AM - 5:00 PM", "Tuesday": "8:00 AM - 5:00 PM", "Wednesday": "8:00 AM - 5:00 PM", "Thursday": "8:00 AM - 5:00 PM", "Friday": "8:00 AM - 5:00 PM", "Saturday": "9:00 AM - 2:00 PM", "Sunday": "Closed"}'::jsonb
);

-- Assign categories to businesses
INSERT INTO public.business_categories (business_id, category_id)
SELECT b.id, c.id
FROM public.businesses b
CROSS JOIN public.categories c
WHERE
  (b.slug = 'precision-stump-grinding-san-diego' AND c.slug IN ('residential', 'grinding', 'full-removal'))
  OR (b.slug = 'coastal-tree-stump-removal' AND c.slug IN ('residential', 'grinding'))
  OR (b.slug = 'la-stump-masters' AND c.slug IN ('residential', 'commercial', 'emergency', 'grinding', 'full-removal', 'large-stumps'))
  OR (b.slug = 'pasadena-stump-grinding-co' AND c.slug IN ('residential', 'commercial', 'grinding'))
  OR (b.slug = 'long-beach-tree-stump-pros' AND c.slug IN ('residential', 'grinding', 'full-removal'))
  OR (b.slug = 'oc-stump-removal-experts' AND c.slug IN ('residential', 'commercial', 'large-stumps', 'full-removal'))
  OR (b.slug = 'irvine-professional-stump-grinding' AND c.slug IN ('residential', 'commercial', 'grinding'))
  OR (b.slug = 'huntington-beach-stump-service' AND c.slug IN ('residential', 'grinding'))
  OR (b.slug = 'riverside-stump-grinding-solutions' AND c.slug IN ('residential', 'commercial', 'grinding', 'large-stumps'))
  OR (b.slug = 'temecula-valley-stump-removal' AND c.slug IN ('residential', 'commercial', 'full-removal'))
  OR (b.slug = 'san-bernardino-stump-masters' AND c.slug IN ('residential', 'grinding', 'large-stumps'))
  OR (b.slug = 'rancho-cucamonga-tree-stump-service' AND c.slug IN ('residential', 'commercial', 'grinding', 'full-removal'))
  OR (b.slug = 'emergency-stump-removal-socal' AND c.slug IN ('emergency', 'residential', 'commercial', 'grinding', 'full-removal', 'large-stumps'))
  OR (b.slug = 'eco-friendly-stump-grinding' AND c.slug IN ('residential', 'commercial', 'grinding'))
  OR (b.slug = 'budget-stump-removal' AND c.slug IN ('residential', 'grinding'));

-- Add sample reviews
INSERT INTO public.reviews (business_id, author_name, rating, comment)
SELECT b.id, r.author_name, r.rating, r.comment
FROM public.businesses b
CROSS JOIN (VALUES
  ('John Smith', 5, 'Excellent service! They removed a massive oak stump from my backyard quickly and efficiently. Very professional crew.'),
  ('Sarah Johnson', 5, 'Highly recommend! Fair pricing and they cleaned up everything perfectly. Will definitely use again.'),
  ('Mike Davis', 4, 'Great job overall. Showed up on time and got the work done. Would have liked a bit more communication during the process.'),
  ('Emily Chen', 5, 'Best stump removal service in the area. They were able to handle a difficult stump that other companies said was too hard.')
) AS r(author_name, rating, comment)
WHERE b.slug = 'precision-stump-grinding-san-diego'
LIMIT 4;

INSERT INTO public.reviews (business_id, author_name, rating, comment)
SELECT b.id, r.author_name, r.rating, r.comment
FROM public.businesses b
CROSS JOIN (VALUES
  ('Robert Wilson', 5, 'Fast and affordable! Called them in the morning and they came same day. Couldn''t be happier.'),
  ('Linda Martinez', 4, 'Good service at a reasonable price. A couple small wood chips left behind but overall very satisfied.'),
  ('David Brown', 5, 'These guys are pros. Removed three stumps from my property in under two hours. Amazing!')
) AS r(author_name, rating, comment)
WHERE b.slug = 'coastal-tree-stump-removal'
LIMIT 3;

INSERT INTO public.reviews (business_id, author_name, rating, comment)
SELECT b.id, r.author_name, r.rating, r.comment
FROM public.businesses b
CROSS JOIN (VALUES
  ('Jessica Taylor', 5, 'Available 24/7 was a lifesaver when a tree fell during a storm. They came out immediately!'),
  ('Thomas Anderson', 5, 'Professional crew, top-notch equipment. Worth every penny for the quality of work.'),
  ('Maria Garcia', 4, 'Great service but a bit pricey. However, they do excellent work so I understand the cost.'),
  ('James Williams', 5, 'Used them for a commercial property. Handled everything perfectly and worked around our business hours.')
) AS r(author_name, rating, comment)
WHERE b.slug = 'la-stump-masters'
LIMIT 4;

-- Add more reviews for other businesses
INSERT INTO public.reviews (business_id, author_name, rating, comment)
SELECT b.id, 'Customer ' || generate_series, 4 + (random() * 1)::int,
  CASE
    WHEN random() < 0.33 THEN 'Great service! Very professional and efficient.'
    WHEN random() < 0.66 THEN 'Excellent work. Would recommend to friends and family.'
    ELSE 'Very satisfied with the stump removal service. Good value for money.'
  END
FROM public.businesses b
CROSS JOIN generate_series(1, 3)
WHERE b.slug NOT IN ('precision-stump-grinding-san-diego', 'coastal-tree-stump-removal', 'la-stump-masters');

-- The seed script is complete. Businesses now have reviews and the ratings will be automatically calculated by the trigger.
