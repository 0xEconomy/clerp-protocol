import { HYDRATE } from "next-redux-wrapper";
import * as t from "../types";

const initialState = {
	vaultList: [],
	selectedVault: undefined,
	isModalOpen: false,
};

const mainReducer = (state = initialState, action) => {
	switch (action.type) {
		case HYDRATE:
			return { ...state, ...action.payload };
		case t.MODAL_OPEN:
			return {
				...state,
				isModalOpen: action.payload,
			};
		case t.VAULT_FETCH_SUCCEEDED:
			return {
				...state,
				vaultList: action.payload,
			};
		case t.VAULT_ADD_SUCCEEDED:
			return {
				...state,
				vaultList: [action.payload, ...state.vaultList],
			};
		case t.VAULT_UPDATE_SUCCEEDED:
			const updatedVault = state.vaultList.map((vault) => {
				if (vault._id === action.payload._id) {
					return {
						...vault,
						name: action.payload.name,
						email: action.payload.email,
						address: action.payload.address,
						phone: action.payload.phone,
					};
				}
				return vault;
			});

			return { ...state, vaultList: updatedVault };
		case t.VAULT_DELETE_SUCCEEDED:
			const newVaultList = state.vaultList.filter(
				(vault) => vault._id !== action.payload
			);
			return {
				...state,
				vaultList: newVaultList,
			};
		case t.VAULT_SELECTED:
			const selectedVault = state.vaultList.find(
				(vault) => vault._id === action.payload
			);
			return {
				...state,
				selectedVault,
			};
		default:
			return state;
	}
};

export default mainReducer;
