import { useCallback, useEffect, useMemo } from "react";
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
import NodeMenu from "./menus/NodeMenu";
import Pool from "./nodes/Pool";
import Start from "./nodes/Start";
import Task from "./nodes/Task";

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
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

  useEffect(() => {
    setNodes(nodes);
  }, [nodes, setNodes]);

  useEffect(() => {
    // document.addEventListener("contextmenu", (e) => e.preventDefault());

    return () => {
      document.removeEventListener("contextmenu", (e) => e.preventDefault());
    };
  }, []);

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
      <NodeMenu setNodes={setNodes} />
      <Controls />
      <Background variant={BackgroundVariant.Lines} color="#dfdfdf" gap={14} />
    </ReactFlow>
  );
}

export default Flow;
