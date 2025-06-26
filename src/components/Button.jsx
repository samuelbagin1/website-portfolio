import { Link } from 'react-router-dom';

const Button = ({ 
  to, 
  children, 
  className = "", 
  variant = "default",
  size = "default",
  href,
  ...props 
}) => {
  // Base styles
  const baseStyles = "font-black text-sm border border-solid rounded-lg relative flex items-center justify-center ease-in duration-150";
  
  // Variant styles
  const variants = {
    default: "border-[#fefefa7e] opacity-75 hover:opacity-100 hover:border-[#fefefabc]",
    primary: "border-blue-500 opacity-75 hover:opacity-100 hover:border-blue-400",
    secondary: "border-gray-500 opacity-75 hover:opacity-100 hover:border-gray-400"
  };
  
  // Size styles
  const sizes = {
    default: "w-24 h-8",
    small: "w-20 h-6 text-xs",
    large: "w-32 h-10 text-base"
  };
  
  
  // Combine all classes
  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
  
  // If 'to' prop is provided, render as Link, otherwise as button
  if (to) {
    return (
      <Link to={to} className={buttonClasses} {...props}>
        {children}
      </Link>
    );
  }
  
  return (
    <button className={buttonClasses} href={href} target='_blank' rel='noopener noreferrer' {...props}>
      {children}
    </button>
  );
};

export default Button;