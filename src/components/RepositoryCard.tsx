
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitHubRepo } from "@/services/github-service";
import { Github } from "lucide-react";

interface RepositoryCardProps {
  repo: GitHubRepo;
  delay: number;
}

const RepositoryCard = ({ repo, delay }: RepositoryCardProps) => {
  return (
    <Card className="flex flex-col h-full opacity-0 animate-fade-in border border-secondary bg-card/50 backdrop-blur-sm" style={{ animationDelay: `${delay * 100}ms`, animationFillMode: 'forwards' }}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold text-portfolio-secondary">
            {repo.name}
          </CardTitle>
          <a 
            href={repo.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-portfolio-secondary transition-colors"
          >
            <Github size={20} />
          </a>
        </div>
        <CardDescription className="line-clamp-2 h-10 text-muted-foreground">
          {repo.description || "No description available"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {repo.topics.slice(0, 3).map((topic) => (
              <Badge key={topic} variant="outline" className="text-xs bg-portfolio-primary/20 text-portfolio-secondary border-portfolio-primary/30">
                {topic}
              </Badge>
            ))}
            {repo.topics.length > 3 && (
              <Badge variant="outline" className="text-xs bg-portfolio-primary/20 text-portfolio-secondary border-portfolio-primary/30">
                +{repo.topics.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          {repo.language && (
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-portfolio-secondary"></span>
              <span>{repo.language}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span>⭐</span>
            <span>{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🍴</span>
            <span>{repo.forks_count}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RepositoryCard;
