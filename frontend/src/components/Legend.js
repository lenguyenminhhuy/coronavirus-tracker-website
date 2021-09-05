import React from "react";
import styled  from 'styled-components';

const Legend = ({ legendItems }) => {
  const HoverLegend = styled.div`
    display: flex;
    align-items:stretch;
    width: 100%;
    &:hover{
      background-color: '#a1b3f0',
    }
  `;

  return (

    <HoverLegend>
      {legendItems.map((item) => (
        <div
          key={item.title}
          style={{
            backgroundColor: item.color,
            flex: 1,
            textAlign:"center",
            display: "flex",
            alignItems: "center", // vertical
            justifyContent: "center", // horiztontal
            color: item.textColor != null ? item.textColor : "black",
            fontSize: "1em",
            height: "10vh",
          }}
        >
          <span>{item.title}</span>
        </div>
      ))}
    </HoverLegend>
  );
};

export default Legend;
