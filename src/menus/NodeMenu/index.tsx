import { MouseEvent } from "react";
import { Node } from "react-flow-renderer";
import { v4 } from "uuid";
import { Start, Task } from "../../nodes";
import { shape as startShape } from "../../nodes/Start";
import { shape as taskShape } from "../../nodes/Task";
import { menuStyle } from "./styles";
import "./styles.css";

const items = [
  {
    item: Start,
    shape: startShape,
    key: "start",
  },
  {
    item: Task,
    shape: taskShape,
    key: "task",
  },
];

interface NodeMenuProps {
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}

const NodeMenu: React.FC<NodeMenuProps> = ({ setNodes }) => {
  const handleClick = (evt: MouseEvent) => {
    const item = items.filter((i) => i.key === evt.currentTarget.id).at(0);

    if (item) {
      setNodes((nodes) =>
        nodes.concat({
          id: v4(),
          type: item.key,
          data: {
            label: item.key,
          },
          position: { x: 0, y: 0 },
        })
      );
    }
  };

  return (
    <div style={menuStyle}>
      {items.map(({ shape, key }, i) => {
        return (
          <button
            onClick={handleClick}
            id={key}
            key={key}
            className="menu-item"
          >
            <div
              style={{
                ...shape,
                maxWidth: "30px",
                maxHeight: "20px",
                margin: "auto",
              }}
            />
          </button>
        );
      })}
    </div>
  );
};

export default NodeMenu;
