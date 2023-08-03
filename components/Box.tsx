import { twMerge } from "tailwind-merge";

interface BoxProps {
    children: React.ReactNode;
    className?: string;
}

const Box: React.FC<BoxProps> = ({
    children,
    className
}) => {
    const mergeClassName = twMerge(`bg-neutral-900 rounded-lg h-fit w-full`, className);
    return (
        
        // <div className={twMerge(`bg-neutral-900 rounded-lg h-fit w-full`, className)}>
        //     {children}
        // </div>
        <div className={mergeClassName}>
            {children}
        </div>
       
      );
}
 
export default Box;
