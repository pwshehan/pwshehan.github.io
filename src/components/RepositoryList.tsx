
import RepositoryCard from "./RepositoryCard";
import { GitHubRepo } from "@/services/github-service";
import { Skeleton } from "@/components/ui/skeleton";

interface RepositoryListProps {
  repos: GitHubRepo[] | null;
  isLoading: boolean;
}

const RepositoryList = ({ repos, isLoading }: RepositoryListProps) => {
  if (isLoading) {
    return (
      <section className="py-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-portfolio-secondary">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-64 rounded-xl">
              <Skeleton className="w-full h-full rounded-xl bg-secondary/30" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!repos || repos.length === 0) {
    return (
      <section className="py-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-portfolio-secondary">Featured Projects</h2>
        <p className="text-center text-muted-foreground">No repositories found.</p>
      </section>
    );
  }

  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-portfolio-secondary">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo, index) => (
          <RepositoryCard key={repo.id} repo={repo} delay={index} />
        ))}
      </div>
    </section>
  );
};

export default RepositoryList;
