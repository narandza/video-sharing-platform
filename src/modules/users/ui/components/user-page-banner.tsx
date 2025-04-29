import { cn } from "@/lib/utils";
import { UserGetOneOutput } from "../../types";

interface UserPageBannerProps {
  user: UserGetOneOutput;
}

export const UserPageBanner = ({ user }: UserPageBannerProps) => {
  return (
    <div className="relative group">
      <div
        className={cn(
          "w-full max-h-[200px] h-[15vh] md:h-[25vh] bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl",
          user.bannerUrl ? "bg-cover bg-center" : " bg-gray-100"
        )}
        style={{
          backgroundImage: user.bannerUrl
            ? `url(${user.bannerUrl})`
            : undefined,
        }}
      ></div>
    </div>
  );
};
