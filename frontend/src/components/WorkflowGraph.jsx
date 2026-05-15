import React from "react"
import ReactFlow, { Background, Controls, MarkerType } from "reactflow"
import "reactflow/dist/style.css"

export default function WorkflowGraph({ agentStatus }) {

  const getColor = (status) => {
    if (status === "completed") return "#00e676"
    if (status === "running")   return "#00bfff"
    if (status === "error")     return "#ff4d4f"
    return "#334155"
  }

  const makeNode = (id, label, x, y, statusKey) => ({
    id,
    position: { x, y },
    data: { label },
    style: {
      background: "#0a1628",
      color: "#e8f4fd",
      border: `2px solid ${getColor(statusKey ? agentStatus[statusKey] : "idle")}`,
      boxShadow: statusKey && agentStatus[statusKey] === "running"
        ? `0 0 12px ${getColor("running")}`
        : "none",
      padding: "10px 14px",
      borderRadius: 12,
      width: 160,
      textAlign: "center",
      fontSize: "0.78rem",
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: 700,
      transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    }
  })

  const nodes = [
    makeNode("orchestrator", "Orchestrator",   200,   0,   null),
    makeNode("memory",       "Memory",         460,  120,  null),
    makeNode("research",     "Research Agent",   0,  120,  "research"),
    makeNode("strategy",     "Strategy Agent", 200,  120,  "strategy"),
    makeNode("critic",       "Critic Agent",   200,  260,  "critic"),
    makeNode("planner",      "Planner Agent",  200,  380,  "planner"),
    makeNode("qa",           "QA Agent",       200,  500,  "qa"),
  ]

  const makeEdge = (id, source, target) => ({
    id,
    source,
    target,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#334155" },
    style: { stroke: "#334155", strokeWidth: 1.5 },
    animated: false,
  })

  const edges = [
    makeEdge("e1", "orchestrator", "research"),
    makeEdge("e2", "orchestrator", "strategy"),
    makeEdge("e3", "orchestrator", "memory"),
    makeEdge("e4", "research",     "critic"),
    makeEdge("e5", "strategy",     "critic"),
    makeEdge("e6", "memory",       "critic"),
    makeEdge("e7", "critic",       "planner"),
    makeEdge("e8", "planner",      "qa"),
  ]

  return (
    <div style={{ width: "100%", height: 600, background: "#020617", borderRadius: 16 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        <Background color="#0f2440" gap={20} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  )
}