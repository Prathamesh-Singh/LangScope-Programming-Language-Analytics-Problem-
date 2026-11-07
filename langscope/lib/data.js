// Sample data for the frontend.
// Each array matches a table we will create in MySQL later,
// so swapping this file for API calls is the only change needed.

export const languages = [
  { id: 1, name: "Fortran", year: 1957, paradigm: "Imperative", typing: "Static", creator: "John Backus", influencedBy: null, description: "One of the first high-level languages, still used for scientific computing." },
  { id: 2, name: "Lisp", year: 1958, paradigm: "Functional", typing: "Dynamic", creator: "John McCarthy", influencedBy: null, description: "Pioneered functional programming and early AI research." },
  { id: 3, name: "C", year: 1972, paradigm: "Procedural", typing: "Static", creator: "Dennis Ritchie", influencedBy: null, description: "Low-level systems language behind operating systems like Unix." },
  { id: 4, name: "C++", year: 1985, paradigm: "Multi-paradigm", typing: "Static", creator: "Bjarne Stroustrup", influencedBy: 3, description: "C with classes; used for games, browsers and high-performance software." },
  { id: 5, name: "Objective-C", year: 1984, paradigm: "Object-Oriented", typing: "Static", creator: "Brad Cox", influencedBy: 3, description: "Apple's main language before Swift." },
  { id: 6, name: "Perl", year: 1987, paradigm: "Multi-paradigm", typing: "Dynamic", creator: "Larry Wall", influencedBy: 3, description: "Text processing and scripting language." },
  { id: 7, name: "Python", year: 1991, paradigm: "Multi-paradigm", typing: "Dynamic", creator: "Guido van Rossum", influencedBy: 3, description: "Readable general-purpose language, dominant in data science and AI." },
  { id: 8, name: "Java", year: 1995, paradigm: "Object-Oriented", typing: "Static", creator: "James Gosling", influencedBy: 4, description: "Write once, run anywhere. Popular for enterprise and Android." },
  { id: 9, name: "JavaScript", year: 1995, paradigm: "Multi-paradigm", typing: "Dynamic", creator: "Brendan Eich", influencedBy: 8, description: "The language of the web browser." },
  { id: 10, name: "PHP", year: 1995, paradigm: "Imperative", typing: "Dynamic", creator: "Rasmus Lerdorf", influencedBy: 6, description: "Server-side scripting language for websites." },
  { id: 11, name: "Ruby", year: 1995, paradigm: "Object-Oriented", typing: "Dynamic", creator: "Yukihiro Matsumoto", influencedBy: 6, description: "Developer-friendly language known for Ruby on Rails." },
  { id: 12, name: "R", year: 1993, paradigm: "Functional", typing: "Dynamic", creator: "Ross Ihaka & Robert Gentleman", influencedBy: null, description: "Language for statistics and data analysis." },
  { id: 13, name: "C#", year: 2000, paradigm: "Multi-paradigm", typing: "Static", creator: "Anders Hejlsberg", influencedBy: 8, description: "Microsoft's language for .NET, games (Unity) and enterprise apps." },
  { id: 14, name: "Scala", year: 2004, paradigm: "Multi-paradigm", typing: "Static", creator: "Martin Odersky", influencedBy: 8, description: "Functional + object-oriented language on the JVM." },
  { id: 15, name: "Go", year: 2009, paradigm: "Concurrent", typing: "Static", creator: "Robert Griesemer, Rob Pike, Ken Thompson", influencedBy: 3, description: "Simple, fast language for cloud services." },
  { id: 16, name: "Rust", year: 2010, paradigm: "Multi-paradigm", typing: "Static", creator: "Graydon Hoare", influencedBy: 4, description: "Memory-safe systems language without a garbage collector." },
  { id: 17, name: "Kotlin", year: 2011, paradigm: "Multi-paradigm", typing: "Static", creator: "JetBrains", influencedBy: 8, description: "Modern JVM language, preferred for Android." },
  { id: 18, name: "TypeScript", year: 2012, paradigm: "Multi-paradigm", typing: "Gradual", creator: "Anders Hejlsberg", influencedBy: 9, description: "JavaScript with types." },
  { id: 19, name: "Swift", year: 2014, paradigm: "Multi-paradigm", typing: "Static", creator: "Chris Lattner", influencedBy: 5, description: "Apple's language for iOS and macOS apps." },
  { id: 20, name: "Clojure", year: 2007, paradigm: "Functional", typing: "Dynamic", creator: "Rich Hickey", influencedBy: 2, description: "A modern Lisp on the JVM." },
  { id: 21, name: "Dart", year: 2011, paradigm: "Object-Oriented", typing: "Static", creator: "Lars Bak & Kasper Lund", influencedBy: 9, description: "Google's language behind Flutter apps." },
];

export const domains = [
  { id: 1, name: "Web Development", description: "Websites, web apps and APIs" },
  { id: 2, name: "Mobile Development", description: "Android and iOS apps" },
  { id: 3, name: "Data Science & AI", description: "Machine learning, analytics and AI" },
  { id: 4, name: "Systems Programming", description: "Operating systems, drivers, low-level tools" },
  { id: 5, name: "Game Development", description: "Game engines and games" },
  { id: 6, name: "Cloud & DevOps", description: "Cloud services, infrastructure and automation" },
  { id: 7, name: "Enterprise Software", description: "Large business applications" },
  { id: 8, name: "Scientific Computing", description: "Simulations and numerical computing" },
];

// Many-to-many: which language suits which domain (score 1-10)
export const languageDomains = [
  { languageId: 7, domainId: 3, score: 10 }, { languageId: 7, domainId: 1, score: 7 }, { languageId: 7, domainId: 8, score: 9 }, { languageId: 7, domainId: 6, score: 7 },
  { languageId: 9, domainId: 1, score: 10 }, { languageId: 9, domainId: 2, score: 6 },
  { languageId: 18, domainId: 1, score: 10 }, { languageId: 18, domainId: 2, score: 6 },
  { languageId: 8, domainId: 7, score: 10 }, { languageId: 8, domainId: 2, score: 8 }, { languageId: 8, domainId: 1, score: 7 },
  { languageId: 3, domainId: 4, score: 10 }, { languageId: 3, domainId: 8, score: 6 },
  { languageId: 4, domainId: 4, score: 9 }, { languageId: 4, domainId: 5, score: 10 }, { languageId: 4, domainId: 8, score: 8 },
  { languageId: 13, domainId: 5, score: 9 }, { languageId: 13, domainId: 7, score: 8 }, { languageId: 13, domainId: 1, score: 7 },
  { languageId: 15, domainId: 6, score: 10 }, { languageId: 15, domainId: 1, score: 7 }, { languageId: 15, domainId: 4, score: 6 },
  { languageId: 16, domainId: 4, score: 10 }, { languageId: 16, domainId: 1, score: 6 }, { languageId: 16, domainId: 6, score: 7 },
  { languageId: 17, domainId: 2, score: 10 }, { languageId: 17, domainId: 7, score: 6 },
  { languageId: 19, domainId: 2, score: 10 },
  { languageId: 21, domainId: 2, score: 9 },
  { languageId: 10, domainId: 1, score: 8 },
  { languageId: 11, domainId: 1, score: 8 },
  { languageId: 12, domainId: 3, score: 9 }, { languageId: 12, domainId: 8, score: 8 },
  { languageId: 14, domainId: 3, score: 8 }, { languageId: 14, domainId: 7, score: 6 },
  { languageId: 1, domainId: 8, score: 10 },
  { languageId: 2, domainId: 3, score: 5 },
  { languageId: 20, domainId: 7, score: 5 },
  { languageId: 6, domainId: 6, score: 5 },
  { languageId: 5, domainId: 2, score: 6 },
];

// stars = approximate GitHub stars in thousands (null = not open source)
export const frameworks = [
  { id: 1, name: "React", languageId: 9, domainId: 1, year: 2013, stars: 230 },
  { id: 2, name: "Vue.js", languageId: 9, domainId: 1, year: 2014, stars: 208 },
  { id: 3, name: "Next.js", languageId: 9, domainId: 1, year: 2016, stars: 130 },
  { id: 4, name: "Express", languageId: 9, domainId: 1, year: 2010, stars: 66 },
  { id: 5, name: "Angular", languageId: 18, domainId: 1, year: 2016, stars: 96 },
  { id: 6, name: "Django", languageId: 7, domainId: 1, year: 2005, stars: 82 },
  { id: 7, name: "Flask", languageId: 7, domainId: 1, year: 2010, stars: 69 },
  { id: 8, name: "TensorFlow", languageId: 7, domainId: 3, year: 2015, stars: 187 },
  { id: 9, name: "PyTorch", languageId: 7, domainId: 3, year: 2016, stars: 87 },
  { id: 10, name: "Pandas", languageId: 7, domainId: 3, year: 2008, stars: 44 },
  { id: 11, name: "Spring Boot", languageId: 8, domainId: 7, year: 2014, stars: 76 },
  { id: 12, name: "ASP.NET Core", languageId: 13, domainId: 1, year: 2016, stars: 36 },
  { id: 13, name: "Unity", languageId: 13, domainId: 5, year: 2005, stars: null },
  { id: 14, name: "Unreal Engine", languageId: 4, domainId: 5, year: 1998, stars: null },
  { id: 15, name: "Laravel", languageId: 10, domainId: 1, year: 2011, stars: 79 },
  { id: 16, name: "Ruby on Rails", languageId: 11, domainId: 1, year: 2004, stars: 56 },
  { id: 17, name: "Gin", languageId: 15, domainId: 6, year: 2014, stars: 80 },
  { id: 18, name: "Kubernetes", languageId: 15, domainId: 6, year: 2014, stars: 112 },
  { id: 19, name: "Actix Web", languageId: 16, domainId: 1, year: 2017, stars: 22 },
  { id: 20, name: "Jetpack Compose", languageId: 17, domainId: 2, year: 2021, stars: null },
  { id: 21, name: "SwiftUI", languageId: 19, domainId: 2, year: 2019, stars: null },
  { id: 22, name: "Flutter", languageId: 21, domainId: 2, year: 2017, stars: 168 },
  { id: 23, name: "Shiny", languageId: 12, domainId: 3, year: 2012, stars: 5 },
  { id: 24, name: "Apache Spark", languageId: 14, domainId: 3, year: 2014, stars: 40 },
];

export const companies = [
  { id: 1, name: "Google", industry: "Technology", headquarters: "Mountain View, USA", founded: 1998 },
  { id: 2, name: "Microsoft", industry: "Technology", headquarters: "Redmond, USA", founded: 1975 },
  { id: 3, name: "Meta", industry: "Social Media", headquarters: "Menlo Park, USA", founded: 2004 },
  { id: 4, name: "Amazon", industry: "E-commerce", headquarters: "Seattle, USA", founded: 1994 },
  { id: 5, name: "Netflix", industry: "Entertainment", headquarters: "Los Gatos, USA", founded: 1997 },
  { id: 6, name: "Spotify", industry: "Entertainment", headquarters: "Stockholm, Sweden", founded: 2006 },
  { id: 7, name: "Uber", industry: "Transportation", headquarters: "San Francisco, USA", founded: 2009 },
  { id: 8, name: "Airbnb", industry: "Hospitality", headquarters: "San Francisco, USA", founded: 2008 },
  { id: 9, name: "Infosys", industry: "IT Services", headquarters: "Bengaluru, India", founded: 1981 },
  { id: 10, name: "Flipkart", industry: "E-commerce", headquarters: "Bengaluru, India", founded: 2007 },
  { id: 11, name: "Goldman Sachs", industry: "Finance", headquarters: "New York, USA", founded: 1869 },
  { id: 12, name: "Discord", industry: "Social Media", headquarters: "San Francisco, USA", founded: 2015 },
];

// Many-to-many: which company uses which language, and for what
export const companyLanguages = [
  { companyId: 1, languageId: 7, usageArea: "Machine learning" }, { companyId: 1, languageId: 15, usageArea: "Cloud infrastructure" },
  { companyId: 1, languageId: 8, usageArea: "Backend services" }, { companyId: 1, languageId: 4, usageArea: "Core systems" },
  { companyId: 1, languageId: 17, usageArea: "Android apps" }, { companyId: 1, languageId: 21, usageArea: "Flutter apps" },
  { companyId: 2, languageId: 13, usageArea: ".NET and Azure" }, { companyId: 2, languageId: 18, usageArea: "Developer tools" },
  { companyId: 2, languageId: 4, usageArea: "Windows" }, { companyId: 2, languageId: 7, usageArea: "AI" },
  { companyId: 3, languageId: 7, usageArea: "AI research" }, { companyId: 3, languageId: 9, usageArea: "Web frontends" },
  { companyId: 3, languageId: 4, usageArea: "Backend performance" }, { companyId: 3, languageId: 16, usageArea: "Infrastructure tools" },
  { companyId: 4, languageId: 8, usageArea: "Backend services" }, { companyId: 4, languageId: 7, usageArea: "Data and ML" },
  { companyId: 4, languageId: 16, usageArea: "Cloud infrastructure" },
  { companyId: 5, languageId: 8, usageArea: "Microservices" }, { companyId: 5, languageId: 9, usageArea: "User interface" },
  { companyId: 5, languageId: 7, usageArea: "Data analytics" },
  { companyId: 6, languageId: 8, usageArea: "Backend" }, { companyId: 6, languageId: 7, usageArea: "Data pipelines" },
  { companyId: 7, languageId: 15, usageArea: "Microservices" }, { companyId: 7, languageId: 8, usageArea: "Backend" },
  { companyId: 7, languageId: 7, usageArea: "Machine learning" },
  { companyId: 8, languageId: 11, usageArea: "Web platform" }, { companyId: 8, languageId: 18, usageArea: "Frontend" },
  { companyId: 8, languageId: 17, usageArea: "Android app" },
  { companyId: 9, languageId: 8, usageArea: "Enterprise projects" }, { companyId: 9, languageId: 7, usageArea: "Automation" },
  { companyId: 9, languageId: 9, usageArea: "Web projects" },
  { companyId: 10, languageId: 8, usageArea: "Backend" }, { companyId: 10, languageId: 9, usageArea: "Web frontend" },
  { companyId: 10, languageId: 17, usageArea: "Android app" },
  { companyId: 11, languageId: 8, usageArea: "Trading platforms" }, { companyId: 11, languageId: 7, usageArea: "Quant and data" },
  { companyId: 12, languageId: 16, usageArea: "Performance services" }, { companyId: 12, languageId: 9, usageArea: "Desktop client" },
];

// Survey-style developer data (entered by admin)
export const developers = [
  { id: 1, name: "Aarav Sharma", country: "India", experience: 3, languageId: 7, domainId: 3, satisfaction: 9 },
  { id: 2, name: "Priya Nair", country: "India", experience: 5, languageId: 9, domainId: 1, satisfaction: 8 },
  { id: 3, name: "Rohan Mehta", country: "India", experience: 1, languageId: 8, domainId: 7, satisfaction: 7 },
  { id: 4, name: "Sneha Kulkarni", country: "India", experience: 7, languageId: 17, domainId: 2, satisfaction: 8 },
  { id: 5, name: "Liam Carter", country: "USA", experience: 10, languageId: 15, domainId: 6, satisfaction: 9 },
  { id: 6, name: "Emma Schulz", country: "Germany", experience: 6, languageId: 16, domainId: 4, satisfaction: 10 },
  { id: 7, name: "Kenji Tanaka", country: "Japan", experience: 4, languageId: 4, domainId: 5, satisfaction: 7 },
  { id: 8, name: "Sofia Rossi", country: "Italy", experience: 2, languageId: 18, domainId: 1, satisfaction: 8 },
  { id: 9, name: "Arjun Patel", country: "India", experience: 8, languageId: 13, domainId: 7, satisfaction: 7 },
  { id: 10, name: "Ananya Iyer", country: "India", experience: 3, languageId: 19, domainId: 2, satisfaction: 8 },
  { id: 11, name: "Lucas Silva", country: "Brazil", experience: 5, languageId: 10, domainId: 1, satisfaction: 6 },
  { id: 12, name: "Meera Joshi", country: "India", experience: 2, languageId: 7, domainId: 3, satisfaction: 9 },
];

// Popularity score (0-100, illustrative) for 8 tracked languages, 2016-2025.
// Rank is worked out from the score for each year.
const scoresByYear = {
  2016: { 8: 21.0, 3: 17.5, 9: 15.0, 4: 12.5, 7: 11.0, 15: 3.0, 18: 2.5, 16: 0.6 },
  2017: { 8: 20.0, 3: 16.5, 9: 15.5, 7: 13.0, 4: 12.0, 15: 3.4, 18: 3.2, 16: 0.8 },
  2018: { 8: 18.5, 9: 16.0, 7: 15.5, 3: 15.0, 4: 11.5, 18: 4.2, 15: 3.9, 16: 1.1 },
  2019: { 7: 17.5, 8: 17.0, 9: 16.5, 3: 14.0, 4: 11.0, 18: 5.5, 15: 4.3, 16: 1.5 },
  2020: { 7: 19.5, 9: 16.8, 8: 15.8, 3: 13.5, 4: 10.8, 18: 6.8, 15: 4.8, 16: 2.0 },
  2021: { 7: 21.0, 9: 17.0, 8: 14.8, 3: 12.8, 4: 10.6, 18: 8.0, 15: 5.1, 16: 2.6 },
  2022: { 7: 22.5, 9: 17.2, 8: 13.9, 3: 12.0, 4: 10.9, 18: 9.2, 15: 5.4, 16: 3.3 },
  2023: { 7: 24.0, 9: 17.3, 8: 13.0, 4: 11.2, 3: 11.0, 18: 10.3, 15: 5.8, 16: 4.2 },
  2024: { 7: 25.5, 9: 17.1, 8: 12.2, 18: 12.0, 4: 11.4, 3: 10.2, 15: 6.2, 16: 5.0 },
  2025: { 7: 26.8, 9: 16.9, 18: 13.4, 8: 11.5, 4: 11.3, 3: 9.6, 15: 6.6, 16: 5.9 },
};

export const usageStats = Object.entries(scoresByYear).flatMap(([year, scores]) =>
  Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([languageId, score], i) => ({
      languageId: Number(languageId),
      year: Number(year),
      score,
      rank: i + 1,
    }))
).map((row, i) => ({ id: i + 1, ...row }));

// Staff roles that can log in: admin (everything), editor (only what admin grants).
// The public needs no account: they can only read (the "viewer" role in the database).
export const roles = ["admin", "editor"];

// Tables an editor can be given access to, and the actions on them
export const resources = ["languages", "domains", "frameworks", "companies", "developers", "usageStats"];
export const actions = ["create", "update", "delete"];

// Demo staff accounts for trying the app before the database exists.
// These move to the MySQL users table (with hashed passwords) in the backend.
export const demoUsers = [
  { id: 1, username: "admin", password: "admin123", role: "admin", permissions: [] },
  {
    id: 2, username: "rahul", password: "editor123", role: "editor",
    permissions: [
      { action: "create", resource: "frameworks" },
      { action: "update", resource: "frameworks" },
      { action: "update", resource: "usageStats" },
    ],
  },
];
