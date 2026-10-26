import * as Yup from 'yup'

export const sagaSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(1, 'El nombre de la saga es obligatorio')
    .max(150, 'El nombre de la saga no puede superar los 150 caracteres')
    .matches(
      /^(?!\d+$).+$/,
      'El nombre de la saga no puede estar compuesto exclusivamente por números'
    )
    .required('El nombre de la saga es requerido'),

  description: Yup.string()
    .trim()
    .max(500, 'La descripción no puede superar los 500 caracteres')
    .nullable()
    .transform((curr, orig) => (orig === '' || orig === undefined ? null : curr)),
})
