
import { useState, useEffect } from "react";
import { fetchGitHubUser, fetchPinnedRepos, GitHubUser, GitHubRepo } from "@/services/github-service";
import ProfileHeader from "@/components/ProfileHeader";
import RepositoryList from "@/components/RepositoryList";
import { toast } from "sonner";

const GITHUB_USERNAME = "pwshehan";

const Index = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[] | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingRepos, setIsLoadingRepos] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch user data
        setIsLoadingUser(true);
        const userData = await fetchGitHubUser(GITHUB_USERNAME);
        setUser(userData);
        setIsLoadingUser(false);

        // Fetch repositories
        setIsLoadingRepos(true);
        const reposData = await fetchPinnedRepos(GITHUB_USERNAME);
        setRepos(reposData);
        setIsLoadingRepos(false);
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Failed to load GitHub data. Please try again later.");
        setIsLoadingUser(false);
        setIsLoadingRepos(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-portfolio-dark to-background">
      <div className="container mx-auto px-4 py-10">
        <header className="mb-6">
          <ProfileHeader user={user} isLoading={isLoadingUser} />
        </header>

        <main>
          <div className="max-w-5xl mx-auto">
            <RepositoryList repos={repos} isLoading={isLoadingRepos} />
          </div>
        </main>

        <footer className="mt-20 py-6 text-center text-muted-foreground border-t border-border">
          <p>© {new Date().getFullYear()} {user?.name || GITHUB_USERNAME}. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Made with ❤️ using React, TypeScript, and GitHub API
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
