import * as React from "react";
import Phase from "./Pomodoro";

export interface ButtonProps {
  id: string;
  handleClick: () => {};
  value: string;
  displayText: string;
  dataType: Phase;
}

// export default function Button(props: ButtonProps) {
//   return (
//     <div>
//       <Button
//         id={props.id}
//         data-type={props.dataType}
//         value={props.value}
//         onClick={props.handleClick}
//       >
//         {props.displayText}
//       </Button>
//     </div>
//   );
// }

export default class Button extends React.Component<any, ButtonProps> {
  render() {
    return (
      <button
        id={this.props.id}
        data-type={this.props.dataType}
        value={this.props.value}
        onClick={this.props.handleClick}
      >
        {this.props.displayText}
      </button>
    );
  }
}
