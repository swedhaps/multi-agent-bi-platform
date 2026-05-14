import React, {
  useState,
  useEffect
} from "react"

import axios from "axios"

export default function App() {

  const [form, setForm] = useState({
    company_description: "",
    product_details: "",
    target_audience: "",
    goals: "",
    constraints: ""
  })

  const [result, setResult] = useState(null)

  const [logs, setLogs] = useState([])

  const [loading, setLoading] = useState(false)

  const fetchLogs = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/logs"
      )

      setLogs(response.data.logs || [])

    } catch (error) {

      console.log(error)

    }
  }

  useEffect(() => {

    const interval = setInterval(() => {
      fetchLogs()
    }, 1000)

    return () => clearInterval(interval)

  }, [])

  const submit = async () => {

    setLoading(true)

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/run",
        form
      )

      setResult(response.data)

    } catch (error) {

      console.log(error)

    }

    setLoading(false)
  }

  return (

    <div style={{
      padding: 20,
      fontFamily: "Arial"
    }}>

      <h1>
        Multi Agent BI Platform
      </h1>

      <input
        placeholder="Company Description"
        style={{
          width: "100%",
          padding: 10
        }}
        onChange={(e)=>setForm({
          ...form,
          company_description:e.target.value
        })}
      />

      <br /><br />

      <input
        placeholder="Product Details"
        style={{
          width: "100%",
          padding: 10
        }}
        onChange={(e)=>setForm({
          ...form,
          product_details:e.target.value
        })}
      />

      <br /><br />

      <input
        placeholder="Target Audience"
        style={{
          width: "100%",
          padding: 10
        }}
        onChange={(e)=>setForm({
          ...form,
          target_audience:e.target.value
        })}
      />

      <br /><br />

      <input
        placeholder="Goals"
        style={{
          width: "100%",
          padding: 10
        }}
        onChange={(e)=>setForm({
          ...form,
          goals:e.target.value
        })}
      />

      <br /><br />

      <input
        placeholder="Constraints"
        style={{
          width: "100%",
          padding: 10
        }}
        onChange={(e)=>setForm({
          ...form,
          constraints:e.target.value
        })}
      />

      <br /><br />

      <button
        onClick={submit}
        style={{
          padding: "10px 20px",
          cursor: "pointer"
        }}
      >
        Run Agents
      </button>

      {loading && (
        <h3>
          Running Workflow...
        </h3>
      )}

      <hr />

      <h2>
        Live Logs
      </h2>

      <div style={{
        background: "#111",
        color: "#0f0",
        padding: 10,
        height: 300,
        overflowY: "scroll",
        borderRadius: 10
      }}>

        <pre style={{
          whiteSpace: "pre-wrap",
          fontSize: "14px",
          color: "#0f0"
        }}>
          {logs.join("")}
        </pre>

      </div>

      <hr />

      {result && (

        <div>

          <h2>
            Workflow Timeline
          </h2>

          <pre style={{
            background: "#f4f4f4",
            padding: 10
          }}>
            {JSON.stringify(
              result.logs,
              null,
              2
            )}
          </pre>

          <h2>
            Final Strategy
          </h2>

          <pre style={{
            background: "#f4f4f4",
            padding: 10,
            overflowX: "scroll"
          }}>
            {JSON.stringify(
              result,
              null,
              2
            )}
          </pre>

        </div>

      )}

    </div>
  )
}