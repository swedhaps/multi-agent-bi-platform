import React from "react"

import ReactFlow, {
  Background,
  Controls,
  MarkerType
} from "reactflow"

import "reactflow/dist/style.css"

export default function WorkflowGraph({
  agentStatus
}) {

  const getColor = (status) => {

    if (status === "completed") {
      return "#00ff99"
    }

    if (status === "running") {
      return "#00bfff"
    }

    if (status === "error") {
      return "#ff4d4f"
    }

    return "#666"
  }

  const nodes = [

    {
      id: "research",
      position: { x: 250, y: 0 },

      data: {
        label: "Research Agent"
      },

      style: {
        background: "#111827",
        color: "#fff",
        border: `2px solid ${getColor(
          agentStatus.research
        )}`,
        padding: 10,
        borderRadius: 12,
        width: 180,
        textAlign: "center"
      }
    },

    {
      id: "strategy",
      position: { x: 250, y: 120 },

      data: {
        label: "Strategy Agent"
      },

      style: {
        background: "#111827",
        color: "#fff",
        border: `2px solid ${getColor(
          agentStatus.strategy
        )}`,
        padding: 10,
        borderRadius: 12,
        width: 180,
        textAlign: "center"
      }
    },

    {
      id: "critic",
      position: { x: 250, y: 240 },

      data: {
        label: "Critic Agent"
      },

      style: {
        background: "#111827",
        color: "#fff",
        border: `2px solid ${getColor(
          agentStatus.critic
        )}`,
        padding: 10,
        borderRadius: 12,
        width: 180,
        textAlign: "center"
      }
    },

    {
      id: "planner",
      position: { x: 250, y: 360 },

      data: {
        label: "Planner Agent"
      },

      style: {
        background: "#111827",
        color: "#fff",
        border: `2px solid ${getColor(
          agentStatus.planner
        )}`,
        padding: 10,
        borderRadius: 12,
        width: 180,
        textAlign: "center"
      }
    },

    {
      id: "qa",
      position: { x: 250, y: 480 },

      data: {
        label: "QA Agent"
      },

      style: {
        background: "#111827",
        color: "#fff",
        border: `2px solid ${getColor(
          agentStatus.qa
        )}`,
        padding: 10,
        borderRadius: 12,
        width: 180,
        textAlign: "center"
      }
    }
  ]

  const edges = [

    {
      id: "e1",
      source: "research",
      target: "strategy",
      animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed
      },
      style: {
        stroke: "#00bfff"
      }
    },

    {
      id: "e2",
      source: "strategy",
      target: "critic",
      animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed
      },
      style: {
        stroke: "#00bfff"
      }
    },

    {
      id: "e3",
      source: "critic",
      target: "planner",
      animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed
      },
      style: {
        stroke: "#00bfff"
      }
    },

    {
      id: "e4",
      source: "planner",
      target: "qa",
      animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed
      },
      style: {
        stroke: "#00bfff"
      }
    }
  ]

  return (

    <div
      style={{
        width: "100%",
        height: 650,
        background: "#020617",
        borderRadius: 20
      }}
    >

      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
      >

        <Background />

        <Controls />

      </ReactFlow>

    </div>
  )
}