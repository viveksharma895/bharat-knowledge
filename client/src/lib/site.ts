export interface NavItem {
  label: string;
  href: string;
  description: string;
}

export const navItems: NavItem[] = [
  { label: "Explore", href: "/explore", description: "Discover the full breadth of the Bharat Knowledge archive." },
  { label: "People", href: "/people", description: "Biographical dossiers of influential figures." },
  { label: "Politics", href: "/politics", description: "Constitutional precedents and political history." },
  { label: "Places", href: "/places", description: "Geography, monuments, and cultural landscapes." },
  { label: "Organizations", href: "/organizations", description: "Scientific and cultural institutions." },
  { label: "History", href: "/history", description: "Milestones and historical timelines." },
  { label: "Culture", href: "/culture", description: "Living cultures, languages, and traditions." },
];
