
import { useState, useEffect } from "react";
import { GitHubUser } from "@/services/github-service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Github, Link, Twitter } from "lucide-react";

interface ProfileHeaderProps {
  user: GitHubUser | null;
  isLoading: boolean;
}

const ProfileHeader = ({ user, isLoading }: ProfileHeaderProps) => {
  const [initials, setInitials] = useState("GD");

  useEffect(() => {
    if (user?.name) {
      const nameArr = user.name.split(" ");
      const firstInitial = nameArr[0] ? nameArr[0][0] : "";
      const lastInitial = nameArr.length > 1 ? nameArr[nameArr.length - 1][0] : "";
      setInitials(`${firstInitial}${lastInitial}`);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 animate-pulse">
        <div className="w-32 h-32 rounded-full bg-secondary"></div>
        <div className="h-8 w-48 bg-secondary mt-4 rounded"></div>
        <div className="h-4 w-64 bg-secondary mt-2 rounded"></div>
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center gap-6 p-8 animate-fade-in max-w-3xl mx-auto text-center">
      <div className="flex-shrink-0">
        <Avatar className="w-32 h-32 border-4 border-portfolio-secondary">
          <AvatarImage src={user?.avatar_url} alt={user?.name || "Profile"} />
          <AvatarFallback className="text-3xl bg-portfolio-primary text-white">{initials}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl md:text-4xl font-bold text-portfolio-secondary">{user?.name}</h1>
        <h2 className="text-xl text-muted-foreground">@{user?.login}</h2>
        
        <p className="text-lg mt-2 max-w-lg text-center">
          {user?.bio}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-3 justify-center">
          {user?.location && (
            <Badge variant="secondary" className="text-sm">
              📍 {user.location}
            </Badge>
          )}
          {user?.company && (
            <Badge variant="secondary" className="text-sm">
              🏢 {user.company}
            </Badge>
          )}
          <Badge variant="secondary" className="text-sm">
            👥 {user?.followers} followers
          </Badge>
        </div>
        
        <div className="flex flex-wrap gap-4 mt-4 justify-center">
          <a 
            href={user?.html_url || "#"} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-portfolio-secondary hover:text-white transition-colors"
          >
            <Github size={20} />
            <span>GitHub</span>
          </a>
          
          {user?.blog && (
            <a 
              href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-portfolio-secondary hover:text-white transition-colors"
            >
              <Link size={20} />
              <span>Website</span>
            </a>
          )}
          
          {user?.twitter_username && (
            <a 
              href={`https://twitter.com/${user.twitter_username}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-portfolio-secondary hover:text-white transition-colors"
            >
              <Twitter size={20} />
              <span>Twitter</span>
            </a>
          )}

          <a 
            href="https://buymeacoffee.com/pwshehan" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-[#FFDD00] text-[#000000] px-3 py-1 rounded-md hover:bg-[#FFDD00]/80 transition-colors"
          >
            <span>☕ Buy Me a Coffee</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;
