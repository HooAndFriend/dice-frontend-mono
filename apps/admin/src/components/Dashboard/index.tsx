// ** Router Imports
import { Route, Routes } from 'react-router-dom'

// ** Menu Imports
import { DashboardMenuList } from '../MenuList'

// ** Utils Imports
import { compact } from 'lodash'

// ** Layout Imports'
import UseLayout from '@/src/layout'

const Dashboard = () => {
  return (
    <UseLayout>
      <Routes>
        {compact(
          DashboardMenuList.map((item) => (
            <Route
              key={item.name}
              path={`/${item.route}`}
              element={item.element}
            />
          )),
        )}
      </Routes>
    </UseLayout>
  )
}

export default Dashboard
