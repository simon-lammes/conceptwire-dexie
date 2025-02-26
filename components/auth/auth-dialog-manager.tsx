"use client";

import { db } from "@/utils/db";
import styled from "@emotion/styled";
import {
	type DXCInputField,
	type DXCUserInteraction,
	resolveText,
} from "dexie-cloud-addon";
import { useObservable } from "dexie-react-hooks";
import { useState } from "react";

/**
 * This component manages whether to show the auth dialog - depending on the dexie cloud authentication state.
 */
export function AuthDialogManager() {
	const ui = useObservable(db.cloud.userInteraction);
	if (!ui) return null; // No user interaction is requested.
	return <AuthDialog ui={ui} />;
}

function AuthDialog({ ui }: { ui: DXCUserInteraction }) {
	const [params, setParams] = useState<{ [param: string]: string }>({});

	return (
		<MyDialogStyling>
			<div className="fullscreen darken" />
			<div className="fullscreen dlg-outer">
				<div className="dlg-inner">
					<h2>My Custom Login Prompt</h2>
					<h3>{ui.title}</h3>
					{ui.alerts?.map((alert, i) => (
						<p key={i} className={`dxcdlg-alert-${alert.type}`}>
							{resolveText(alert)}
						</p>
					))}
					<form
						onSubmit={(ev) => {
							ev.preventDefault();
							ui.onSubmit(params);
						}}
					>
						{(Object.entries(ui.fields) as [string, DXCInputField][]).map(
							([fieldName, { type, label, placeholder }], idx) => (
								<label key={idx}>
									{label ? `${label}: ` : ""}
									<input
										type={type}
										name={fieldName}
										placeholder={placeholder}
										value={params[fieldName] || ""}
										onChange={(ev) => {
											const value = ev.target.value;
											const updatedParams = {
												...params,
												[fieldName]: value,
											};
											setParams(updatedParams);
										}}
									/>
								</label>
							),
						)}
					</form>
					<div className="dxc-buttons">
						<>
							<button type="submit" onClick={() => ui.onSubmit(params)}>
								{ui.submitLabel}
							</button>
							{ui.cancelLabel && (
								<button onClick={ui.onCancel}>{ui.cancelLabel}</button>
							)}
						</>
					</div>
				</div>
			</div>
		</MyDialogStyling>
	);
}

// Dialog styling
const MyDialogStyling = styled.div`
  .fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
  .darken {
    opacity: 0.5;
    background-color: #000;
    z-index: 150;
    backdrop-filter: blur(2px);
    webkit-backdrop-filter: blur(2px);
  }
  .dlg-outer {
    z-index: 150;
    align-items: center;
    display: flex;
    justify-content: center;
  }
  .dlg-inner {
    position: relative;
    color: #222;
    background-color: #fff;
    padding: 30px;
    margin-bottom: 2em;
    max-width: 90%;
    max-height: 90%;
    overflow-y: auto;
    border: 3px solid #3d3d5d;
    border-radius: 8px;
    box-shadow: 0 0 80px 10px #666;
    width: auto;
    font-family: sans-serif;
  }
  .dlg-input {
    height: 35px;
    width: 17em;
    border-color: #ccf4;
    outline: none;
    font-size: 17pt;
    padding: 8px;
  }
  .alert-error {
    color: red;
    font-weight: bold;
  }
  .alert-warning {
    color: #f80;
    font-weight: bold;
  }
  .alert-info {
    color: black;
  }
`;
