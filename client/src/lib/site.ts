export interface NavItem {
  label: string;
  href: string;
  description: string;
  icon: string;
}

export const navItems: NavItem[] = [
  { label: "Explore", href: "/explore", icon: "travel_explore", description: "Discover the full breadth of the Bharat Knowledge archive." },
  { label: "People", href: "/people", icon: "person", description: "Biographical dossiers of influential figures." },
  { label: "Politics", href: "/politics", icon: "account_balance", description: "Constitutional precedents and political history." },
  { label: "Places", href: "/places", icon: "location_on", description: "Geography, monuments, and cultural landscapes." },
  { label: "Organizations", href: "/organizations", icon: "domain", description: "Scientific and cultural institutions." },
  { label: "History", href: "/history", icon: "history_edu", description: "Milestones and historical timelines." },
  { label: "Culture", href: "/culture", icon: "palette", description: "Living cultures, languages, and traditions." },
];
