import { createClient } from '@supabase/supabase-js';


export const supabaseUrl = 'https://yuwzuaxykyllopazkmlz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1d3p1YXh5a3lsbG9wYXprbWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU0NjMzNTUsImV4cCI6MjAyMTAzOTM1NX0.Q_Y0pNOsVPkt2-DyXsL9S80DWLs3Ouyn8pEUKmr0dCk'
const supabase = createClient(supabaseUrl, supabaseKey);

export const supabase2 = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storageKey: "s1",
    },
});
  

export default supabase;