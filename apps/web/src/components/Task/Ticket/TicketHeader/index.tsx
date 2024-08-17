const TicketHeader = () => {
  return (
    <thead className="[&amp;_tr]:border-b">
      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
        <th
          className="h-12 px-4 text-center align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 pl-6"
          style={{ width: '5%' }}
        >
          Type
        </th>
        <th
          className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 pl-6"
          style={{ width: '55%' }}
        >
          Title
        </th>
        <th
          className="h-12 px-4 text-center align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 pl-6"
          style={{ width: '10%' }}
        >
          Assignee
        </th>
        <th
          className="h-12 px-4 text-center align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 pl-6"
          style={{ width: '15%' }}
        >
          Due Date
        </th>
        <th
          className="h-12 px-4 text-center align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 pl-6"
          style={{ width: '15%' }}
        >
          Status
        </th>
      </tr>
    </thead>
  )
}

export default TicketHeader
