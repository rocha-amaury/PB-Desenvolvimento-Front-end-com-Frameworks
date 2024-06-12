import React from "react";
import styled from "styled-components";
import DrawerItem from "../../components/DrawerItem";
import { IoMdHome } from "react-icons/io";
import { BiSolidEnvelope } from "react-icons/bi";
import { FaSearchPlus, FaUserPlus } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi2";
import { BsBroadcast, BsEnvelopePlusFill } from "react-icons/bs";
import { PiUsersThreeFill } from "react-icons/pi";
import { FaRankingStar } from "react-icons/fa6";
import { RiLoginCircleFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity 0.3s;
`;

const DrawerContainer = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  width: 300px;
  height: 100%;
  background-color: white;
  z-index: 1000;
  transition: right 0.3s;
`;

const DrawerContent = styled.div`
  padding: 20px;
`;

const Drawer = ({ isOpen, onClose }) => {
  const currentUser = useSelector(state => state.auth.user);

  return (
    <>
      {isOpen && <Backdrop isOpen={isOpen} onClick={onClose} />}
      <DrawerContainer isOpen={isOpen} onClick={onClose}>
        <DrawerContent>

          {currentUser && (
            <Link to={`/users/${currentUser.key}`} style={{ textDecoration: "none", color: "inherit" }}>
              <DrawerItem icon={<FaUser size="24px" />} text={`Bem vindo(a), ${currentUser.name}`} />
            </Link>
          )}
          
          
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <DrawerItem icon={<IoMdHome size="24px"/>} text="Home" />
          </Link>
          <Link to="/posts" style={{ textDecoration: 'none', color: 'inherit' }}>
            <DrawerItem icon={<BiSolidEnvelope  size="24px"/>} text="Posts" />
          </Link>
          <Link to="/add-post" style={{ textDecoration: 'none', color: 'inherit' }}>
            <DrawerItem icon={<BsEnvelopePlusFill size="24px"/>} text="Novo post" />
          </Link>
          <Link to="/users" style={{ textDecoration: 'none', color: 'inherit' }}>
            <DrawerItem icon={<PiUsersThreeFill  size="24px"/>} text="Usuários" />
          </Link>
          <Link to="/ranking" style={{ textDecoration: 'none', color: 'inherit' }}>
            <DrawerItem icon={<FaRankingStar  size="24px"/>} text="Ranking" />
          </Link>
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
            <DrawerItem icon={<RiLoginCircleFill  size="24px"/>} text="Login" />
          </Link>
          <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
            <DrawerItem icon={<FaUserPlus  size="24px"/>} text="Cria Usuário" />
          </Link>

        </DrawerContent>
      </DrawerContainer>
    </>
  );
};

export default Drawer;
