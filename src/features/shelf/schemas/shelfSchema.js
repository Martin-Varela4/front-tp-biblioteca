import * as Yup from 'yup'

export const shelfSchema = Yup.object({
  code: Yup.string()
    .trim()
    .min(1, 'El código del estante es obligatorio')
    .max(50, 'El código del estante no puede superar los 50 caracteres')
    .matches(
      /^EST-[A-Za-z0-9]+$/,
      "El código del estante debe comenzar con 'EST-' seguido de caracteres alfanuméricos (ej: EST-A1, EST-04)"
    )
    .required('El código del estante es obligatorio'),

  description: Yup.string()
    .trim()
    .max(255, 'La descripción no puede superar los 255 caracteres')
    .nullable()
    .transform((curr, orig) => (orig === '' || orig === undefined ? null : curr)),
})
