// // src/components/UsersInsertScreen.js
// import React, { useState } from 'react';
// import { faker } from '@faker-js/faker';

// const UsersInsertScreen = () => {
//   const baseUrl = "https://pb-forum-14fbe-default-rtdb.firebaseio.com/";

//   const [isLoading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);

//   const [user, setUser] = useState({
//     userId: '',
//     username: '',
//     name: '',
//     email: '',
//     avatar: '',
//     password: '',
//     points: 0,
//     badges: ['']
//   });

//   const [passwordConfirm, setPasswordConfirm] = useState('');
//   const [errors, setErrors] = useState({});

//   const styles = {
//     container: {
//       backgroundColor: '#333',
//       color: '#fff',
//       padding: '1rem',
//       textAlign: 'center',
//     },
//     form: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//     },
//     input: {
//       margin: '0.5rem',
//       padding: '0.5rem',
//       width: '80%',
//       borderRadius: '4px',
//       border: '1px solid #ddd',
//     },
//     button: {
//       margin: '1rem',
//       padding: '0.5rem 1rem',
//       backgroundColor: '#007bff',
//       color: '#fff',
//       border: 'none',
//       borderRadius: '4px',
//       cursor: 'pointer',
//     },
//     error: {
//       color: 'red',
//       marginBottom: '1rem',
//     },
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prevUser) => ({ ...prevUser, [name]: value }));
//   };

//   const handlePasswordConfirmChange = (e) => {
//     setPasswordConfirm(e.target.value);
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (user.password.length < 8) {
//       newErrors.password = 'A senha deve ter no mínimo 8 caracteres.';
//     }
//     if (user.password !== passwordConfirm) {
//       newErrors.passwordConfirm = 'As senhas não coincidem.';
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const onAddUser = (user) => {
//     fetch(`${baseUrl}/users.json`, {
//       method: 'post',
//       header: { 'Content-Type': 'application/json', },
//       body: JSON.stringify(user),
//     }).then(_ => setMessage("Salvo com sucesso!"))
//     .catch(error => setMessage(error.message))
//     .finally(setLoading(false));
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       const newUser = { ...user, userId: faker.string.uuid() }
//       onAddUser(newUser);
//       setUser({
//         userId: '',
//         username: '',
//         name: '',
//         email: '',
//         avatar: '',
//         password: '',
//         points: 0,
//         badges: []
//       });
//       setPasswordConfirm('');
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Novo Usuário</h2>
//       <section>
//         {message && <p>{message}</p>}
//         {isLoading && <p>Carregando...</p>}
//       </section>
//       <form style={styles.form} onSubmit={handleSubmit}>
//         <input
//           style={styles.input}
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={user.username}
//           onChange={handleChange}
//         />
//         <input
//           style={styles.input}
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={user.name}
//           onChange={handleChange}
//         />
//         <input
//           style={styles.input}
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={user.email}
//           onChange={handleChange}
//         />
//         <input
//           style={styles.input}
//           type="text"
//           name="avatar"
//           placeholder="Avatar URL"
//           value={user.avatar}
//           onChange={handleChange}
//         />
//         <input
//           style={styles.input}
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={user.password}
//           onChange={handleChange}
//         />
//         <input
//           style={styles.input}
//           type="password"
//           placeholder="Confirm Password"
//           value={passwordConfirm}
//           onChange={handlePasswordConfirmChange}
//         />
//         {errors.password && <p style={styles.error}>{errors.password}</p>}
//         {errors.passwordConfirm && <p style={styles.error}>{errors.passwordConfirm}</p>}
//         <button style={styles.button} type="submit">Add User</button>
//       </form>
//     </div>
//   );
// };

// export default UsersInsertScreen;

// src/components/UsersInsertScreen.js
import React, { useState } from "react";
import { faker } from "@faker-js/faker";
import { useFormik } from "formik";
import * as yup from "yup";

const UsersInsertScreen = () => {
  const baseUrl = "https://pb-forum-14fbe-default-rtdb.firebaseio.com/";
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const styles = {
    container: {
      backgroundColor: "#333",
      color: "#fff",
      padding: "1rem",
      textAlign: "center",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    input: {
      margin: "0.5rem",
      padding: "0.5rem",
      width: "80%",
      borderRadius: "4px",
      border: "1px solid #ddd",
    },
    button: {
      margin: "1rem",
      padding: "0.5rem 1rem",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    error: {
      color: "red",
      marginBottom: "1rem",
    },
  };

  const validationSchema = yup.object({
    username: yup.string().required("Username é obrigatório"),
    name: yup.string().required("Name é obrigatório"),
    email: yup
      .string()
      .email("Formato de e-mail inválido")
      .required("Email é obrigatório"),
    avatar: yup.string().url('URL inválida').nullable(),
    password: yup
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres.")
      .required("Senha é obrigatória."),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas não coincidem.")
      .required("A confirmação de senha é obrigatória"),
  });

  const formik = useFormik({
    initialValues: {
      userId: "",
      username: "",
      name: "",
      email: "",
      avatar: "",
      password: "",
      passwordConfirm: "",
      points: 0,
      badges: [''],
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      const newUser = { 
        ...values, 
        userId: faker.string.uuid(), 
        avatar: values.avatar || 'https://avatars.githubusercontent.com/u/97552180'
      };
      delete newUser.passwordConfirm;
      onAddUser(newUser);
      resetForm();
    },
  });

  const onAddUser = (user) => {
    fetch(`${baseUrl}/users.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((_) => setMessage("Salvo com sucesso!"))
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false));
  };

  return (
    <div style={styles.container}>
      <h2>Novo Usuário</h2>
      <section>
        {message && <p>{message}</p>}
        {isLoading && <p>Carregando...</p>}
      </section>
      <form style={styles.form} onSubmit={formik.handleSubmit}>
        <input
          style={styles.input}
          type="text"
          name="username"
          placeholder="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.username && formik.errors.username ? (
          <p style={styles.error}>{formik.errors.username}</p>
        ) : null}

        <input
          style={styles.input}
          type="text"
          name="name"
          placeholder="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name ? (
          <p style={styles.error}>{formik.errors.name}</p>
        ) : null}

        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <p style={styles.error}>{formik.errors.email}</p>
        ) : null}

        <input
          style={styles.input}
          type="text"
          name="avatar"
          placeholder="Avatar URL"
          value={formik.values.avatar}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.avatar && formik.errors.avatar ? (
          <p style={styles.error}>{formik.errors.avatar}</p>
        ) : null}

        <input
          style={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password ? (
          <p style={styles.error}>{formik.errors.password}</p>
        ) : null}

        <input
          style={styles.input}
          type="password"
          name="passwordConfirm"
          placeholder="Confirm Password"
          value={formik.values.passwordConfirm}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
          <p style={styles.error}>{formik.errors.passwordConfirm}</p>
        ) : null}

        <button style={styles.button} type="submit">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default UsersInsertScreen;
