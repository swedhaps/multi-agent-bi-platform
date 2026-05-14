import React, { useState, useEffect, useRef } from "react"
import axios from "axios"

import { createTheme, ThemeProvider, alpha } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Drawer from "@mui/material/Drawer"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Paper from "@mui/material/Paper"
import Chip from "@mui/material/Chip"
import Grid from "@mui/material/Grid"
import Divider from "@mui/material/Divider"
import CircularProgress from "@mui/material/CircularProgress"
import LinearProgress from "@mui/material/LinearProgress"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Tooltip from "@mui/material/Tooltip"
import Badge from "@mui/material/Badge"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import StepContent from "@mui/material/StepContent"
import Fade from "@mui/material/Fade"

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard"
import SmartToyIcon from "@mui/icons-material/SmartToy"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import TerminalIcon from "@mui/icons-material/Terminal"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import BusinessIcon from "@mui/icons-material/Business"
import InventoryIcon from "@mui/icons-material/Inventory"
import GroupsIcon from "@mui/icons-material/Groups"
import FlagIcon from "@mui/icons-material/Flag"
import BlockIcon from "@mui/icons-material/Block"
import SearchIcon from "@mui/icons-material/Search"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import RateReviewIcon from "@mui/icons-material/RateReview"
import MapIcon from "@mui/icons-material/Map"
import VerifiedIcon from "@mui/icons-material/Verified"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import HubIcon from "@mui/icons-material/Hub"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import SettingsIcon from "@mui/icons-material/Settings"
import NotificationsIcon from "@mui/icons-material/Notifications"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import PsychologyIcon from "@mui/icons-material/Psychology"
import DataObjectIcon from "@mui/icons-material/DataObject"
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown"

const DRAWER_WIDTH = 240

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00e5ff", light: "#6effff", dark: "#00b2cc" },
    secondary: { main: "#7c4dff", light: "#b47cff", dark: "#3f1dcb" },
    success: { main: "#00e676" },
    warning: { main: "#ffab40" },
    error: { main: "#ff5252" },
    background: { default: "#050d1a", paper: "#0a1628" },
    text: { primary: "#e8f4fd", secondary: "#8aacc8" },
  },
  typography: {
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
    h4: { fontWeight: 700, letterSpacing: "-0.5px" },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600, letterSpacing: "0.5px" },
    button: { fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, letterSpacing: "1px" },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid rgba(0, 229, 255, 0.1)",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          "&:hover": { borderColor: "rgba(0, 229, 255, 0.3)", boxShadow: "0 0 20px rgba(0, 229, 255, 0.08)" },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "rgba(0, 229, 255, 0.2)" },
            "&:hover fieldset": { borderColor: "rgba(0, 229, 255, 0.5)" },
            "&.Mui-focused fieldset": { borderColor: "#00e5ff" },
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.875rem",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: { root: { borderRadius: 8, textTransform: "uppercase", padding: "10px 28px" } },
    },
    MuiChip: {
      styleOverrides: { root: { fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: "0.7rem" } },
    },
    MuiDrawer: {
      styleOverrides: { paper: { background: "#06101f", borderRight: "1px solid rgba(0, 229, 255, 0.1)" } },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "rgba(5, 13, 26, 0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0, 229, 255, 0.1)",
          boxShadow: "none",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          background: "#0a1628",
          border: "1px solid rgba(0, 229, 255, 0.1)",
          "&:before": { display: "none" },
          "&.Mui-expanded": { borderColor: "rgba(0, 229, 255, 0.3)" },
        },
      },
    },
  },
})

const AGENTS = [
  { key: "research", label: "Research Agent", icon: <SearchIcon />, color: "#00e5ff" },
  { key: "strategy", label: "Strategy Agent", icon: <TrendingUpIcon />, color: "#7c4dff" },
  { key: "critic",   label: "Critic Agent",   icon: <RateReviewIcon />, color: "#ff5252" },
  { key: "planner",  label: "Planner Agent",  icon: <MapIcon />, color: "#ffab40" },
  { key: "qa",       label: "QA Agent",       icon: <VerifiedIcon />, color: "#00e676" },
]

const FORM_FIELDS = [
  { key: "company_description", label: "Company Description", icon: <BusinessIcon />, multiline: true,  rows: 2 },
  { key: "product_details",     label: "Product Details",     icon: <InventoryIcon />, multiline: true,  rows: 2 },
  { key: "target_audience",     label: "Target Audience",     icon: <GroupsIcon />,   multiline: false, rows: 1 },
  { key: "goals",               label: "Goals",               icon: <FlagIcon />,     multiline: true,  rows: 2 },
  { key: "constraints",         label: "Constraints",         icon: <BlockIcon />,    multiline: true,  rows: 2 },
]

// ─── Glow dot ─────────────────────────────────────────────────────────────────
function GlowDot({ color = "#00e5ff", pulse = false }) {
  return (
    <Box sx={{
      width: 8, height: 8, borderRadius: "50%", bgcolor: color,
      boxShadow: `0 0 8px ${color}`, flexShrink: 0,
      ...(pulse && {
        animation: "pulse 1.5s ease-in-out infinite",
        "@keyframes pulse": {
          "0%, 100%": { opacity: 1, transform: "scale(1)" },
          "50%":       { opacity: 0.4, transform: "scale(0.8)" },
        },
      }),
    }} />
  )
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, color }) {
  return (
    <Card sx={{ height: "100%", position: "relative", overflow: "hidden" }}>
      <Box sx={{
        position: "absolute", top: 0, right: 0, width: 80, height: 80,
        borderRadius: "0 0 0 80px",
        background: `radial-gradient(circle at top right, ${alpha(color, 0.2)}, transparent 70%)`,
      }} />
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
          <Box sx={{ color, display: "flex" }}>{icon}</Box>
          <Typography variant="caption" sx={{ color: "text.secondary", textTransform: "uppercase", letterSpacing: "1px" }}>
            {label}
          </Typography>
        </Box>
        <Typography variant="h5" sx={{ color, fontWeight: 700 }}>{value}</Typography>
      </CardContent>
    </Card>
  )
}

// ─── Agent output accordion ───────────────────────────────────────────────────
function AgentOutputCard({ agent, data }) {
  const agentMeta = AGENTS.find(a => a.key === agent) || { label: agent, color: "#00e5ff", icon: <SmartToyIcon /> }
  const content = typeof data === "string" ? data : JSON.stringify(data, null, 2)
  return (
    <Accordion defaultExpanded={false} sx={{ mb: 1 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: agentMeta.color }} />}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box sx={{ color: agentMeta.color, display: "flex", fontSize: 20 }}>{agentMeta.icon}</Box>
          <Typography sx={{ fontWeight: 700, color: agentMeta.color, letterSpacing: "0.5px" }}>
            {agentMeta.label} Output
          </Typography>
          <Chip label="COMPLETED" size="small" sx={{ bgcolor: alpha(agentMeta.color, 0.1), color: agentMeta.color, border: `1px solid ${alpha(agentMeta.color, 0.3)}` }} />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Paper sx={{ bgcolor: "#020912", border: `1px solid ${alpha(agentMeta.color, 0.15)}`, p: 2, borderRadius: 2, maxHeight: 320, overflow: "auto" }}>
          <pre style={{ margin: 0, whiteSpace: "pre-wrap", fontSize: "0.78rem", color: "#c8e6f5", fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.7 }}>
            {content}
          </pre>
        </Paper>
      </AccordionDetails>
    </Accordion>
  )
}

// ─── Workflow timeline ────────────────────────────────────────────────────────
function WorkflowTimeline({ result, loading }) {
  return (
    <Stepper orientation="vertical" activeStep={loading ? 1 : result ? AGENTS.length : -1}
      sx={{ "& .MuiStepConnector-line": { borderColor: "rgba(0,229,255,0.15)", borderLeftStyle: "dashed" } }}
    >
      {AGENTS.map((agent, idx) => {
        const done   = result && idx < AGENTS.length
        const active = loading && idx === 0
        return (
          <Step key={agent.key} completed={!!done}>
            <StepLabel StepIconComponent={() => (
              <Box sx={{
                width: 32, height: 32, borderRadius: "50%",
                bgcolor: done ? alpha(agent.color, 0.15) : active ? alpha(agent.color, 0.08) : "transparent",
                border: `2px solid ${done ? agent.color : active ? agent.color : "rgba(255,255,255,0.1)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: done || active ? agent.color : "rgba(255,255,255,0.3)",
                transition: "all 0.4s ease",
                boxShadow: done || active ? `0 0 10px ${alpha(agent.color, 0.4)}` : "none",
              }}>
                {done   ? <CheckCircleIcon sx={{ fontSize: 18 }} />
                : active ? <CircularProgress size={14} sx={{ color: agent.color }} />
                :          <RadioButtonUncheckedIcon sx={{ fontSize: 14 }} />}
              </Box>
            )}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ color: done || active ? agent.color : "text.secondary", display: "flex" }}>{agent.icon}</Box>
                <Typography sx={{ color: done || active ? agent.color : "text.secondary", fontWeight: done || active ? 700 : 400, fontSize: "0.85rem" }}>
                  {agent.label}
                </Typography>
                {active && (
                  <Chip label="RUNNING" size="small" sx={{
                    bgcolor: alpha(agent.color, 0.1), color: agent.color, fontSize: "0.6rem", height: 18,
                    animation: "fadeInOut 1.2s ease-in-out infinite",
                    "@keyframes fadeInOut": { "0%,100%": { opacity: 1 }, "50%": { opacity: 0.4 } },
                  }} />
                )}
              </Box>
            </StepLabel>
            <StepContent sx={{ borderColor: "rgba(0,229,255,0.1)" }}>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {done ? "Output ready" : active ? "Processing..." : "Pending"}
              </Typography>
            </StepContent>
          </Step>
        )
      })}
    </Stepper>
  )
}

// ─── Smart-scroll live logs panel ─────────────────────────────────────────────
// KEY FIX: auto-scroll only fires when the user is already pinned to the bottom
// of the log panel itself — it never touches the page scroll position.
function LiveLogsPanel({ logs }) {
  const containerRef  = useRef(null)   // the scrollable Paper
  const bottomRef     = useRef(null)   // sentinel div at end of log content
  const isPinnedRef   = useRef(true)   // true = user is at (or near) the bottom
  const [showJump, setShowJump] = useState(false)

  // When new log lines arrive, scroll only if the user is pinned to the bottom
  useEffect(() => {
    if (isPinnedRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [logs])

  const handleScroll = () => {
    const el = containerRef.current
    if (!el) return
    // "Near bottom" threshold: within 60 px
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 60
    isPinnedRef.current = nearBottom
    setShowJump(!nearBottom)
  }

  const jumpToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    isPinnedRef.current = true
    setShowJump(false)
  }

  return (
    // Wrapper needs position:relative so the jump button can be positioned inside it
    <Box sx={{ position: "relative" }}>
      <Paper
        ref={containerRef}
        onScroll={handleScroll}
        sx={{
          bgcolor: "#020912",
          border: "1px solid rgba(0, 230, 118, 0.15)",
          p: 2,
          height: 340,
          overflowY: "auto",   // scroll happens INSIDE this box only
          borderRadius: 2,
          fontFamily: "'JetBrains Mono', monospace",
          // Visible scrollbar so users can tell this panel is independently scrollable
          "&::-webkit-scrollbar":       { width: 6 },
          "&::-webkit-scrollbar-track": { bgcolor: "rgba(0,0,0,0.2)", borderRadius: 3 },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: alpha("#00e676", 0.3), borderRadius: 3,
            "&:hover": { bgcolor: alpha("#00e676", 0.5) },
          },
        }}
      >
        {logs.length === 0 ? (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 1 }}>
            <TerminalIcon sx={{ color: alpha("#00e676", 0.2), fontSize: 36 }} />
            <Typography sx={{ color: alpha("#00e676", 0.3), fontSize: "0.75rem", letterSpacing: "2px" }}>
              AWAITING LOGS...
            </Typography>
          </Box>
        ) : (
          <pre style={{ margin: 0, whiteSpace: "pre-wrap", fontSize: "0.72rem", color: "#00e676", lineHeight: 1.8 }}>
            {logs.map((line, i) => (
              <span key={i} style={{ display: "block" }}>
                <span style={{ color: "#1a4a2e", marginRight: 8, userSelect: "none" }}>
                  {String(i + 1).padStart(3, "0")}
                </span>
                {line}
              </span>
            ))}
          </pre>
        )}
        {/* Sentinel — scrollIntoView targets this, not the page */}
        <div ref={bottomRef} />
      </Paper>

      {/* "Jump to latest" button — appears only when user has scrolled up */}
      <Fade in={showJump}>
        <Box
          onClick={jumpToBottom}
          sx={{
            position: "absolute",
            bottom: 12,
            right: 16,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            px: 1.5,
            py: 0.6,
            borderRadius: 2,
            bgcolor: alpha("#00e676", 0.15),
            border: "1px solid rgba(0,230,118,0.35)",
            color: "#00e676",
            fontSize: "0.65rem",
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            letterSpacing: "1px",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            transition: "background 0.2s",
            "&:hover": { bgcolor: alpha("#00e676", 0.28) },
            // Don't let this button itself be scrolled into view
            zIndex: 2,
          }}
        >
          <KeyboardDoubleArrowDownIcon sx={{ fontSize: 14 }} />
          JUMP TO LATEST
        </Box>
      </Fade>
    </Box>
  )
}

// ─── Root app ─────────────────────────────────────────────────────────────────
export default function App() {
  const [form, setForm] = useState({
    company_description: "",
    product_details:     "",
    target_audience:     "",
    goals:               "",
    constraints:         "",
  })
  const [result,  setResult]  = useState(null)
  const [logs,    setLogs]    = useState([])
  const [loading, setLoading] = useState(false)

  // ── All original API logic unchanged ──────────────────────────────────────
  const fetchLogs = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/logs")
      setLogs(response.data.logs || [])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => { fetchLogs() }, 1000)
    return () => clearInterval(interval)
  }, [])

  const submit = async () => {
    setLoading(true)
    try {
      const response = await axios.post("http://127.0.0.1:8000/run", form)
      setResult(response.data)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  // ─────────────────────────────────────────────────────────────────────────

  const filledFields  = Object.values(form).filter(v => v.trim()).length
  const completionPct = Math.round((filledFields / FORM_FIELDS.length) * 100)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Background grid */}
      <Box sx={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }} />

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <Drawer variant="permanent" sx={{ width: DRAWER_WIDTH, flexShrink: 0, "& .MuiDrawer-paper": { width: DRAWER_WIDTH, boxSizing: "border-box" } }}>
        <Box sx={{ p: 2.5, display: "flex", alignItems: "center", gap: 1.5, borderBottom: "1px solid rgba(0,229,255,0.1)" }}>
          <Box sx={{
            width: 36, height: 36, borderRadius: 2,
            background: "linear-gradient(135deg, #00e5ff, #7c4dff)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 16px rgba(0,229,255,0.4)",
          }}>
            <HubIcon sx={{ color: "#fff", fontSize: 20 }} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: "0.85rem", color: "primary.main", letterSpacing: "1px" }}>MULTI-AGENT</Typography>
            <Typography sx={{ fontSize: "0.65rem", color: "text.secondary", letterSpacing: "1.5px" }}>BI PLATFORM</Typography>
          </Box>
        </Box>

        <Box sx={{ p: 2 }}>
          <Typography sx={{ fontSize: "0.6rem", color: "text.secondary", letterSpacing: "2px", mb: 1, px: 1 }}>NAVIGATION</Typography>
          {[
            { label: "Dashboard", icon: <DashboardIcon fontSize="small" />, active: true },
            { label: "Agents",    icon: <SmartToyIcon fontSize="small" /> },
            { label: "Workflows", icon: <PsychologyIcon fontSize="small" /> },
            { label: "Logs",      icon: <TerminalIcon fontSize="small" /> },
            { label: "Settings",  icon: <SettingsIcon fontSize="small" /> },
          ].map(({ label, icon, active }) => (
            <Box key={label} sx={{
              display: "flex", alignItems: "center", gap: 1.5, px: 1.5, py: 1.2, borderRadius: 2,
              mb: 0.5, cursor: "pointer",
              bgcolor: active ? alpha("#00e5ff", 0.08) : "transparent",
              border:  active ? "1px solid rgba(0,229,255,0.2)" : "1px solid transparent",
              color:   active ? "primary.main" : "text.secondary",
              transition: "all 0.2s",
              "&:hover": { bgcolor: alpha("#00e5ff", 0.05), color: "primary.light" },
            }}>
              {icon}
              <Typography sx={{ fontSize: "0.82rem", fontWeight: active ? 700 : 400 }}>{label}</Typography>
              {active && <Box sx={{ ml: "auto", width: 4, height: 4, borderRadius: "50%", bgcolor: "primary.main", boxShadow: "0 0 6px #00e5ff" }} />}
            </Box>
          ))}
        </Box>

        <Divider sx={{ borderColor: "rgba(0,229,255,0.1)", mx: 2 }} />

        <Box sx={{ p: 2 }}>
          <Typography sx={{ fontSize: "0.6rem", color: "text.secondary", letterSpacing: "2px", mb: 1, px: 1 }}>AGENTS</Typography>
          {AGENTS.map(agent => (
            <Box key={agent.key} sx={{ display: "flex", alignItems: "center", gap: 1, px: 1.5, py: 0.8, borderRadius: 1.5, mb: 0.3 }}>
              <GlowDot color={result ? agent.color : loading ? "#ffab40" : "#334155"} pulse={loading} />
              <Box sx={{ color: result ? agent.color : "text.secondary", display: "flex", fontSize: 16 }}>{agent.icon}</Box>
              <Typography sx={{ fontSize: "0.75rem", color: result ? agent.color : "text.secondary" }}>{agent.label}</Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: "auto", p: 2, borderTop: "1px solid rgba(0,229,255,0.1)" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 1.5, borderRadius: 2, bgcolor: alpha("#00e5ff", 0.05) }}>
            <AccountCircleIcon sx={{ color: "primary.main" }} />
            <Box>
              <Typography sx={{ fontSize: "0.75rem", fontWeight: 700 }}>Operator</Typography>
              <Typography sx={{ fontSize: "0.65rem", color: "text.secondary" }}>System Admin</Typography>
            </Box>
            <GlowDot color="#00e676" />
          </Box>
        </Box>
      </Drawer>

      {/* ── Main content ────────────────────────────────────────────────── */}
      <Box sx={{ ml: `${DRAWER_WIDTH}px`, minHeight: "100vh", position: "relative", zIndex: 1 }}>

        {/* AppBar */}
        <AppBar position="sticky">
          <Toolbar sx={{ gap: 2 }}>
            <AutoAwesomeIcon sx={{ color: "primary.main", fontSize: 20 }} />
            <Typography variant="h6" sx={{ flexGrow: 1, fontSize: "0.95rem", letterSpacing: "2px", color: "primary.main" }}>
              MULTI-AGENT BI PLATFORM
            </Typography>
            {loading && (
              <Chip
                icon={<CircularProgress size={12} sx={{ color: "warning.main !important" }} />}
                label="WORKFLOW RUNNING" size="small"
                sx={{ bgcolor: alpha("#ffab40", 0.1), color: "warning.main", border: "1px solid rgba(255,171,64,0.3)" }}
              />
            )}
            {result && !loading && (
              <Chip icon={<CheckCircleIcon sx={{ fontSize: 14 }} />} label="COMPLETED" size="small"
                sx={{ bgcolor: alpha("#00e676", 0.1), color: "success.main", border: "1px solid rgba(0,230,118,0.3)" }} />
            )}
            <Tooltip title="Notifications">
              <Badge badgeContent={logs.length > 0 ? 1 : 0} color="primary" variant="dot">
                <NotificationsIcon sx={{ color: "text.secondary", cursor: "pointer" }} />
              </Badge>
            </Tooltip>
            <DataObjectIcon sx={{ color: "text.secondary", cursor: "pointer" }} />
          </Toolbar>
          {loading && <LinearProgress sx={{ height: 2, "& .MuiLinearProgress-bar": { background: "linear-gradient(90deg, #00e5ff, #7c4dff)" } }} />}
        </AppBar>

        <Box sx={{ p: 3 }}>

          {/* Stat cards */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {[
              { label: "Active Agents", value: result ? "5/5" : loading ? "1/5" : "0/5", icon: <SmartToyIcon />, color: "#00e5ff" },
              { label: "Log Entries",   value: logs.length, icon: <TerminalIcon />, color: "#7c4dff" },
              { label: "Form Filled",   value: `${completionPct}%`, icon: <DataObjectIcon />, color: "#ffab40" },
              { label: "Status", value: result ? "Done" : loading ? "Running" : "Idle", icon: <HubIcon />,
                color: result ? "#00e676" : loading ? "#ffab40" : "#334155" },
            ].map(card => (
              <Grid item xs={6} md={3} key={card.label}>
                <StatCard {...card} />
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3}>

            {/* LEFT: Form + Agent Outputs */}
            <Grid item xs={12} md={7}>
              <Card sx={{ mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                    <PsychologyIcon sx={{ color: "primary.main" }} />
                    <Typography variant="h6" sx={{ color: "primary.main", fontSize: "0.9rem", letterSpacing: "1.5px" }}>
                      CONFIGURE WORKFLOW
                    </Typography>
                    <Box sx={{ ml: "auto" }}>
                      <Chip label={`${filledFields}/${FORM_FIELDS.length} FIELDS`} size="small"
                        sx={{ bgcolor: alpha("#00e5ff", 0.08), color: "primary.main", border: "1px solid rgba(0,229,255,0.2)" }} />
                    </Box>
                  </Box>

                  <Grid container spacing={2}>
                    {FORM_FIELDS.map(field => (
                      <Grid item xs={12} key={field.key}>
                        <TextField
                          fullWidth
                          label={field.label}
                          multiline={field.multiline}
                          rows={field.rows}
                          variant="outlined"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <Box sx={{ color: "primary.main", mr: 1, display: "flex", alignItems: "flex-start", pt: field.multiline ? 1 : 0 }}>
                                {field.icon}
                              </Box>
                            ),
                          }}
                          InputLabelProps={{ sx: { color: "text.secondary", fontSize: "0.8rem" } }}
                          onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                          sx={{ "& .MuiInputBase-input": { fontSize: "0.82rem" } }}
                        />
                      </Grid>
                    ))}
                  </Grid>

                  <Box sx={{ mt: 3, display: "flex", gap: 2, alignItems: "center" }}>
                    <Button
                      variant="contained"
                      onClick={submit}
                      disabled={loading}
                      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <PlayArrowIcon />}
                      sx={{
                        background: loading ? undefined : "linear-gradient(135deg, #00e5ff, #0091a8)",
                        color: "#050d1a", fontWeight: 900, fontSize: "0.75rem",
                        "&:hover": { background: "linear-gradient(135deg, #6effff, #00e5ff)" },
                        "&.Mui-disabled": { background: alpha("#00e5ff", 0.1), color: alpha("#00e5ff", 0.4) },
                      }}
                    >
                      {loading ? "RUNNING AGENTS..." : "RUN AGENTS"}
                    </Button>
                    <Box sx={{ flexGrow: 1 }}>
                      <LinearProgress variant="determinate" value={completionPct} sx={{
                        height: 4, borderRadius: 2, bgcolor: alpha("#00e5ff", 0.1),
                        "& .MuiLinearProgress-bar": { background: "linear-gradient(90deg, #00e5ff, #7c4dff)", borderRadius: 2 },
                      }} />
                      <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.65rem" }}>
                        {completionPct}% configured
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {result && (
                <Fade in timeout={600}>
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                      <CheckCircleIcon sx={{ color: "success.main" }} />
                      <Typography variant="h6" sx={{ color: "success.main", fontSize: "0.9rem", letterSpacing: "1.5px" }}>
                        AGENT OUTPUTS
                      </Typography>
                    </Box>
                    {AGENTS.map(agent => (
                      <AgentOutputCard
                        key={agent.key}
                        agent={agent.key}
                        data={result[agent.key] || result[`${agent.key}_output`] || result}
                      />
                    ))}
                    <Accordion sx={{ mt: 1 }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "text.secondary" }} />}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <DataObjectIcon sx={{ color: "text.secondary", fontSize: 18 }} />
                          <Typography sx={{ fontSize: "0.82rem", color: "text.secondary" }}>Raw API Response</Typography>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Paper sx={{ bgcolor: "#020912", p: 2, maxHeight: 300, overflow: "auto" }}>
                          <pre style={{ margin: 0, whiteSpace: "pre-wrap", fontSize: "0.72rem", color: "#4a7a8a", fontFamily: "'JetBrains Mono', monospace" }}>
                            {JSON.stringify(result, null, 2)}
                          </pre>
                        </Paper>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                </Fade>
              )}
            </Grid>

            {/* RIGHT: Timeline + Logs */}
            <Grid item xs={12} md={5}>
              <Card sx={{ mb: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                    <HubIcon sx={{ color: "secondary.main" }} />
                    <Typography variant="h6" sx={{ color: "secondary.main", fontSize: "0.9rem", letterSpacing: "1.5px" }}>
                      AGENT PIPELINE
                    </Typography>
                    <Chip
                      label={result ? "DONE" : loading ? "ACTIVE" : "STANDBY"}
                      size="small"
                      sx={{
                        ml: "auto",
                        bgcolor: alpha(result ? "#00e676" : loading ? "#ffab40" : "#334155", 0.1),
                        color: result ? "success.main" : loading ? "warning.main" : "text.secondary",
                        border: `1px solid ${alpha(result ? "#00e676" : loading ? "#ffab40" : "#334155", 0.3)}`,
                      }}
                    />
                  </Box>
                  <WorkflowTimeline result={result} loading={loading} />
                </CardContent>
              </Card>

              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                    <TerminalIcon sx={{ color: "#00e676" }} />
                    <Typography variant="h6" sx={{ color: "#00e676", fontSize: "0.9rem", letterSpacing: "1.5px" }}>
                      LIVE LOGS
                    </Typography>
                    <GlowDot color="#00e676" pulse />
                    <Chip label={`${logs.length} LINES`} size="small"
                      sx={{ ml: "auto", bgcolor: alpha("#00e676", 0.08), color: "#00e676", border: "1px solid rgba(0,230,118,0.2)", fontSize: "0.6rem" }} />
                  </Box>

                  {/* Smart-scroll panel — the only change from the original */}
                  <LiveLogsPanel logs={logs} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  )
}