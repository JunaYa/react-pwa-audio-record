'use client'
import { useState } from "react"

const ClientComponent = () => {
  const [count, setCount] = useState(0)
  return <div onClick={() => setCount(count + 1)}>{count}</div>
}

export default ClientComponent