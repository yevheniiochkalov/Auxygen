import * as yup from 'yup';

export const RegisterValidationSchema = yup.object({
  username: yup.string().required().min(5),
  email: yup.string().required().email(),
  password: yup.string().required().min(5),
  confirmPassword: yup
    .string()
    .required()
    .test('passwords-match', 'passwords must match', function (value) {
      return this.parent.password === value;
    }),
});

export const LoginValidationSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(5),
});

export const EmailValidationSchema = yup.object({
  email: yup.string().required().email(),
});

export const ResetPasswordValidationSchema = yup.object({
  password: yup.string().required().min(5),
  confirmPassword: yup
    .string()
    .required()
    .test('passwords-match', 'passwords must match', function (value) {
      return this.parent.password === value;
    }),
});

export const CreatePostValidationSchema = yup.object({
  text: yup.string().required(),
});

export const EditNameValidationSchema = yup.object({
  name: yup.string().required().min(2),
  username: yup.string().required().min(5),
});
