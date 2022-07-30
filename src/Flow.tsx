import Moveable, { OnScale } from "moveable";
import { useCallback, useEffect, useState } from "react";
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
  useReactFlow,
} from "react-flow-renderer";
import { v4 } from "uuid";
import SteppedConnectionLine from "./edges/SteppedConnectionLine";
import NodeMenu from "./menus/NodeMenu";
import { Start, Task } from "./nodes";

const defaultNodes: Node[] = [
  {
    id: v4(),
    type: "start",
    data: {},
    position: { x: 0, y: 0 },
  },
];

const customNodes = { task: Task, start: Start };

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [cursor, setCursor] = useState("default");
  const spacePressed = useKeyPress("Space");
  const onEdgeUpdate = useCallback(
    (oldEdge: Edge<any>, newConnection: Connection) =>
      setEdges((els) => updateEdge(oldEdge, newConnection, els)),
    [setEdges]
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
    const no = e.nodes.at(0);
    let moveable = undefined;

    if (no) {
      moveable = new Moveable(document.body, {
        target: document.querySelector(no.id) as HTMLElement,
        // If the container is null, the position is fixed. (default: parentElement(document.body))
        container: document.body,
        draggable: true,
        resizable: true,
        scalable: true,
        rotatable: true,
        warpable: true,
        // Enabling pinchable lets you use events that
        // can be used in draggable, resizable, scalable, and rotateable.
        pinchable: true, // ["resizable", "scalable", "rotatable"]
        origin: true,
        keepRatio: true,
        // Resize, Scale Events at edges.
        edge: false,
        throttleDrag: 0,
        throttleResize: 0,
        throttleScale: 0,
        throttleRotate: 0,
      });

      // /* draggable */
      // moveable
      //   .on("dragStart", ({ target, clientX, clientY }) => {
      //     console.log("onDragStart", target);
      //   })
      //   .on(
      //     "drag",
      //     ({
      //       target,
      //       transform,
      //       left,
      //       top,
      //       right,
      //       bottom,
      //       beforeDelta,
      //       beforeDist,
      //       delta,
      //       dist,
      //       clientX,
      //       clientY,
      //     }) => {
      //       console.log("onDrag left, top", left, top);
      //       target!.style.left = `${left}px`;
      //       target!.style.top = `${top}px`;
      //       // console.log("onDrag translate", dist);
      //       // target!.style.transform = transform;
      //     }
      //   )
      //   .on("dragEnd", ({ target, isDrag, clientX, clientY }) => {
      //     console.log("onDragEnd", target, isDrag);
      //   });

      /* resizable */
      moveable
        .on("resizeStart", ({ target, clientX, clientY }) => {
          console.log("onResizeStart", target);
        })
        .on(
          "resize",
          ({ target, width, height, dist, delta, clientX, clientY }) => {
            console.log("onResize", target);
            delta[0] && (target!.style.width = `${width}px`);
            delta[1] && (target!.style.height = `${height}px`);
          }
        )
        .on("resizeEnd", ({ target, isDrag, clientX, clientY }) => {
          console.log("onResizeEnd", target, isDrag);
        });

      // /* scalable */
      // moveable
      //   .on("scaleStart", ({ target, clientX, clientY }) => {
      //     console.log("onScaleStart", target);
      //   })
      //   .on(
      //     "scale",
      //     ({
      //       target,
      //       scale,
      //       dist,
      //       delta,
      //       transform,
      //       clientX,
      //       clientY,
      //     }: OnScale) => {
      //       console.log("onScale scale", scale);
      //       target!.style.transform = transform;
      //     }
      //   )
      //   .on("scaleEnd", ({ target, isDrag, clientX, clientY }) => {
      //     console.log("onScaleEnd", target, isDrag);
      //   });

      // /* rotatable */
      // moveable
      //   .on("rotateStart", ({ target, clientX, clientY }) => {
      //     console.log("onRotateStart", target);
      //   })
      //   .on(
      //     "rotate",
      //     ({
      //       target,
      //       beforeDelta,
      //       delta,
      //       dist,
      //       transform,
      //       clientX,
      //       clientY,
      //     }) => {
      //       console.log("onRotate", dist);
      //       target!.style.transform = transform;
      //     }
      //   )
      //   .on("rotateEnd", ({ target, isDrag, clientX, clientY }) => {
      //     console.log("onRotateEnd", target, isDrag);
      //   });
    }

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
        id="workflow-canvas"
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
