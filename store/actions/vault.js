import * as t from "../types";

export const setModalOpen = (isModalOpen) => {
	return {
		type: t.MODAL_OPEN,
		payload: isModalOpen,
	};
};

export const fetchVaults = () => {
	return {
		type: t.VAULT_FETCH_REQUESTED,
	};
};

export const addVault = (vault) => {
	return {
		type: t.VAULT_ADD_REQUESTED,
		payload: vault,
	};
};

export const updateVault = (vault) => {
	return {
		type: t.VAULT_UPDATE_REQUESTED,
		payload: vault,
	};
};

export const deleteVault = (id) => {
	return {
		type: t.VAULT_DELETE_REQUESTED,
		payload: id,
	};
};

export const setSelectedVault = (id) => {
	return {
		type: t.VAULT_SELECTED,
		payload: id,
	};
};
