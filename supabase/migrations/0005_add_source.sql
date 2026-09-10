-- Add source column to contact_messages to distinguish chat widget from contact form
alter table contact_messages add column if not exists source text default 'contact_form';
