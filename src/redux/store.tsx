import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "./reducer/MenuReducer";
import ThemeReducer from "./reducer/ThemeReduce";
import UserReducer from "./reducer/UserReduce";
import UpdateReducer from "./reducer/UpdateReduce";
import LoadingReducer from "./reducer/LoadingReducer";
import RefreshReducer from "./reducer/RefreshReducer";
import NoticeReducer from "./reducer/noticeReducer";
import AlertReducer from "./reducer/alertReducer";
const store = configureStore({
    reducer: {
        menu: MenuReducer.reducer,
        theme: ThemeReducer.reducer,
        user: UserReducer.reducer,
        update: UpdateReducer.reducer,
        loading: LoadingReducer.reducer,
        refresh: RefreshReducer.reducer,
        notice: NoticeReducer.reducer,
        alert: AlertReducer.reducer,
    }
})

export default store