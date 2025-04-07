/*
  # Add contractor_id to contractor_requests table

  1. Changes
    - Add contractor_id column to contractor_requests table
    - Add budget and timeline columns
    - Add message column for project details
*/

ALTER TABLE contractor_requests
ADD COLUMN contractor_id text,
ADD COLUMN budget numeric,
ADD COLUMN timeline text,
ADD COLUMN message text;