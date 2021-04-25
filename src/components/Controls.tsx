import * as React from "react";
import Button from "./Button";
import { ButtonProps } from "./Button";
import { ResetButton, StartButton } from "../models/Buttons";

interface ControlsProps {
  handleReset: () => void;
  handleStartStop: () => void;
}

export default class Controls extends React.Component<any, ControlsProps> {
  constructor(props) {
    super(props);

    this.renderButton = this.renderButton.bind(this);
  }
  //TODO: abstract this out to a helper function
  renderButton(buttonProps: typeof ButtonProps) {
    return (
      <Button
        id={buttonProps.id}
        handleClick={buttonProps.handleClick}
        value={buttonProps.value}
        displayText={buttonProps.displayText}
      />
    );
  }
  render() {
    StartButton.handleClick = this.props.handleStartStop;
    ResetButton.handleClick = this.props.handleReset;
    return (
      <div>
        <p>This is the controls section. </p>
        <div className="button-row">
          <div>{this.renderButton(StartButton)}</div>
          <div>{this.renderButton(ResetButton)}</div>
        </div>
      </div>
    );
  }
}
