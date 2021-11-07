import { useEffect } from "react";
import ReactDOM from "react-dom";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import cx from "clsx";

import { CheckSVG, CloseSVG } from "../icons";
import {
	addVault,
	setModalOpen,
	setSelectedVault,
	updateVault,
} from "../store";

export function Modal() {
	const { register, handleSubmit, errors, reset, setValue } = useForm();

	const state = useSelector((state) => state.vault);

	const dispatch = useDispatch();

	const closeModal = () => {
		reset();
		dispatch(setModalOpen(false));
		dispatch(setSelectedVault(undefined));
	};

	const onSubmitHandler = (data) => {
		if (data) {
			closeModal();
		}
		if (state.selectedVault) {
			dispatch(
				updateVault({
					_id: state.selectedVault._id,
					...data,
				})
			);
		} else {
			dispatch(addVault(data));
		}
	};

	useEffect(() => {
		if (state.selectedVault) {
			setValue("name", state.selectedVault.name);
			setValue("address", state.selectedVault.address);
			setValue("symbol", state.selectedVault.symbol);
		}
	}, [state.selectedVault, setValue]);

	return state.isModalOpen
		? ReactDOM.createPortal(
				<div className="modal">
					<div className="modal__content">
						<header className="header modal__header">
							<h1 className="header__h2">
								{state.selectedVault ? (
									<>
										Edit <span>Vault</span>
									</>
								) : (
									<>
										Add <span>Vault</span>
									</>
								)}
							</h1>
							<button
								className="btn btn__compact btn__close"
								onClick={closeModal}
							>
								<CloseSVG />
							</button>
						</header>

						<form
							className="form modal__form"
							onSubmit={handleSubmit(onSubmitHandler)}
							noValidate
						>
							<div className="form__element">
								<label
									htmlFor="nameInput"
									className={cx("label", errors?.name && "label--error")}
								>
									{errors?.name ? (
										"Vault name is required!"
									) : (
										<>
											Vault name&nbsp;<span className="label__required">*</span>
										</>
									)}
								</label>
								<input
									type="text"
									id="nameInput"
									name="name"
									placeholder="Vault name"
									className={cx("input", errors?.name && "input--error")}
									{...register("message", {
										required: true,
									  })}
								/>
							</div>


							<div className="form__element">
								<label
									htmlFor="addressInput"
									className={cx("label", errors?.address && "label--error")}
								>
									{errors?.address ? (
										"NFT Address is required!"
									) : (
										<>
											Address&nbsp;<span className="label__required">*</span>
										</>
									)}
								</label>
								<input
									type="text"
									id="addressInput"
									name="address"
									placeholder="Address"
									className={cx("area", errors?.address && "input--error")}
									{...register("message", {
										required: true,
									  })}
								/>
							</div>

							<div className="form__element">
								<label
									htmlFor="symbol"
									className={cx("label", errors?.symbol && "label--error")}
								>
									{errors?.symbol ? (
										`${errors?.symbol.message}`
									) : (
										<>
											Phone&nbsp;<span className="label__required">*</span>
										</>
									)}
								</label>
								<input
									type="text"
									id="symbol"
									name="phone"
									placeholder="Symbol"
									className={cx("input", errors?.symbol && "input--error")}
									{...register("message", {
										required: "Symbol is required!",
										minLength: {
											value: 11,
											message: "Minimum of 11 digits",
										},
										maxLength: {
											value: 12,
											message: "Maximum of 12 digits",
										},
									  })}
								/>
							</div>

							<div className="form__action">
								<button
									className="btn btn__icon btn__cancel"
									type="button"
									onClick={closeModal}
								>
									<CloseSVG /> Cancel
								</button>
								<button className="btn btn__primary btn__icon" type="submit">
									<CheckSVG /> {state.selectedVault ? "Update" : "Submit"}
								</button>
							</div>
						</form>
					</div>
				</div>,
				document.body
		  )
		: null;
}
