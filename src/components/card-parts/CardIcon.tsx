import React from 'react';

export interface ICardIconProps {
  src: any,
}

const CardIcon: React.FC<ICardIconProps> = (props) => {
  return (
    <div>
      <img src={props.src}/>
      {props.children}
    </div>
  );
};

export default CardIcon;
