import styled from "styled-components";

export const Box = styled.div`
  padding: var(--even-gap);

  background: var(--primary-clr-light-alpha70);
  border-radius: var(--border-rad);
  backdrop-filter: blur(5px);

  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  gap: var(--even-gap);
`;

export const Button = styled.button`
  border-radius: var(--border-rad);
  transition: 0.2s;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(0.9);
  }
  &:focus {
    box-shadow: 0px 0px 10px 0px white;
  }
`;
