import styles from "./Header.module.css";
import { FaGithub } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';

import React, { useState } from "react";
import Drawer from "./Drawer";

export function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const currentUser = useSelector(state => state.auth.user);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <div>
              <img src="src/assets/icon.svg" alt="Logo" />
            </div>
            <div>
              <span className={styles.title}>Meu Fórum</span>
            </div>
          </div>

          <nav className={styles.menu}>
            <Link className={styles.navItem} to="/" >Home</Link>
            <Link className={styles.navItem} to="/posts" >Posts</Link>
            <Link className={styles.navItem} to="/add-post" >Novo post</Link>
            <Link className={styles.navItem} to="/users" >Usuários</Link>
            <Link className={styles.navItem} to="/ranking" >Ranking</Link>
            <Link className={styles.navItem} to="/login" >Login</Link>            
            <Link className={styles.navItem} to="/register" >Cria Usuário</Link>
          </nav>
          
          <div className={styles.actions}>
            <div>
              <a href="">
                {/* <FaGithub size="30px" /> */}
                {currentUser && <p>Welcome, {currentUser.name}!</p>}
              </a>
            </div>
            <div>
              <span>
                <RxHamburgerMenu size="20px" onClick={toggleDrawer} />
              </span>
            </div>
          </div>
        </div>
      </header>
      <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
    </>
  );
}
