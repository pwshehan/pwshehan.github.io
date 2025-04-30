
export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  bio: string;
  twitter_username: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  homepage: string | null;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  topics: string[];
  forks_count: number;
}

const GITHUB_API_BASE = "https://api.github.com";

export const fetchGitHubUser = async (username: string): Promise<GitHubUser> => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching GitHub user data:", error);
    throw error;
  }
};

export const fetchPinnedRepos = async (username: string): Promise<GitHubRepo[]> => {
  try {
    // GitHub doesn't have a direct API for pinned repos, so we'll fetch all repos and take the top ones
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=6`);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const allRepos: GitHubRepo[] = await response.json();
    // Filter out forked repos and return the top 6
    return allRepos
      .filter(repo => !repo.fork)
      .slice(0, 6);
  } catch (error) {
    console.error("Error fetching GitHub repos data:", error);
    throw error;
  }
};
