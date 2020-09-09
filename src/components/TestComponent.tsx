import React from 'react';

export interface ITestComponentProps {
  children: React.ReactNode,
}

const TestComponent: React.FC<ITestComponentProps> = () => {
  return (
    <ParentComponent>
      <ChildComponent anotherVariable='test'>
        CUSTOM FROM HOC
      </ChildComponent>
    </ParentComponent>

  );
};

export default TestComponent;

export interface IParentComponentProps {
  children: React.ReactNode,
}

export const ParentComponent: React.FC<IParentComponentProps> = (props) => {
  return (
    <div>
      {props.children}
    </div>
  );
};

export interface IChildComponentProps {
  children: React.ReactNode,
  anotherVariable: string,
}

export const ChildComponent: React.FC<IChildComponentProps> = (props) => {
  return (<div>
    {props.anotherVariable}
    {props.children}
  </div>);
};
