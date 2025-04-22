// NO PUBLICAR ESTO O SE FILTRARA EL API KEY EN EL CLIENTE
// ESTO LO HAGO PORQUE ESTOY ENFONCADO EN LA INTERFAZ
// USANDO REACT Y TYPESCRIPT

import { FromLanguage, Language } from '../types'

// DEBO CREAR UNA API PARA ESTO
const apiKey = import.meta.env.VITE_DEEPL_API_KEY
// const DEEPL_URL = 'https://api.deepl.com/v2/translate'
const DEEPL_URL = '/v2/translate'
const HEADERS = { 'Content-Type': 'application/json', 'Authorization': `DeepL-Auth-Key ${apiKey}` }

export async function translate({
  fromLanguage,
  toLanguage,
  text }: {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
}) {
  if (fromLanguage === toLanguage) return text

  const BODY = JSON.stringify({
    source_lang: fromLanguage,
    target_lang: toLanguage,
    text: [text],
  })
  try {
    const response = await fetch(DEEPL_URL, { method: 'POST', headers: HEADERS, body: BODY })
    const json = await response.json()
    return json?.translations[0]?.text
  }
  catch (error) {
    console.log(error)
  }
}
