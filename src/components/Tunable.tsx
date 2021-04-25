import * as React from "react";
import Button from "./Button";
import ButtonProps from "./Button";

interface TunableProps {
  onButtonClick: () => void;
  buttons: typeof ButtonProps[];
  timerId: string;
  labelId: string;
  value: string;
  length: string | number;
}

export default class Tunable extends React.Component<any, TunableProps> {
  constructor(props) {
    super(props);
    this.renderButton = this.renderButton.bind(this);
  }
  renderButton(buttonProps: typeof ButtonProps) {
    return (
      <Button
        id={buttonProps.id}
        handleClick={this.props.onClick}
        value={buttonProps.value}
        displayText={buttonProps.displayText}
        dataType={buttonProps.dataType}
      />
    );
  }
  render() {
    return (
      <div>
        <div className="button-row">
          <div>{this.renderButton(this.props.buttons[0])}</div>
          <div>
            <div id={this.props.labelId} value={this.props.value}>
              {this.props.value}
            </div>
            <div id={this.props.timerId} value={this.props.length}>
              {this.props.length}
            </div>
          </div>
          <div>{this.renderButton(this.props.buttons[1])}</div>
        </div>
      </div>
    );
  }
}
