import * as Yup from 'yup'

export const genreSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(1, 'El nombre del género es obligatorio')
    .max(100, 'El nombre del género no puede superar los 100 caracteres')
    .matches(
      /^[\p{L}\p{M}0-9]+(?:[ -/][\p{L}\p{M}0-9]+)*$/u,
      'El nombre del género contiene caracteres inválidos'
    )
    .required('El nombre del género es requerido'),
})
