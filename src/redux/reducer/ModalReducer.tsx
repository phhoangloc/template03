
import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"
export type ModalType = {
    value: string,
    open: boolean,
    msg: string,
    data: any
}
const ModalReducer = createSlice({
    name: "Modal",
    initialState: { value: "", open: false, msg: "", data: {} },
    reducers: {
        setModal: {
            reducer: (state: ModalType, action: PayloadAction<ModalType>) => {
                return (state = action.payload)
            },
            prepare: (msg: ModalType) => {
                return {
                    payload: msg
                }
            }
        }
    }
})

export const { actions, reducer } = ModalReducer
export const { setModal } = actions;

export default ModalReducer