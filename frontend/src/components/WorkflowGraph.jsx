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
    },
    {
  id: "memory",
  data: { label: "Memory" },
  position: { x: 250, y: 150 }
},
{
  id: "orchestrator",
  data: { label: "Orchestrator" },
  position: { x: 250, y: 0 }
}
  ]

const edges = [

  {
    id: "e1",
    source: "orchestrator",
    target: "research"
  },

  {
    id: "e2",
    source: "orchestrator",
    target: "strategy"
  },

  {
    id: "e3",
    source: "orchestrator",
    target: "memory"
  },

  {
    id: "e4",
    source: "research",
    target: "critic"
  },

  {
    id: "e5",
    source: "strategy",
    target: "critic"
  },

  {
    id: "e6",
    source: "memory",
    target: "critic"
  },

  {
    id: "e7",
    source: "critic",
    target: "planner"
  },

  {
    id: "e8",
    source: "planner",
    target: "qa"
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