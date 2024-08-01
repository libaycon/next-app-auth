import { BsExclamationTriangle } from "react-icons/bs";

interface FormErrorProps {
    message?: string;
}

export const FormError = ({
    message
}: FormErrorProps) => {
    if(!message) return null;
    
    return (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-ms text-destructive">
            <BsExclamationTriangle className="size-4" />
            <p className="text-xs">{message}</p>
        </div>
    )
}