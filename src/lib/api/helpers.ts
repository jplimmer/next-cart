export function getSlugFromTitle(title: string): string {
  return title.toLowerCase().replace(/\s+/g, '--');
}

export function getTitleFromSlug(slug: string): string {
  return slug.replace(/--/g, ' ');
}
