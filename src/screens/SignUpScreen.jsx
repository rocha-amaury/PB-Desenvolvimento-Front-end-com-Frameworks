import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import User from "../models/User";
import usersData from "../data/usersData.json";
import { FaFileExcel } from "react-icons/fa";

const SignUpScreen = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, fullName, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }

    const newUser = new User(uuidv4(), username, fullName, email, password);

    // Adiciona o novo usuário aos dados de usuários
    usersData.push(newUser);

    // Atualiza os dados de usuários no localStorage
    localStorage.setItem('users', JSON.stringify(usersData));
    
    console.log("Novo usuário cadastrado:", newUser);

    setFormData({
      username: "",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setErrorMessage("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        style={styles.input}
        type="text"
        name="username"
        placeholder="Nome de usuário"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        style={styles.input}
        type="text"
        name="fullName"
        placeholder="Nome completo"
        value={formData.fullName}
        onChange={handleChange}
        required
      />
      <input
        style={styles.input}
        type="email"
        name="email"
        placeholder="E-mail"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        style={styles.input}
        type="password"
        name="password"
        placeholder="Senha"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        style={styles.input}
        type="password"
        name="confirmPassword"
        placeholder="Confirmar senha"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      <button type="submit" style={styles.button}>
        Cadastrar
      </button>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: "400px",
    margin: "10px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    jusifyContent: "center",
  },

  input: {
    width: "100%",
    marginBottom: "10px",
    padding: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },

  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  error: {
    color: "red",
    marginTop: "5px",
  },
};

export default SignUpScreen;
