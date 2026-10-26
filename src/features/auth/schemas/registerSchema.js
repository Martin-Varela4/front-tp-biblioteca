import * as Yup from 'yup'

export const registerSchema = Yup.object({
  username: Yup.string()
    .trim()
    .min(3, 'El usuario debe tener al menos 3 caracteres')
    .max(100, 'El usuario no puede tener más de 100 caracteres')
    .matches(
      /^(?=.*[\p{L}\p{M}])[\p{L}\p{M}0-9_-]+$/u,
      'El usuario solo puede contener letras, números, guiones y guiones bajos, y no puede estar compuesto exclusivamente por números'
    )
    .required('El nombre de usuario es obligatorio'),

  email: Yup.string()
    .trim()
    .email('El correo electrónico no es válido')
    .required('El correo electrónico es obligatorio'),

  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(72, 'La contraseña no puede tener más de 72 caracteres')
    .required('La contraseña es obligatoria'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Repetí la contraseña'),
})
