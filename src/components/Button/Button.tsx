import React from 'react'
import classes from "./button.module.scss"

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, React.AriaAttributes { }

const Button: React.FC<ButtonProps & { customClass?: any }> = function (props) {
	const { children, ...rest } = props;

	return <button className={classes.button}   {...rest}  >
		{children}
	</button>
}

export default Button;