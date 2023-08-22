interface GithubUserResponse {
  id: number;
  login: string;
  name: string;
  bio: string;
  public_repos: number;
  repos_url: string;
  message?: "Not Found";
}

interface GithubRepoResponse {
  name: string;
  description: string;
  fork: boolean;
  stargazers_count: number;
}

const users: GithubUserResponse[] = [];

async function fetchUser(username: string) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const user: GithubUserResponse = await response.json();

  if (user.message) {
    console.log("User not found!");
  } else {
    users.push(user);

    console.log(
      `The user ${user.login} has been saved.\n
        \nid: ${user.id}
        \nlogin: ${user.login}
        \nname: ${user.name}
        \nbio: ${user.bio}
        \npublic repositories: ${user.public_repos}`
    );
  }
}

async function showUser(username: string) {
  const user = users.find((user) => user.login === username);

  if (typeof user === "undefined") {
    console.log("User not found!");
  } else {
    const response = await fetch(user.repos_url);
    const repositories: GithubRepoResponse[] = await response.json();

    console.log(`id: ${user.id}\n
    \nlogin: ${user.login}
    \nname: ${user.name}
    \nbio: ${user.bio}
    \npublic repositories: ${user.public_repos}`);

    let repoMessage = "";
    repositories.forEach((repo) => {
      repoMessage += `\nname: ${repo.name}
        \ndescription: ${repo.description}
        \nstars: ${repo.stargazers_count}
        \nfork:${repo.fork ? "yes" : "no"}\n`;
    });

    console.log(repoMessage);
  }
}

function showAllUsers() {
  let message = "Users:\n";

  users.forEach((user) => {
    message += `- ${user.login}\n`;
  });

  console.log(message);
}
