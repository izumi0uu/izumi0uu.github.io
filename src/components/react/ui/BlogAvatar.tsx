import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/react/radix-ui/Avatar";
import { SpringElement } from "@/components/react/ui/SpringElement";

interface BlogAvatarProps {
  avatarSrc: string;
  fallbackText?: string;
  size?: "sm" | "md" | "lg";
}

const BlogAvatar: React.FC<BlogAvatarProps> = ({ avatarSrc, fallbackText = "ZD", size = "md" }) => {
  // 根据尺寸设置不同的大小
  const avatarSizeClass = {
    sm: "size-12",
    md: "size-16",
    lg: "size-20",
  }[size];

  return (
    <SpringElement>
      <Avatar className={avatarSizeClass}>
        <AvatarImage src={avatarSrc} />
        <AvatarFallback>{fallbackText}</AvatarFallback>
      </Avatar>
    </SpringElement>
  );
};

export { BlogAvatar };
