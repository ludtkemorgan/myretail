import React, { Component } from 'react';
import './styles/Button.css';

export const ButtonSize = {
  SMALL: 'small',
  LARGE: 'large'
}

export const ButtonStyle = {
  FLAT: 'flat',
  PRIMARY: 'primary',
  SECONDARY: 'secondary'
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  href?: string;
  text?: string | null | JSX.Element;
  buttonId?: string | null | JSX.Element;
  classes?: string | null | JSK.Element;
  size?: ButtonSize;
  style?: ButtonStyle;
}

export class Button extends Component<ButtonProps> {
  static defaultProps: Partial<ButtonProps> = {
    size: ButtonSize.SMALL,
    style: ButtonStyle.PRIMARY
  };

  render() {
    const { buttonId, text, classes, href, size, style } = this.props;
    const Tag = (href ? 'a' : 'button');
    const type = (href ? 'button' : 'submit');
    const buttonStyle = 'button button-' + style + ' ';
    const addedClassNames = buttonStyle + (classes || "");
    const buttonSize = "button-container button-" + size;

    return (
      <Tag className={addedClassNames} id={buttonId} href={href} type={type}>
        <span class={buttonSize}>{text} </span>
      </Tag>
    );
  }
}
