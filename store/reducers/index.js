import { combineReducers } from "redux";
import vaultReducer from "./vault";

const rootReducer = combineReducers({
	vault: vaultReducer,
});

export default rootReducer;
