"use client"

import { useRouter } from "next/navigation"
import React, { useState } from "react"

const TicketForm = ({ ticket }: any) => {
  const EDITMODE = ticket._id === "new" ? false : true
  console.log("ticket", ticket)
  const router = useRouter()

  const handleChange = (e: any) => {
    const value = e.target.value
    const name = e.target.name

    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (EDITMODE) {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (!res.ok) {
        throw new Error("Failed to update tickets")
      }
    } else {
      const res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify({ formData }),
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (!res.ok) {
        throw new Error("Could not create tickets")
      }
    }

    router.refresh()
    router.push("/")
  }

  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Hardware problem"
  }

  if (EDITMODE) {
    startingTicketData["title"] = ticket.title
    startingTicketData["description"] = ticket.description
    startingTicketData["priority"] = ticket.title
    startingTicketData["progress"] = ticket.progress
    startingTicketData["status"] = ticket.status
    startingTicketData["category"] = ticket.category
  }

  const [formData, setFormData] = useState(startingTicketData)

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col pag-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>{EDITMODE ? "Update ticket" : " Create Ticket"}</h3>

        <label>Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter title"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />
        <label>Descrption</label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows={5}
        />

        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Hardware problem">Hardware problem</option>
          <option value="Software problem">Software problem</option>
          <option value="Network problem">Network problem</option>
        </select>
        <div>
          <input
            id="priority-1"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={1}
            checked={formData.priority == 1}
          />
          <label>1</label>
          <input
            id="priority-2"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={2}
            checked={formData.priority == 2}
          />
          <label>2</label>
          <input
            id="priority-3"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={3}
            checked={formData.priority == 3}
          />
          <label>3</label>
          <input
            id="priority-4"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={4}
            checked={formData.priority == 4}
          />
          <label>4</label>
          <input
            id="priority-5"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={5}
            checked={formData.priority == 5}
          />
          <label>5</label>
        </div>
        <label> Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleChange}
        />
        <label> Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="not started">Not started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>
        <input
          type="submit"
          className="btn "
          value={EDITMODE ? "Update ticket" : " Create Ticket"}
        />
      </form>
    </div>
  )
}

export default TicketForm
