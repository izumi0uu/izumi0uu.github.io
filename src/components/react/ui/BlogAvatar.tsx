import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/react/radix-ui/Avatar";
import { SpringElement } from "@/components/react/ui/SpringElement";

interface BlogAvatarProps {
  avatarSrc: string;
  fallbackText?: string;
}

const BlogAvatar: React.FC<BlogAvatarProps> = ({ avatarSrc, fallbackText = "ZD" }) => {
  return (
    <SpringElement>
      <Avatar>
        <AvatarImage src={avatarSrc} />
        <AvatarFallback>{fallbackText}</AvatarFallback>
      </Avatar>
    </SpringElement>
  );
};

export { BlogAvatar };
