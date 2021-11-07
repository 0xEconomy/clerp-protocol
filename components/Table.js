import { useSelector, useDispatch } from "react-redux";
import { PencilSVG, TrashSVG } from "../icons";
import {
	deleteVault,
	fetchVaults,
	setModalOpen,
	setSelectedVault,
} from "../store";
import { useEffect } from "react";

export function Table() {
	const state = useSelector((state) => state.vault);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchVaults());
	}, [dispatch]);

	return (
		<table className="table">
			<thead className="table__head">
				<tr>
					<th>Full name</th>
					<th>Email</th>
					<th>Address</th>
					<th>Phone</th>
					<th>Actions</th>
				</tr>
			</thead>

			<tbody className="table__body">
				{state.vaultList.map(({ _id, name, email, address, phone }) => (
					<tr key={_id}>
						<td>{name}</td>
						<td>{email}</td>
						<td>{address}</td>
						<td>{phone}</td>
						<td>
							<button
								className="btn btn__compact btn__edit"
								onClick={() => {
									dispatch(setSelectedVault(_id));
									dispatch(setModalOpen(true));
								}}
							>
								<PencilSVG />
							</button>
							<button
								className="btn btn__compact btn__delete"
								onClick={() => {
									dispatch(deleteVault(_id));
								}}
							>
								<TrashSVG />
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
