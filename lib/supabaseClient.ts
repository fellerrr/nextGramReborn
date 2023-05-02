import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY


// if (supabaseKey ) {
//   // supabaseKey не undefined
//   export const supabase = createClient(supabaseUrl, supabaseKey)
// } else {
//   // supabaseKey undefined
//   // обработать ошибку или выбросить исключение
// }

export const supabase = createClient(supabaseUrl!, supabaseKey!)