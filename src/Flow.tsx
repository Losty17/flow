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
import Task from "./nodes/Task";

const initialNodes = [
  {
    id: "1",
    type: "task",
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
  {
    id: "3",
    type: "task",
    data: {
      // label: "Output Node"
    },
    position: { x: 250, y: 250 },
  },
];

const initialEdges: Edge[] = [
  // { id: "e2-3", source: "2", type: "smoothstep", target: "3" }, //, animated: true },
];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const customNodes = useMemo(() => ({ task: Task }), []);

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
          padding: "5px",
          border: n.selected ? "1px dashed black" : "none",
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
