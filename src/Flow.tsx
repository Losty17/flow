import { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  ConnectionMode,
  Controls,
  Edge,
  MarkerType,
  MiniMap,
  Node,
  OnSelectionChangeParams,
  ReactFlowInstance,
  updateEdge,
  useEdgesState,
  useKeyPress,
  useNodesState,
} from "react-flow-renderer";
import { v4 } from "uuid";
import SteppedConnectionLine from "./edges/SteppedConnectionLine";
import NodeMenu from "./menus/NodeMenu";
import Pool from "./nodes/Pool";
import Start from "./nodes/Start";
import Task from "./nodes/Task";

const defaultNodes: Node[] = [
  {
    id: v4(),
    type: "start",
    data: {},
    position: { x: 0, y: 0 },
  },
];

const customNodes = { task: Task, start: Start, pool: Pool };
const customConnections = { stepped: SteppedConnectionLine };

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [cursor, setCursor] = useState("default");
  const spacePressed = useKeyPress("Space");
  const onEdgeUpdate = useCallback(
    (oldEdge: Edge<any>, newConnection: Connection) =>
      setEdges((els) => updateEdge(oldEdge, newConnection, els)),
    []
  );

  const onInit = (instance: ReactFlowInstance) => {
    const { innerWidth: width, innerHeight: height } = window;

    instance.setViewport({ x: width / 5, y: height / 5, zoom: 1.3 });
  };

  const onConnect = useCallback(
    (connection: Connection) => {
      if (connection.source !== connection.target)
        setEdges((eds) =>
          addEdge(
            {
              ...connection,
              type: "smoothstep",
              style: { stroke: "black" },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "#000",
              },
            },
            eds
          )
        );
    },
    [setEdges]
  );

  const onSelect = (e: OnSelectionChangeParams) => {
    setEdges(
      edges.map((e) => {
        const newEdge: Edge = {
          ...e,
          style: {
            stroke: e.selected ? "rgb(255, 180, 30)" : "#000",
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#000",
          },
        };

        return newEdge;
      })
    );

    setNodes(
      nodes.map((n) => {
        n.style = {
          ...n.style,
          outline: n.selected ? "black dashed 1px" : "none",
          outlineOffset: "5px",
        };

        return n;
      })
    );
  };

  const handleStartCanvasMove = () =>
    setCursor((cursor) => (cursor === "grab" ? "grabbing" : "default"));
  const handleEndCanvasMove = () =>
    setCursor((cursor) => (cursor === "grabbing" ? "grab" : "default"));

  useEffect(() => {
    document.addEventListener("contextmenu", (e) => e.preventDefault());
  }, []);

  useEffect(() => {
    if (spacePressed) setCursor("grab");
    else setCursor("default");
  }, [spacePressed]);

  return (
    <>
      <NodeMenu setNodes={setNodes} />
      <ReactFlow
        // --> Base elements
        nodes={nodes}
        edges={edges}
        nodeTypes={customNodes}
        connectionLineComponent={SteppedConnectionLine}
        // --> Events
        onInit={onInit}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onSelectionChange={onSelect}
        onConnect={onConnect}
        onMoveStart={handleStartCanvasMove}
        onMoveEnd={handleEndCanvasMove}
        onEdgeUpdate={onEdgeUpdate}
        // --> Flow settings
        maxZoom={4}
        deleteKeyCode="Delete"
        selectionKeyCode="Shift"
        multiSelectionKeyCode="Control"
        panOnDrag={spacePressed}
        connectionMode={ConnectionMode.Loose}
        zoomOnDoubleClick={false}
        onlyRenderVisibleElements
        // --> User settings
        // snapGrid={[16, 16]}
        // snapToGrid
        // --> Custom styles
        connectionLineStyle={{ stroke: "#000" }}
        style={{
          cursor,
        }}
      >
        <MiniMap nodeStrokeWidth={3} />
        <Controls />
        <Background
          variant={BackgroundVariant.Lines}
          color="#dfdfdf"
          gap={16}
        />
      </ReactFlow>
    </>
  );
}

export default Flow;
