import { useCallback, useMemo } from "react";
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  ConnectionMode,
  Controls,
  Edge,
  OnSelectionChangeParams,
  useEdgesState,
  useNodesState,
} from "react-flow-renderer";
import Pool from "./nodes/Pool";
import Start from "./nodes/Start";
import Task from "./nodes/Task";

const initialNodes = [
  {
    id: "3",
    type: "pool",
    data: {
      // label: "Output Node"
    },
    position: { x: 250, y: 250 },
  },
  {
    id: "1",
    type: "start",
    parentNode: "3",
    data: {
      // label: "Input Node",
    },
    position: { x: 250, y: 25 },
  },

  {
    id: "2",
    type: "task",
    data: {
      // label: <div>Default Node</div>,
    },
    position: { x: 100, y: 125 },
  },
];

const initialEdges: Edge[] = [
  // { id: "e2-3", source: "2", type: "smoothstep", target: "3" }, //, animated: true },
];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const customNodes = useMemo(
    () => ({ task: Task, start: Start, pool: Pool }),
    []
  );

  const onConnect = useCallback(
    (connection: any) =>
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            type: /* smooth */ "step",
            style: { stroke: "black" },
            markerEnd: {
              type: "arrowclosed",
              color: "#000",
            },
          },
          eds
        )
      ),
    [setEdges]
  );

  const onSelect = (e: OnSelectionChangeParams) => {
    setEdges(
      edges.map((e) => {
        e.style = {
          ...e.style,
          stroke: e.selected ? "#f00" : "#000",
        };

        return e;
      })
    );

    setNodes(
      nodes.map((n) => {
        n.style = {
          ...n.style,
          outline: n.selected ? "black dashed 1px" : "none",
          outlineOffset: "6px",
        };

        return n;
      })
    );
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      connectionMode={ConnectionMode.Loose}
      nodeTypes={customNodes}
      onSelectionChange={onSelect}
      // snapToGrid
      fitView
    >
      <Controls />
      <Background variant={BackgroundVariant.Lines} color="#dfdfdf" gap={14} />
    </ReactFlow>
  );
}

export default Flow;
