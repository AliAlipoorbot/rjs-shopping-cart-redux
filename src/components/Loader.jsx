import { RotatingLines } from "react-loader-spinner";
import styled from "styled-components";

const Div = styled.div`
  width: 100%;
  text-align: center;
  height: 1000px;
  margin-top: 100px;
`;

function Loader() {
  return (
    <Div>
      <RotatingLines
        width="100px"
        height="100px"
        strokeWidth="3"
        strokeColor="#fe5d42"
      />
    </Div>
  );
}

export default Loader;
