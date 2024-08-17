const EpicHeader = () => {
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
          style={{ width: '25%' }}
        >
          Title
        </th>
        <th
          className="h-12 px-4 text-center align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 pl-6"
          style={{ width: '70%' }}
        >
          Assignee
        </th>
      </tr>
    </thead>
  )
}

export default EpicHeader
