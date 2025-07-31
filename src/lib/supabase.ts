import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://npjbjhwuwvfraepvzuvz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wamJqaHd1d3ZmcmFlcHZ6dXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4ODU1NTcsImV4cCI6MjA2OTQ2MTU1N30.KUX8rSxUPgwA9qrUsjnYl31DHT9dV_0qUtZDqdwTs9I'
)