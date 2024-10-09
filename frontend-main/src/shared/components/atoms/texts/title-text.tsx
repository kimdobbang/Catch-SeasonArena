interface TitleTextProps {
  children?: React.ReactNode;
  color: string;
  className?: string;
}

export const TitleText = ({ children, color, className }: TitleTextProps) => {
  const getColor = () => {
    switch (color) {
      case "green":
        return "text-catch-system-color-success";
      case "red":
        return "text-catch-system-color-error";
      case "blue":
        return "text-catch-system-color-info";
      default:
        return "text-catch-system-color-info";
    }
  };
  return (
    <h1
      className={` text-center font-bold text-title ${className} ${getColor()}`}
    >
      {children}
    </h1>
  );
};
