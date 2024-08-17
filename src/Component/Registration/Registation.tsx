import { FC } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useAuth } from './../Authentical/AuthContecst'; // Импортируйте useAuth
import "./Regist.scss"; 

const authSchema = Yup.object().shape({
  login: Yup.string()
    .min(6, "Недостаточная длина логина")
    .matches(/^[a-zA-Z][a-zA-Z0-9]*$/, "Введите логин латинскими символами")
    .required("Обязательное поле"),
  password: Yup.string()
    .min(6, "Недостаточная длина пароля")
    .matches(/^[a-zA-Z].*$/, "Пароль должен начинаться с латинской буквы")
    .required("Обязательное поле"),
});

const Auth: FC = () => {
  const { login } = useAuth(); // Получит функцию login из контекста

  const initialFormValues = {
    login: "",
    password: "",
  };

  const handleSubmit = (values: { login: string; password: string }) => {
    login(values.login, values.password); // Используйт функцию login для аутентификации
  };

  return (
    <div className="auth">
      <Formik
        validationSchema={authSchema}
        initialValues={initialFormValues}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="auth__form">
            <h2>Регистрация</h2>
            <Field
              name="login"
              placeholder="Логин"
              className={
                errors.login && touched.login
                  ? "auth__input auth__input--error"
                  : "auth__input"
              }
            />
            {errors.login && touched.login ? (
              <div className="auth__error">{errors.login}</div>
            ) : null}

            <Field
              name="password"
              type="password"
              placeholder="Пароль"
              className={
                errors.password && touched.password
                  ? "auth__input auth__input--error"
                  : "auth__input"
              }
            />
            {errors.password && touched.password ? (
              <div className="auth__error">{errors.password}</div>
            ) : null}

            <button type="submit" className="auth__button">
              Войти
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Auth;


