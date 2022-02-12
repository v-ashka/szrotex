import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import styled from 'styled-components';

const FooterContainer = styled.footer`
    margin-top: 5em;
    background-color: #003c3c;
    height: 200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
`
const FooterCopy = styled.h6`
    color: #dadada;
    display: flex;
    align-items: center;
    font-weight: 100;
`

function Footer() {
 
    return (
        <FooterContainer>
            <FooterCopy>Copyright Szrotex 2022 &copy;</FooterCopy>
        </FooterContainer>
        );
}

export default Footer;