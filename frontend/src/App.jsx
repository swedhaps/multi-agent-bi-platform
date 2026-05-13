
import React, { useState } from "react"
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

  const submit = async () => {
    const response = await axios.post(
      "http://localhost:8000/run",
      form
    )

    setResult(response.data)
  }

  return (
    <div style={{padding: 20}}>
      <h1>Multi Agent BI Platform</h1>

      <input placeholder="Company Description"
        onChange={(e)=>setForm({...form, company_description:e.target.value})} />

      <br /><br />

      <input placeholder="Product Details"
        onChange={(e)=>setForm({...form, product_details:e.target.value})} />

      <br /><br />

      <input placeholder="Target Audience"
        onChange={(e)=>setForm({...form, target_audience:e.target.value})} />

      <br /><br />

      <input placeholder="Goals"
        onChange={(e)=>setForm({...form, goals:e.target.value})} />

      <br /><br />

      <input placeholder="Constraints"
        onChange={(e)=>setForm({...form, constraints:e.target.value})} />

      <br /><br />

      <button onClick={submit}>Run Agents</button>

      {result && (
        <div>
          <h2>Workflow Timeline</h2>
          <pre>{JSON.stringify(result.logs, null, 2)}</pre>

          <h2>Strategy</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
