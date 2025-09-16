interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  variant?: "default" | "elevated" | "outlined" | "glass";
}

export function Card({ children, className = "", title, variant = "default" }: CardProps) {
  const variants = {
    default: "bg-white shadow-lg border border-slate-200",
    elevated: "bg-white shadow-xl border border-slate-200/50",
    outlined: "bg-white border-2 border-slate-300 shadow-sm",
    glass: "bg-white/95 backdrop-blur-sm border border-slate-200/50 shadow-lg"
  };

  return (
    <div className={`rounded-xl ${variants[variant]} transition-all duration-300 hover:shadow-xl ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
}

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  loading?: boolean;
}

export function Button({ 
  children, 
  onClick, 
  type = "button", 
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  loading = false
}: ButtonProps) {
  const baseClasses = "font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2";
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2.5 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-lg"
  };

  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-500 shadow-lg hover:shadow-xl",
    secondary: "bg-slate-200 text-slate-800 hover:bg-slate-300 border border-slate-300 focus:ring-slate-500",
    success: "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 focus:ring-green-500 shadow-lg hover:shadow-xl",
    danger: "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 focus:ring-red-500 shadow-lg hover:shadow-xl",
    warning: "bg-gradient-to-r from-yellow-600 to-amber-600 text-white hover:from-yellow-700 hover:to-amber-700 focus:ring-yellow-500 shadow-lg hover:shadow-xl",
    ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:ring-slate-500",
    outline: "border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 focus:ring-slate-500"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
}

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  name?: string;
}

export function Input({ 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  required = false,
  error,
  name
}: InputProps) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-3 border rounded-lg shadow-sm bg-white/95 backdrop-blur-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
          error ? "border-red-500" : "border-slate-300"
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

interface SelectProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  error?: string;
  name?: string;
}

export function Select({ 
  label, 
  value, 
  onChange, 
  options, 
  required = false,
  error,
  name
}: SelectProps) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-3 py-2 border rounded-md shadow-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        aria-label={label ? undefined : name || "Select"}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

// Loading Spinner Component
interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "blue" | "gray" | "white";
  className?: string;
}

export function Spinner({ size = "md", color = "blue", className = "" }: SpinnerProps) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  };

  const colors = {
    blue: "text-blue-600",
    gray: "text-gray-600",
    white: "text-white"
  };

  return (
    <div className={`animate-spin ${sizes[size]} ${colors[color]} ${className}`}>
      <svg fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  );
}

// Badge Component
interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({ children, variant = "default", size = "md", className = "" }: BadgeProps) {
  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm"
  };

  const variants = {
    default: "bg-slate-100 text-slate-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800", 
    danger: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800"
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-full ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

// Alert Component  
interface AlertProps {
  children: React.ReactNode;
  variant?: "info" | "success" | "warning" | "danger";
  className?: string;
  onClose?: () => void;
}

export function Alert({ children, variant = "info", className = "", onClose }: AlertProps) {
  const variants = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    success: "bg-green-50 border-green-200 text-green-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    danger: "bg-red-50 border-red-200 text-red-800"
  };

  return (
    <div className={`border rounded-lg p-4 ${variants[variant]} ${className}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">{children}</div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-current opacity-50 hover:opacity-75 focus:outline-none"
            aria-label="Close alert"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}