import { all, put, takeLatest } from "redux-saga/effects";
import * as t from "../types";

function* fetchVaults() {
	try {
		const response = yield fetch("/api/vaults");

		const vaultList = yield response.json();

		yield put({
			type: t.VAULT_FETCH_SUCCEEDED,
			payload: vaultList.data,
		});
	} catch (error) {
		yield put({
			type: t.VAULT_FETCH_FAILED,
			payload: error.message,
		});
	}
}

function* watchFetchVaults() {
	yield takeLatest(t.VAULT_FETCH_REQUESTED, fetchVaults);
}

function* addVault(action) {
	try {
		const response = yield fetch("/api/vaults", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});

		const newVault = yield response.json();

		yield put({
			type: t.VAULT_ADD_SUCCEEDED,
			payload: newVault.data,
		});
	} catch (error) {
		yield put({
			type: t.VAULT_ADD_FAILED,
			payload: error.message,
		});
	}
}

function* watchAddVault() {
	yield takeLatest(t.VAULT_ADD_REQUESTED, addVault);
}

function* deleteVault(action) {
	try {
		const response = yield fetch("/api/vaults/" + action.payload, {
			method: "DELETE",
		});

		const deletedVault = yield response.json();

		yield put({
			type: t.VAULT_DELETE_SUCCEEDED,
			payload: deletedVault.data.id,
		});
	} catch (error) {
		yield put({
			type: t.VAULT_DELETE_FAILED,
			payload: error.message,
		});
	}
}

function* watchRemoveVault() {
	yield takeLatest(t.VAULT_DELETE_REQUESTED, deleteVault);
}

function* updateVault(action) {
	try {
		const response = yield fetch("/api/vaults/" + action.payload._id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});

		const updatedVault = yield response.json();

		yield put({
			type: t.VAULT_UPDATE_SUCCEEDED,
			payload: updatedVault.data,
		});
	} catch (error) {
		yield put({
			type: t.VAULT_UPDATE_FAILED,
			payload: error.message,
		});
	}
}

function* watchUpdateVault() {
	yield takeLatest(t.VAULT_UPDATE_REQUESTED, updateVault);
}

export default function* rootSaga() {
	yield all([
		watchFetchVaults(),
		watchAddVault(),
		watchRemoveVault(),
		watchUpdateVault(),
	]);
}
