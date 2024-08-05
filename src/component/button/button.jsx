import clsx from "clsx";
import '../button/button.scss'

function Button({ children, variant = "white", className }) {
    return (
        <button
            className={clsx(
                "button px-10 py-3",
                variant === "gray"
                    ? "bg-gray-600 text-white "
                    : "bg-blue-900 text-white ",
                variant === "blue"
                    ? "bg-blue-900 text-white hover:border-blue-900 hover:text-white hover:bg-gray-600"
                    : "bg-white hover:bg-blue-900 hover:text-white",

                className
            )}
        >
            {children}
        </button>
    );
}

export default Button;