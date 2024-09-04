import { ReactNode } from "react";

export const SecondaryButton = ({
    children,
    onClick,
    size = "small"
}: {
    children: ReactNode,
    onClick: () => void,
    size?: "big" | "small"
}) => {
    return (
        <div onClick={onClick} className={`
            ${size === "small" ? "text-sm px-8 py-2" : "text-lg font-semibold px-12 py-4"}
            cursor-pointer border border-black hover:border-2
            text-black rounded-full 
        `}>
            {children}
        </div>
    );
}
