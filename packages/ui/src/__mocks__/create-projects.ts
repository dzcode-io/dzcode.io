export const createProjects = (number: number) => {
  const projects = [];
  for (let i = 0; i < number; i++) {
    projects.push({
      slug: `slug-${i}`,
      title: `title-${i}`,
      authors: ["user1"],
      content: `content-${i}`,
      projects: ["user1", "user2"],
      description: `description-${i}`,
      githubURI: `/${i}`,
      image: `/${i}`,
      views: i,
    });
  }
  return projects;
};
