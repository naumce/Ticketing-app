import React from "react"
import TicketCard from "./(components)/TicketCard"

const getTickets = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Tickets", {
      cache: "no-store"
    })

    return res.json()
  } catch (error) {
    console.error(error)
  }
}
const Dashboard = async () => {
  const { tickets }: any = await getTickets()

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }: any) => category))
  ]

  return (
    <div className="p-5 ">
      <div>
        {tickets &&
          uniqueCategories.map((uniqueCategory: any, categoryIndex: any) => (
            <div key={categoryIndex} className="mb-4">
              <h2>{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {tickets
                  .filter((ticket: any) => ticket.category === uniqueCategory)
                  .map((filteredTicket: any, _index: any) => (
                    <TicketCard
                      id={_index}
                      key={_index}
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Dashboard
