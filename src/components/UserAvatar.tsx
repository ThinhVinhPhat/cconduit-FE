import React from "react";
import { Link } from "react-router-dom";

interface UserAvatarProps {
  image?: string;
  username?: string;
  size?: "sm" | "md" | "lg" | "xl";
  withLink?: boolean;
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  image,
  username,
  size = "sm",
  withLink = true,
  className = "",
}) => {
  const fallbackImage =
    "https://static.productionready.io/images/smiley-cyrus.jpg";

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-20 h-20",
    xl: "w-32 h-32",
  };

  const avatarClasses = `rounded-full object-cover border ${sizeClasses[size]} ${className}`;

  const avatarImage = (
    <img
      style={{
        width: "200px",
        height: "200px",
        objectFit: "cover",
      }}
      src={image || fallbackImage}
      alt={`${username || "User"}'s avatar`}
      className={avatarClasses}
      onError={(e) => {
        (e.target as HTMLImageElement).src = fallbackImage;
      }}
    />
  );

  if (withLink && username) {
    return (
      <Link to={`/profile/${username}`} className="avatar-link">
        {avatarImage}
      </Link>
    );
  }

  return avatarImage;
};

export default UserAvatar;
