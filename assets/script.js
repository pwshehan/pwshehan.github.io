const GITHUB_USER = "pwshehan";

document.getElementById("year").textContent = new Date().getFullYear();

async function loadGitHubProfile() {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}`);
    if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
    const user = await res.json();

    const avatar = document.getElementById("hero-avatar");
    if (user.avatar_url) {
      avatar.src = user.avatar_url;
      avatar.alt = user.name || GITHUB_USER;
    }

    const socialLinks = document.getElementById("social-links");
    const links = [{ href: user.html_url, label: "GitHub" }];
    if (user.blog) {
      links.push({
        href: user.blog.startsWith("http") ? user.blog : `https://${user.blog}`,
        label: "Website",
      });
    }
    if (user.twitter_username) {
      links.push({
        href: `https://twitter.com/${user.twitter_username}`,
        label: "Twitter",
      });
    }
    socialLinks.innerHTML = links
      .map(
        (l) =>
          `<a href="${l.href}" target="_blank" rel="noopener noreferrer">${l.label}</a>`
      )
      .join("");
  } catch (err) {
    console.error("Failed to load GitHub profile:", err);
  }
}

async function loadGitHubProjects() {
  const grid = document.getElementById("projects-grid");
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=6`
    );
    if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
    const repos = await res.json();

    if (!Array.isArray(repos) || repos.length === 0) {
      grid.innerHTML = `<p class="projects-status">No repositories found.</p>`;
      return;
    }

    grid.innerHTML = repos
      .map((repo) => {
        const topics = (repo.topics || []).slice(0, 3);
        return `
        <article class="project-card">
          <h4><a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a></h4>
          <p class="project-desc">${repo.description || "No description available"}</p>
          ${
            topics.length
              ? `<div class="project-topics">${topics
                  .map((t) => `<span>${t}</span>`)
                  .join("")}</div>`
              : ""
          }
          <div class="project-meta">
            <span>${repo.language || ""}</span>
            <span>&#11088; ${repo.stargazers_count} &nbsp; &#127860; ${repo.forks_count}</span>
          </div>
        </article>`;
      })
      .join("");
  } catch (err) {
    console.error("Failed to load GitHub projects:", err);
    grid.innerHTML = `<p class="projects-status">Couldn't load projects from GitHub right now — visit <a href="https://github.com/${GITHUB_USER}" target="_blank" rel="noopener noreferrer">github.com/${GITHUB_USER}</a> directly.</p>`;
  }
}

loadGitHubProfile();
loadGitHubProjects();
