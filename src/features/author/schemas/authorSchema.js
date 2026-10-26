import * as Yup from 'yup'

export const authorSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(1, 'El nombre es obligatorio')
    .max(100, 'El nombre no puede superar los 100 caracteres')
    .matches(
      /^[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)*$/u,
      'El nombre solo puede contener letras, espacios, guiones o apóstrofes y no puede contener números'
    )
    .required('El nombre es obligatorio'),

  nacionalidad: Yup.string()
    .trim()
    .min(1, 'La nacionalidad es obligatoria')
    .max(255, 'La nacionalidad no puede superar los 255 caracteres')
    .matches(
      /^[\p{L}\p{M}]+(?:[ -][\p{L}\p{M}]+)*$/u,
      'La nacionalidad solo puede contener letras, espacios o guiones y no puede contener números'
    )
    .required('La nacionalidad es obligatoria'),

  biografia: Yup.string()
    .trim()
    .min(1, 'La biografía es obligatoria')
    .max(255, 'La biografía no puede superar los 255 caracteres')
    .required('La biografía es obligatoria'),
})
