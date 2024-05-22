import React from "react";

const UserLogoIcon = ({ userName }) => {
  return (
    <div className="user-logo rounded-circle bg-primary d-flex justify-content-center align-items-center ml-3">
      <span className="text-white fw-bold">{userName.charAt(0)}</span>
    </div>
  );
};

export default UserLogoIcon;
