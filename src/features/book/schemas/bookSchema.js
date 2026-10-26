import * as Yup from 'yup'

const currentYear = new Date().getFullYear()

export const bookSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(1, 'El título es obligatorio')
    .max(255, 'El título no puede superar los 255 caracteres')
    .required('El título es requerido'),

  publicationYear: Yup.number()
    .typeError('El año debe ser un número válido')
    .integer('El año debe ser un número entero')
    .min(1000, 'Año de publicación inválido')
    .max(currentYear, 'El año no puede ser en el futuro')
    .required('El año de publicación es requerido'),

  authorId: Yup.number()
    .typeError('Debés seleccionar un autor')
    .integer('El ID debe ser un número entero')
    .positive('El ID debe ser positivo')
    .required('Debés seleccionar un autor'),

  genreId: Yup.number()
    .typeError('Debés seleccionar un género')
    .integer('El ID debe ser un número entero')
    .positive('El ID debe ser positivo')
    .required('Debés seleccionar un género'),

  shelfId: Yup.number()
    .typeError('Debés seleccionar un estante')
    .integer('El ID debe ser un número entero')
    .positive('El ID debe ser positivo')
    .required('Debés seleccionar un estante'),

  sagaId: Yup.number()
    .typeError('El ID de la saga debe ser un número')
    .integer('Debe ser un número entero')
    .nullable()
    .transform((curr, orig) => (orig === '' || orig === undefined ? null : curr)),

  isbn: Yup.string()
    .trim()
    .max(50, 'El ISBN no puede superar los 50 caracteres')
    .matches(
      /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/,
      'El ISBN debe contener 10 o 13 dígitos y solo puede incluir números y guiones'
    )
    .nullable()
    .transform((curr, orig) => (orig === '' || orig === undefined ? null : curr)),

  synopsis: Yup.string()
    .trim()
    .nullable()
    .transform((curr, orig) => (orig === '' || orig === undefined ? null : curr)),

  sagaOrder: Yup.number()
    .typeError('El orden de la saga debe ser un número')
    .integer('Debe ser un número entero')
    .nullable()
    .transform((curr, orig) => (orig === '' || orig === undefined ? null : curr)),
})
