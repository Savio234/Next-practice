'use client';
import React, { InputHTMLAttributes, useState, ReactNode } from 'react';
import EyeCloseIcon from '@/shared/jsx/EyeClose';
import EyeOpenIcon from '@/shared/jsx/EyeOpen';
import styles from './InputField.module.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	name?: string;
	label?: string;
	isPassword?: boolean;
	className?: string;
	inputClass?: string;
	// customPrefix?: React.JSX.Element;
	customPrefix?: any;
	suffix?: React.JSX.Element;
	inputRef?: any;
	register?: any;
	value?: any
	suffixClass?: string
}

const InputField = ({ name, type = 'text', label, className, value, suffixClass, inputClass, customPrefix, isPassword, suffix, register, inputRef, ...options }: Props) => {
	const [inputType, setInputType] = useState<string>(type);
	const handleShowPassword = () => {
		if (inputType === 'password') {
			setInputType('text');
		}
		if (inputType === 'text') {
			setInputType('password');
		}
	};
	return (
		<div className={`${styles.input} ${className}`}>
			{!!label && (
				<label className={styles.input_label} htmlFor={name}>
					{label}
				</label>
			)}

			<div className={`${styles.input_wrapper} ${inputClass}`}>
				{customPrefix && <h6>{customPrefix}</h6>}

				<input name={name} value={value} className={`${inputClass} ${styles.input_field}`} type={inputType} ref={inputRef} {...register} {...options} />

				{isPassword && (
					<div className={styles.icon} onClick={handleShowPassword}>
						{inputType === 'password' ? <EyeCloseIcon /> : <EyeOpenIcon />}
					</div>
				)}

				{suffix && <div className={`${styles.suffixClass} ${styles.suffix_container}`}>{suffix && <>{suffix}</>}</div>}
			</div>
		</div>
	);
};

export default InputField;
