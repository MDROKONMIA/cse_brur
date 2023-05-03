import { Avatar } from "flowbite-react";
import { useState } from "react";
import "./formInput.css";

const FormInput = (props) => {
    const inputClass =
        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
    const [focused, setFocused] = useState(false);
    const {
        label,
        errorMessage,
        onChange,
        id,
        preview = false,
        avatarPreview,
        ...inputProps
    } = props;

    const handleFocus = (e) => {
        setFocused(true);
    };

    return (
        <div className="formInput">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {label}
            </label>
            {preview && (
                <Avatar img={avatarPreview} size="xl" className="mb-2" />

            )}
            {props.type !== "textarea" ? (
                <input
                    className={inputClass}
                    {...inputProps}
                    onChange={onChange}
                    onBlur={handleFocus}
                    onFocus={() =>
                        inputProps.name === "confirmPassword" && setFocused(true)
                    }
                    focused={focused.toString()}
                />
            ) : (<textarea
                id="address"
                rows={6}
                className={inputClass}
                {...inputProps}
                type="text"
                onBlur={handleFocus}
                onChange={onChange}
            />)}

            <span className="text-red-600 InputErrorspan">{errorMessage}</span>
        </div>
    );
};

export default FormInput;
