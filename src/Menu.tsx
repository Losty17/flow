import * as React from "react";
import { Node } from "react-flow-renderer";

interface AddElementProps {
  mousePos: { x: number; y: number };
  nodes: Node<any>[];
  setNodes: React.Dispatch<React.SetStateAction<Node<any>[]>>;
}

interface MenuProps {
  mousePos: { x: number; y: number };
  nodes: Node<any>[];
  setNodes: React.Dispatch<React.SetStateAction<Node<any>[]>>;
}

const AddElement: React.FC<AddElementProps> = ({
  mousePos,
  nodes,
  setNodes,
}) => {
  const handleClick = () => {
    const node = {
      id: Math.random().toString(),
      // type: "",
      data: {
        label: <em>Node</em>,
      },
      position: { ...mousePos },
    };

    const oldNodes = nodes;
    oldNodes.push(node);

    setNodes(oldNodes);
  };

  return (
    <div className="addElement" onClick={handleClick}>
      +
    </div>
  );
};

const Menu: React.FC<MenuProps> = ({ mousePos, nodes, setNodes }) => {
  return (
    <div className="menu">
      <AddElement mousePos={mousePos} nodes={nodes} setNodes={setNodes} />
    </div>
  );
};

export default Menu;
