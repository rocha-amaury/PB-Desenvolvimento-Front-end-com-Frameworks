import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  gap: 40px;

  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.00938em;
  padding-bottom: 24px;
  color:#757575;
`;

const DrawerItem = ({ icon, text }) => {
  return (
    <Container>
      {icon}
      <span>{text}</span>
    </Container>
  );
};

export default DrawerItem;
