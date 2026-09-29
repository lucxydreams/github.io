/* =====================================================================
   LUCXYDREAMS — YOUR WORKS LIST
   This is the ONLY file you need to edit to add / change projects.
   works.html, category.html and project.html all read from here.

   • Images: upload the file to GitHub next to index.html, then type its
     exact file name in quotes, e.g.  cover: "concert-01.jpg"
     Leave it as ""  to show the cute placeholder instead.
   • Keep the commas and quotes exactly as they are — a missing comma
     is the most common reason a page goes blank.
   ===================================================================== */

/* ---------- 1. CATEGORIES ----------
   id      : short name used in links (no spaces) — don't change once live
   parent  : "photography" for photo sub-categories, "" for top-level ones
   cover   : image shown on the category tile on works.html
   blurb   : one line shown on the category page                          */
const CATEGORIES = [
  { id: "events",          parent: "photography", title: "events",          cover: "", blurb: "Launches, parties, weddings and everything in between." },
  { id: "concerts",        parent: "photography", title: "concerts",        cover: "", blurb: "Live music, stage lights and sweaty crowds." },
  { id: "portraits",       parent: "photography", title: "portraits",       cover: "", blurb: "People, softly." },
  { id: "street",          parent: "photography", title: "street",          cover: "", blurb: "Little moments found on the way somewhere." },
  { id: "corporate",       parent: "photography", title: "corporate",       cover: "", blurb: "Headshots, teams and workplaces." },
  { id: "products",        parent: "photography", title: "products",        cover: "", blurb: "Things, made to look lovely." },
  { id: "photojournalism", parent: "photography", title: "photojournalism", cover: "", blurb: "Stories as they happen." },
  { id: "videography",     parent: "",            title: "videography",     cover: "", blurb: "Short films, music videos and moving pictures." },
  { id: "illustration",    parent: "",            title: "illustration",    cover: "", blurb: "Drawings, doodles and dreamy little worlds." },
];

/* ---------- 2. PROJECTS ----------
   id          : short unique name for the link (no spaces), e.g. "npc-concert-2026"
   category    : one of the category ids above
   title       : project name
   client      : who it was for (or "personal")
   year        : e.g. 2026
   cover       : image shown on the project tile
   images      : list of images for the project page, e.g. ["a.jpg", "b.jpg", "c.jpg"]
   video       : (optional) YouTube or Vimeo EMBED link, e.g.
                 "https://www.youtube.com/embed/VIDEO_ID"  or  "https://player.vimeo.com/video/VIDEO_ID"
   description : a few sentences about the project
   credits     : (optional) list of [role, name] pairs                       */
const PROJECTS = [
  // ---- events ----
  { id: "event-one", category: "events", title: "Event title", client: "Client name", year: 2026, cover: "",
    images: ["", "", "", "", ""], description: "Write a few sentences about this event: what it was, where, and what you captured.",
    credits: [["photography", "Chen Xinyuan"]] },
  { id: "event-two", category: "events", title: "Another event", client: "Client name", year: 2025, cover: "",
    images: ["", "", ""], description: "Write a few sentences about this project." },

  // ---- concerts ----
  { id: "concert-one", category: "concerts", title: "Concert title", client: "Artist name", year: 2026, cover: "",
    images: ["", "", "", ""], description: "Write a few sentences about this show." },
  { id: "concert-two", category: "concerts", title: "Another concert", client: "Artist name", year: 2025, cover: "",
    images: ["", "", ""], description: "Write a few sentences about this show." },

  // ---- portraits ----
  { id: "portrait-one", category: "portraits", title: "Portrait series", client: "personal", year: 2026, cover: "",
    images: ["", "", "", ""], description: "Write a few sentences about this series." },

  // ---- street ----
  { id: "street-one", category: "street", title: "Street series", client: "personal", year: 2025, cover: "",
    images: ["", "", "", "", ""], description: "Write a few sentences about this series." },

  // ---- corporate ----
  { id: "corporate-one", category: "corporate", title: "Company headshots", client: "Company name", year: 2026, cover: "",
    images: ["", "", ""], description: "Write a few sentences about this project." },

  // ---- products ----
  { id: "product-one", category: "products", title: "Product shoot", client: "Brand name", year: 2026, cover: "",
    images: ["", "", "", ""], description: "Write a few sentences about this shoot." },

  // ---- photojournalism ----
  { id: "pj-one", category: "photojournalism", title: "Story title", client: "Publication name", year: 2025, cover: "",
    images: ["", "", "", ""], description: "Write a few sentences about this story." },

  // ---- videography ----
  { id: "video-one", category: "videography", title: "Short film title", client: "personal", year: 2026, cover: "",
    video: "", images: ["", ""], description: "Write a few sentences about this film.",
    credits: [["director / cinematographer", "Chen Xinyuan"]] },
  { id: "video-two", category: "videography", title: "Music video title", client: "Artist name", year: 2025, cover: "",
    video: "", images: ["", ""], description: "Write a few sentences about this video." },

  // ---- illustration ----
  { id: "illus-one", category: "illustration", title: "Illustration title", client: "personal", year: 2026, cover: "",
    images: ["", "", ""], description: "Write a few sentences about this piece." },
  { id: "illus-two", category: "illustration", title: "Poster series", client: "Client name", year: 2025, cover: "",
    images: ["", ""], description: "Write a few sentences about this piece." },
];
