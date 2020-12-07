import React from "react";
import styled from "styled-components";

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 14px;
  margin: 50px 0px;
  z-index:1;
`;

const List = styled.ul`
  display: flex;
`;

const ListItem = styled.li`
  margin-bottom: 30px 0;
  margin-right: 16px;
`;

const Link = styled.a`
  color: ${props => props.theme.darkBlueColor};
`;

const Copyright = styled.span`
  color: ${props => props.theme.darkGreyColor};
`;

export default () => (
  <Footer>
    <List>
      <ListItem>
        <Link href="/">I Love SIZL</Link>
      </ListItem>
      <ListItem>
        <Link href="/">Project 구성</Link>
      </ListItem>
      <ListItem>
        <Link href="/register">회원가입 하러가기</Link>
      </ListItem>
      <ListItem>
        <Link href="/board/upload">Upload Your Profile</Link>
      </ListItem>
    </List>
    <Copyright>Change the World In the SIZL! {new Date().getFullYear()} &copy;</Copyright>
  </Footer>
);