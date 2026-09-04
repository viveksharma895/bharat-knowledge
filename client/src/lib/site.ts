export interface NavChild {
  label: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavSection {
  label: string;
  href: string;
  icon: string;
  description: string;
  children: NavChild[];
}

export interface TopNavItem {
  label: string;
  href: string;
  icon: string;
  description?: string;
  children?: NavChild[];
}

export const exploreSections: NavSection[] = [
  {
    label: "People",
    href: "/explore/people",
    icon: "person",
    description: "Biographical dossiers of influential figures.",
    children: [
      { label: "Politicians", href: "/explore/people/politicians" },
      { label: "Actors & Filmmakers", href: "/explore/people/actors-filmmakers" },
      { label: "Athletes", href: "/explore/people/athletes" },
      { label: "Business Leaders", href: "/explore/people/business-leaders" },
      { label: "Scientists", href: "/explore/people/scientists" },
      { label: "Writers & Authors", href: "/explore/people/writers-authors" },
      { label: "Musicians", href: "/explore/people/musicians" },
      { label: "Other Notable People", href: "/explore/people/other-notable" },
    ],
  },
  {
    label: "Places",
    href: "/explore/places",
    icon: "location_on",
    description: "Geography, monuments, and cultural landscapes.",
    children: [
      { label: "States & UTs", href: "/explore/places/states-uts" },
      { label: "Cities", href: "/explore/places/cities" },
      { label: "Districts", href: "/explore/places/districts" },
      { label: "Historical Places", href: "/explore/places/historical" },
      { label: "Monuments", href: "/explore/places/monuments" },
      { label: "Temples & Religious Places", href: "/explore/places/temples" },
      { label: "Natural Places", href: "/explore/places/natural" },
    ],
  },
  {
    label: "Organizations",
    href: "/explore/organizations",
    icon: "domain",
    description: "Scientific, cultural, and governing institutions.",
    children: [
      { label: "Government", href: "/explore/organizations/government" },
      { label: "Companies", href: "/explore/organizations/companies" },
      { label: "Universities", href: "/explore/organizations/universities" },
      { label: "Political Parties", href: "/explore/organizations/political-parties" },
      { label: "Sports Organizations", href: "/explore/organizations/sports" },
      { label: "Institutions", href: "/explore/organizations/institutions" },
    ],
  },
  {
    label: "History",
    href: "/explore/history",
    icon: "history_edu",
    description: "Milestones and timelines that shaped the subcontinent.",
    children: [
      { label: "Ancient India", href: "/explore/history/ancient" },
      { label: "Medieval India", href: "/explore/history/medieval" },
      { label: "Modern India", href: "/explore/history/modern" },
      { label: "Independence Movement", href: "/explore/history/independence" },
      { label: "Important Events", href: "/explore/history/events" },
    ],
  },
  {
    label: "Culture",
    href: "/explore/culture",
    icon: "palette",
    description: "Living cultures, arts, languages, and traditions.",
    children: [
      { label: "Festivals", href: "/explore/culture/festivals" },
      { label: "Art & Literature", href: "/explore/culture/art-literature" },
      { label: "Music", href: "/explore/culture/music" },
      { label: "Food", href: "/explore/culture/food" },
      { label: "Languages", href: "/explore/culture/languages" },
      { label: "Traditions", href: "/explore/culture/traditions" },
    ],
  },
];

export const categoryLinks: NavChild[] = [
  { label: "Politics", href: "/categories/politics" },
  { label: "Sports", href: "/categories/sports" },
  { label: "Cinema", href: "/categories/cinema" },
  { label: "Business", href: "/categories/business" },
  { label: "Science & Technology", href: "/categories/science-technology" },
  { label: "History", href: "/categories/history" },
  { label: "Geography", href: "/categories/geography" },
  { label: "Culture", href: "/categories/culture" },
  { label: "Education", href: "/categories/education" },
];

export const sourceLinks: NavChild[] = [
  { label: "Government Sources", href: "/sources/government" },
  { label: "Research & Universities", href: "/sources/research-universities" },
  { label: "Books & Publications", href: "/sources/books-publications" },
  { label: "Official Records", href: "/sources/official-records" },
  { label: "Source Methodology", href: "/sources/methodology" },
];

export const aboutLinks: NavChild[] = [
  { label: "About Bharat Knowledge", href: "/about" },
  { label: "Our Mission", href: "/about/mission" },
  { label: "Editorial Principles", href: "/about/editorial-principles" },
  { label: "How We Verify Information", href: "/about/how-we-verify" },
  { label: "Contact", href: "/about/contact" },
];

export const topNav: TopNavItem[] = [
  { label: "Home", href: "/", icon: "home" },
  {
    label: "Explore",
    href: "/explore",
    icon: "travel_explore",
    description: "Discover people, places, organizations, history, and culture.",
    children: [
      ...exploreSections.map((s) => ({ label: s.label, href: s.href })),
    ],
  },
  {
    label: "Categories",
    href: "/categories",
    icon: "category",
    children: categoryLinks,
  },
  {
    label: "Sources",
    href: "/sources",
    icon: "verified",
    children: sourceLinks,
  },
  {
    label: "About",
    href: "/about",
    icon: "info",
    children: aboutLinks,
  },
];

export const allExploreLeafRoutes: NavChild[] = exploreSections.flatMap((s) => [
  { label: s.label, href: s.href },
  ...s.children,
]);

export const allExploreRoutes: NavChild[] = [
  { label: "Explore", href: "/explore" },
  ...allExploreLeafRoutes,
];
