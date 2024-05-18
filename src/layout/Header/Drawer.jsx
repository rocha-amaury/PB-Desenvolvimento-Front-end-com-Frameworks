import React from "react";
import styled from "styled-components";
import DrawerItem from "../../components/DrawerItem";
import { IoMdHome } from "react-icons/io";
import { BiSolidEnvelope } from "react-icons/bi";
import { FaSearchPlus } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi2";
import { BsBroadcast } from "react-icons/bs";
import { Link } from "react-router-dom";

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


  return (
    <>
      {isOpen && <Backdrop isOpen={isOpen} onClick={onClose} />}
      <DrawerContainer isOpen={isOpen} onClick={onClose}>
        <DrawerContent>
          
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <DrawerItem icon={<IoMdHome size="24px"/>} text="Home" />
          </Link>
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
            <DrawerItem icon={<BsBroadcast  size="24px"/>} text="Login" />
          </Link>
          <Link to="/posts" style={{ textDecoration: 'none', color: 'inherit' }}>
            <DrawerItem icon={<BiSolidEnvelope  size="24px"/>} text="Posts" />
          </Link>
          <Link to="/new-post" style={{ textDecoration: 'none', color: 'inherit' }}>
            <DrawerItem icon={<FaSearchPlus  size="24px"/>} text="Novo Post" />
          </Link>
          <Link to="/cms" style={{ textDecoration: 'none', color: 'inherit' }}>
            <DrawerItem icon={<HiOutlineUsers  size="24px"/>} text="CMS" />
          </Link>

        </DrawerContent>
      </DrawerContainer>
    </>
  );
};

export default Drawer;
