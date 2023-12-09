// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export interface WorkspaceTypeProps {
  workspace: {
    id: number
    title: string
    profile: string
  }
}

const initialState: WorkspaceTypeProps = {
  workspace: {
    id: 0,
    title: '',
    profile: '',
  },
}

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {},
})

export default workspaceSlice.reducer
