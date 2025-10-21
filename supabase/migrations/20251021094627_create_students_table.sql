/*
  # Create Students Table

  1. New Tables
    - `students`
      - `id` (uuid, primary key) - Links to auth.users
      - `email` (text, unique, not null)
      - `name` (text, not null)
      - `gender` (text)
      - `class` (text)
      - `roll_number` (text)
      - `phone` (text)
      - `parent_phone` (text)
      - `address` (text)
      - `profile_picture` (text)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `students` table
    - Add policy for authenticated users to read their own data
    - Add policy for authenticated users to update their own data
*/

CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  gender text,
  class text,
  roll_number text,
  phone text,
  parent_phone text,
  address text,
  profile_picture text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can read own data"
  ON students
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Students can update own data"
  ON students
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Students can insert own data"
  ON students
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);
