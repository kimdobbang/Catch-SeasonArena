interface LoginButtonProps {
  onClick?: () => void;
  logo: JSX.Element;
  bgColor: string;
  text: string;
  textColor: string;
}

export const SignupButton: React.FC<LoginButtonProps> = ({
  onClick,
  logo,
  bgColor,
  text,
  textColor,
}) => {
  return (
    <button
      className={`relative flex items-center justify-center w-64 h-10 ${bgColor} rounded-xl`}
      onClick={onClick}
      aria-label={text}
    >
      <div className="absolute left-4">{logo}</div>
      <div className={`${textColor} font-pretendard-b2-medium text-center`}>
        {text}
      </div>
    </button>
  );
};

export const LoginButton: React.FC<LoginButtonProps> = ({
  onClick,
  logo,
  bgColor,
  text,
  textColor,
}) => {
  return (
    <button
      className={`relative flex items-center justify-center w-64 h-10 ${bgColor} rounded-xl`}
      onClick={onClick}
      aria-label={text}
    >
      <div className="absolute left-4">{logo}</div>
      <div className={`${textColor} font-pretendard-b2-medium text-center`}>
        {text}
      </div>
    </button>
  );
};
