import React from "react";

export const TextFooter: React.FC = () => {
  return (
    <footer className="p-10 text-center font-pretendard text-caption2">
      <p>
        Copyright © {new Date().getFullYear()} - All rights reserved by Season
        Ping
      </p>
    </footer>
  );
};
