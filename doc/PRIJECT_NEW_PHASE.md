# 🗺️ IMPLEMENTATION ROADMAP

**Project:** খবরের কাগজ — Digital Newspaper Portal  
**Version:** Post Phase 7 (Design + Multiple Admin)  
**Timeline:** ~23-28 Days

---

# ✅ ROADMAP OVERVIEW

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Phase A: Design System Setup (Days 1-2)                  │
│      ↓                                                      │
│  Phase B: Homepage Redesign (Days 3-4)                    │
│      ↓                                                      │
│  Phase C: Category/Article Page Redesign (Days 5-6)       │
│      ↓                                                      │
│  Phase D: Additional Pages Redesign (Days 7-8)            │
│      ↓                                                      │
│  Phase E: Navigation & Components (Days 9)                │
│      ↓                                                      │
│  Phase F: Special Pages (Days 10-11)                      │
│      ↓                                                      │
│  Phase G: Multiple Admin Backend (Days 12-14)             │
│      ↓                                                      │
│  Phase H: Multiple Admin Frontend (Days 15-16)            │
│      ↓                                                      │
│  Phase I: Mobile Responsive (Days 17-18)                  │
│      ↓                                                      │
│  Phase J: Integration & Testing (Days 19-20)              │
│      ↓                                                      │
│  Phase K: Final Build & Deploy (Days 21-23)               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

# 📅 DETAILED PHASE BREAKDOWN

## **PHASE A: DESIGN SYSTEM SETUP** (Days 1-2)

**Objective:** Create foundational design tokens and CSS infrastructure

### Files to Create/Modify:

1. **frontend/app/globals.css** (NEW)
   - CSS variables for colors
   - Typography scale
   - Spacing scale
   - Breakpoints
   - Theme system

```css
:root {
  /* Colors */
  --primary: #1a1a1a;
  --secondary: #d32f2f;
  --accent: #1976d2;
  --text-primary: #000;
  --text-secondary: #666;
  --background: #fff;
  --border: #e0e0e0;

  /* Typography */
  --font-heading: 'Noto Serif Bengali', serif;
  --font-body: 'Noto Sans Bengali', sans-serif;
  --font-mono: 'Courier New', monospace;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* Breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}
```

2. **frontend/lib/theme.ts** (NEW)

   - Theme configuration
   - Design tokens
   - Component variants

3. **frontend/components/shared/DesignTokens.tsx** (NEW)
   - Color palette reference
   - Typography samples
   - Spacing guide

### Tasks:

- [ ] Create CSS variables system
- [ ] Set up Bengali font (Noto Sans Bengali + Noto Serif Bengali)
- [ ] Define color palette
- [ ] Define typography scale
- [ ] Define spacing scale
- [ ] Set up responsive breakpoints
- [ ] Create theme switching capability

### Deliverables:

- ✓ CSS variable system
- ✓ Design tokens documentation
- ✓ Font system ready
- ✓ Color palette defined
- ✓ Easy theme switching mechanism

---

## **PHASE B: HOMEPAGE REDESIGN** (Days 3-4)

**Objective:** Create newspaper-style homepage with Daily Bangladesh reference

### Files to Modify:

1. **frontend/app/page.tsx** (COMPLETE REWRITE)
2. **frontend/components/home/** (NEW FOLDER)

### Components to Create:

**frontend/components/home/UtilityBar.tsx**

```
[Current Date] [Bengali Date] | [Search] [Social Icons] [Login]
```

**frontend/components/home/Header.tsx** (Redesign)

```
LEFT: Logo
CENTER: Branding
RIGHT: Search + Social + Login
```

**frontend/components/home/MainNavigation.tsx**

```
সর্বশেষ | বাংলাদেশ | অর্থনীতি | আন্তর্জাতিক | দেশজুড়ে | খেলা |
বিনোদন | প্রযুক্তি | মতামত | ফিচার | অন্যান্য
```

With dropdown support for subcategories

**frontend/components/home/BreakingNewsTicker.tsx**

```
🔴 ব্রেকিং নিউজ: [Headline] [Headline] [Headline]
Animated ticker that cycles through breaking news
```

**frontend/components/home/HeroSection.tsx**

```
LEFT (60%):
  - Large featured image
  - Category label
  - Large headline (h1)
  - Deck/subtitle
  - Author + timestamp

RIGHT (40%):
  - 3-4 medium-sized secondary stories
  - Medium image + headline
  - Compact viewing
```

**frontend/components/home/SectionBlock.tsx** (Reusable)

```
═══════════════════════════════════════
   [SECTION TITLE] সম্পূর্ণ খবর →
───────────────────────────────────────

[Main Story - Large]        [Secondary Stories]
Large image                 - Story 1 (medium)
Large headline              - Story 2 (medium)
Short excerpt               - Story 3 (medium)
                           - Story 4 (medium)

Latest Headlines:
- Headline 1
- Headline 2
- Headline 3
═══════════════════════════════════════
```

**frontend/components/home/Advertisement.tsx**

```
[Ad placeholder - 728x90, 300x250, etc.]
With proper spacing to avoid CLS
```

**frontend/components/shared/LatestHeadlineList.tsx** (Reusable)

```
- 📰 Headline 1 (2 min ago)
- 📰 Headline 2 (15 min ago)
- 📰 Headline 3 (1 hour ago)
```

### Homepage Structure:

```
┌─────────────────────────────────────────┐
│ [Utility Bar] Date | Search | Social    │
├─────────────────────────────────────────┤
│ [Header] Logo | Branding | Search       │
├─────────────────────────────────────────┤
│ [Navigation] সর্বশেষ | বাংলাদেশ | ...    │
├─────────────────────────────────────────┤
│ [Breaking News Ticker] 🔴 ব্রেকিং...     │
├─────────────────────────────────────────┤
│        [Advertisement Banner]            │
├─────────────────────────────────────────┤
│                                         │
│  [Hero Section]                         │
│  ┌──────────────────┐  ┌──────────────┐ │
│  │  Large Story     │  │  Secondary   │ │
│  │  Image           │  │  - Story 1   │ │
│  │  Large Headline  │  │  - Story 2   │ │
│  │  Excerpt         │  │  - Story 3   │ │
│  └──────────────────┘  └──────────────┘ │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│ [Section: বাংলাদেশ]                    │
│ ┌──────────────────┐  ┌───────────────┐│
│ │  Main Story      │  │ Secondary     ││
│ │  Image           │  │ - News 1      ││
│ │  Headline        │  │ - News 2      ││
│ │  Excerpt         │  │ - News 3      ││
│ └──────────────────┘  └───────────────┘│
│                                         │
├─────────────────────────────────────────┤
│ [Section: অর্থনীতি]                    │
│ ┌──────────────────┐  ┌───────────────┐│
│ │  Featured Story  │  │ Latest News   ││
│ │  Image           │  │ - News 1      ││
│ │  Headline        │  │ - News 2      ││
│ └──────────────────┘  └───────────────┘│
│                                         │
├─────────────────────────────────────────┤
│        [Advertisement Sidebar]          │
├─────────────────────────────────────────┤
│ [Section: খেলা]                        │
│ ┌──────────────────┐  ┌───────────────┐│
│ └──────────────────┘  └───────────────┘│
│                                         │
├─────────────────────────────────────────┤
│ [Footer]                                │
└─────────────────────────────────────────┘
```

### API Integration:

- Fetch breaking news from `/api/articles?breaking=true`
- Fetch homepage sections from `/api/homepage`
- Fetch latest news from `/api/articles?limit=20`

### Tasks:

- [ ] Create design tokens
- [ ] Create utility bar component
- [ ] Redesign header
- [ ] Create navigation with dropdowns
- [ ] Create breaking news ticker
- [ ] Create hero section
- [ ] Create section block component (reusable)
- [ ] Create latest headlines list
- [ ] Integrate API calls
- [ ] Responsive layout (desktop 1440px+)
- [ ] Create advertisement placeholders

### Deliverables:

- ✓ Newspaper-style homepage
- ✓ Daily Bangladesh-inspired layout
- ✓ All sections from API
- ✓ Desktop view complete

---

## **PHASE C: CATEGORY & ARTICLE PAGE REDESIGN** (Days 5-6)

**Objective:** Redesign category pages and article detail pages with proper typography

### Files to Modify:

1. **frontend/app/categories/[slug]/page.tsx** (COMPLETE REWRITE)
2. **frontend/app/articles/[slug]/page.tsx** (REDESIGN)
3. **frontend/app/articles/page.tsx** (REDESIGN)

### Components to Create:

**frontend/components/category/CategoryHeader.tsx**

```
═════════════════════════════════════════════════════════
[Category Name] - সর্বশেষ আপডেট
═════════════════════════════════════════════════════════
```

**frontend/components/article/ArticleDetail.tsx**

```
Breadcrumb: হোম > বাংলাদেশ > রাজনীতি

[Category Label - Red Badge]

Headline (h1 - Large, Bengali optimized)

Deck/Subtitle

Author | Published: 2 Jun 2024, 02:30 PM | Updated: 2 Jun 2024, 03:15 PM

[Featured Image with Caption]

───────────────────────────────────────

Article Body:
- Proper paragraph spacing
- Optimized line height (1.7-1.8)
- Readable font size (18px+)
- Maximum width: 680px
- Bengali typography optimized

───────────────────────────────────────

[Tags]
#ট্যাগ1 #ট্যাগ2 #ট্যাগ3

[Social Sharing]
Facebook | Twitter | Copy Link | Print

───────────────────────────────────────

Related Articles:
- Article 1
- Article 2
- Article 3
- Article 4

More from [Category]:
- Article 1
- Article 2
- Article 3

───────────────────────────────────────

Popular Now (Sidebar):
- Article 1
- Article 2
- Article 3
```

**frontend/components/article/ArticleCard.tsx** (Variants)

```
Variant 1: Featured (Large)
[Image] [Headline - Large]
        [Excerpt]

Variant 2: Secondary (Medium)
[Image] [Headline - Medium]
        [Category] [Time]

Variant 3: Compact (Small)
[Thumbnail] [Headline - Small] [Time]

Variant 4: List (Latest)
[Category] [Headline] [Time]
```

**frontend/components/article/Breadcrumb.tsx**

```
হোম > বাংলাদেশ > রাজনীতি > আর্টিকেল টাইটেল
```

**frontend/components/article/ReadingTime.tsx**

```
পড়ার সময়: ৫ মিনিট
```

### Category Page Structure:

```
┌─────────────────────────────────────────┐
│ [Header & Navigation]                   │
├─────────────────────────────────────────┤
│                                         │
│ [Category Header - বাংলাদেশ]             │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│ [Featured Category Story - Large]       │
│ ┌──────────────────────────────────┐   │
│ │ Image                            │   │
│ │ Headline                         │   │
│ │ Excerpt                          │   │
│ └──────────────────────────────────┘   │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│ [Articles Grid/List]                    │
│ ┌──────────────┐ ┌──────────────┐     │
│ │ Article 1    │ │ Article 2    │     │
│ │ Image        │ │ Image        │     │
│ │ Headline     │ │ Headline     │     │
│ └──────────────┘ └──────────────┘     │
│                                         │
│ ┌──────────────┐ ┌──────────────┐     │
│ │ Article 3    │ │ Article 4    │     │
│ │ Image        │ │ Image        │     │
│ │ Headline     │ │ Headline     │     │
│ └──────────────┘ └──────────────┘     │
│                                         │
│ [Pagination] ← 1 2 3 4 5 →             │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│ SIDEBAR:                                │
│ ┌──────────────────────────────┐       │
│ │ [Advertisement]              │       │
│ │ 300x250                      │       │
│ └──────────────────────────────┘       │
│                                         │
│ ┌──────────────────────────────┐       │
│ │ Popular News                 │       │
│ │ - Article 1                  │       │
│ │ - Article 2                  │       │
│ │ - Article 3                  │       │
│ └──────────────────────────────┘       │
│                                         │
├─────────────────────────────────────────┤
│ [Footer]                                │
└─────────────────────────────────────────┘
```

### Article Detail Page Structure:

```
┌─────────────────────────────────────────┐
│ [Breadcrumb] হোম > বাংলাদেশ > রাজনীতি   │
├─────────────────────────────────────────┤
│                                         │
│ [Category Badge] রাজনীতি                │
│                                         │
│ Headline (h1 - 40-48px, bold)           │
│                                         │
│ Deck/Subtitle (gray, 18-20px)           │
│                                         │
│ Author | Published Date | Updated Date │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│ [Featured Image with Caption]           │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│ [Article Body - Optimized Reading]      │
│ - Font: Noto Serif Bengali              │
│ - Size: 18-20px                         │
│ - Line Height: 1.8                      │
│ - Width: 680px max                      │
│ - Proper paragraph spacing              │
│                                         │
│ [Inline Images/Media]                   │
│ [Blockquotes - Styled]                  │
│ [Lists - Formatted]                     │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│ [Tags] #ট্যাগ1 #ট্যাগ2 #ট্যাগ3            │
│                                         │
│ [Social Sharing] Facebook | Twitter     │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│ LEFT (70%):                 RIGHT (30%):│
│                             │           │
│ Related Articles:           │ Popular   │
│ - Article 1                 │ Now       │
│ - Article 2                 │           │
│ - Article 3                 │ - Article1│
│ - Article 4                 │ - Article2│
│                             │ - Article3│
│ More from [Category]:       │           │
│ - Article 1                 │ [Ad]      │
│ - Article 2                 │ 300x250   │
│ - Article 3                 │           │
│                             │           │
├─────────────────────────────────────────┤
│ [Footer]                                │
└─────────────────────────────────────────┘
```

### Tasks:

- [ ] Redesign category page header
- [ ] Create featured story component
- [ ] Create article grid/list layouts
- [ ] Implement pagination
- [ ] Redesign article detail page
- [ ] Add breadcrumb navigation
- [ ] Optimize typography for reading
- [ ] Add related articles section
- [ ] Add social sharing
- [ ] Add advertisement sidebar
- [ ] Responsive layout for tablets/desktop

### Deliverables:

- ✓ Professional category pages
- ✓ Optimized article detail pages
- ✓ Proper typography for reading
- ✓ All components desktop-responsive

---

## **PHASE D: ADDITIONAL PAGES REDESIGN** (Days 7-8)

**Objective:** Redesign Latest, Search, Archive, Author pages

### Files to Modify/Create:

1. **frontend/app/articles/page.tsx** → Latest page
2. **frontend/app/search/page.tsx** → Search results
3. **frontend/app/archive/page.tsx** → Archive
4. **frontend/app/authors/[slug]/page.tsx** → Author profile

### Latest Page Layout:

```
[Header & Navigation]
═════════════════════════════════════════
সর্বশেষ খবর
═════════════════════════════════════════

[Search/Filter]

Article List:
1. [Time] [Category] [Headline] [Thumbnail]
2. [Time] [Category] [Headline] [Thumbnail]
3. [Time] [Category] [Headline] [Thumbnail]
...

[Pagination]

SIDEBAR:
- Popular Now
- [Advertisement]
```

### Search Results Layout:

```
[Header & Navigation]
═════════════════════════════════════════
"Keywords" - খোঁজ ফলাফল
═════════════════════════════════════════

[Search Box with Filters]
- Category
- Date Range
- Author

Results:
1. [Category] [Headline] [Excerpt] [Date]
2. [Category] [Headline] [Excerpt] [Date]
3. [Category] [Headline] [Excerpt] [Date]
...

[Pagination]
```

### Archive Page Layout:

```
[Header & Navigation]
═════════════════════════════════════════
সংরক্ষণাগার
═════════════════════════════════════════

[Filters]
- From Date
- To Date
- Category
- Author

Articles:
[Year] [Month]
1. [Date] [Category] [Headline]
2. [Date] [Category] [Headline]
...
```

### Author Profile Layout:

```
[Header with Author Image]
─────────────────────────────
[Author Name]
[Designation]
[Biography]
[Social Links]

Articles by this author:
1. [Headline] [Date]
2. [Headline] [Date]
3. [Headline] [Date]
...

[Pagination]
```

### Tasks:

- [ ] Redesign latest page
- [ ] Redesign search results page
- [ ] Redesign archive page with filters
- [ ] Redesign author profile page
- [ ] Add filter components
- [ ] Add date range selector
- [ ] Responsive layouts

### Deliverables:

- ✓ Professional Latest page
- ✓ Professional Search page
- ✓ Professional Archive page
- ✓ Professional Author page

---

## **PHASE E: NAVIGATION & HEADER/FOOTER** (Day 9)

**Objective:** Create newspaper-style navigation, header, footer

### Files to Modify/Create:

1. **frontend/components/Header.tsx** (COMPLETE REWRITE)
2. **frontend/components/Footer.tsx** (REDESIGN)
3. **frontend/components/Navigation.tsx** (NEW)

### Header Structure:

```
┌──────────────────────────────────────────────────────┐
│ [Utility Bar]                                        │
│ আজকের তারিখ | বাংলা তারিখ | [Search] [Social]    │
├──────────────────────────────────────────────────────┤
│ [Main Header]                                        │
│ LEFT: [Logo]                                         │
│ CENTER: [Website Name/Branding]                      │
│ RIGHT: [Search] [Social Icons] [Login/Profile]       │
├──────────────────────────────────────────────────────┤
│ [Main Navigation - Horizontal]                       │
│ সর্বশেষ | বাংলাদেশ | অর্থনীতি | আন্তর্জাতিক |    │
│ দেশজুড়ে | খেলা | বিনোদন | প্রযুক্তি | মতামত |      │
│ ফিচার | অন্যান্য                                      │
│                                                       │
│ (With dropdown for subcategories on hover)           │
└──────────────────────────────────────────────────────┘
```

### Footer Structure:

```
┌──────────────────────────────────────────────────────┐
│ [Footer Content]                                     │
├──────────────────────────────────────────────────────┤
│                                                      │
│ LEFT (30%):                                          │
│ - Logo                                               │
│ - Brief description                                  │
│ - Social media icons                                 │
│                                                      │
│ CENTER (40%):                                        │
│ - Important Links                                    │
│   - About                                            │
│   - Contact                                          │
│   - Privacy Policy                                   │
│   - Terms of Service                                 │
│   - Editorial Policy                                 │
│                                                      │
│ - Categories                                         │
│   - বাংলাদেশ                                        │
│   - অর্থনীতি                                         │
│   - খেলা                                             │
│   - বিনোদন                                           │
│   - প্রযুক্তি                                         │
│   - আরও দেখুন →                                      │
│                                                      │
│ RIGHT (30%):                                         │
│ - Newsletter Form                                    │
│   [Email] [Subscribe]                                │
│                                                      │
│ - RSS Feed link                                      │
│ - Sitemap link                                       │
│                                                      │
├──────────────────────────────────────────────────────┤
│ [Footer Bottom]                                      │
│ © 2024 খবরের কাগজ। সর্বাধিকার সংরক্ষিত।           │
│ Design by Your Studio                                │
└──────────────────────────────────────────────────────┘
```

### Tasks:

- [ ] Design utility bar
- [ ] Design main header
- [ ] Create navigation with mega-menu
- [ ] Implement dropdown/mega-menu functionality
- [ ] Design footer with proper structure
- [ ] Implement newsletter subscription
- [ ] Add social media links
- [ ] Responsive header (mobile hamburger)
- [ ] Responsive footer
- [ ] Sticky header option

### Deliverables:

- ✓ Professional newspaper header
- ✓ Functional navigation with dropdowns
- ✓ Professional footer
- ✓ Mobile-responsive header/footer

---

## **PHASE F: SPECIAL PAGES** (Days 10-11)

**Objective:** Create special section pages

### Pages to Create:

**1. /sports**

```
[Header & Navigation]
═════════════════════════════════════════
খেলা
═════════════════════════════════════════

Featured Sports Story

Sports News Grid:
- [Score/Result] [Headline] [Category]
- [Image] [Headline]
- ...

Popular in Sports:
- News 1
- News 2
- News 3
```

**2. /video**

```
[Header & Navigation]
═════════════════════════════════════════
ভিডিও
═════════════════════════════════════════

Featured Video (Large player)

Video Grid:
- [Video Thumbnail] [Title] [Duration]
- [Video Thumbnail] [Title] [Duration]
- ...
```

**3. /photos**

```
[Header & Navigation]
═════════════════════════════════════════
ছবি
═════════════════════════════════════════

Featured Photo (Large)

Photo Grid:
- [Photo] [Caption]
- [Photo] [Caption]
- ...
```

**4. /trending** (or /most-read)

```
[Header & Navigation]
═════════════════════════════════════════
ট্রেন্ডিং / সবচেয়ে বেশি পঠিত
═════════════════════════════════════════

Trending Now:
1. [Number] [Headline] [Views] [Time]
2. [Number] [Headline] [Views] [Time]
3. ...

Trending by Category:
[Tab: সব] [Tab: বাংলাদেশ] [Tab: খেলা]
```

**5. /breaking-news**

```
[Header & Navigation]
═════════════════════════════════════════
🔴 ব্রেকিং নিউজ
═════════════════════════════════════════

Breaking news updates in chronological order:
[Latest Update]
[Previous Update]
...
```

**Information Pages:**

- /contact
- /careers
- /advertise
- /editorial-policy
- /correction-policy
- /cookie-policy

### Tasks:

- [ ] Create Sports page
- [ ] Create Video page (with video player)
- [ ] Create Photos page (with gallery)
- [ ] Create Trending page
- [ ] Create Breaking news page
- [ ] Create Contact page
- [ ] Create Careers page
- [ ] Create Advertise page
- [ ] Create policy pages

### Deliverables:

- ✓ 5+ special content pages
- ✓ 6+ information pages
- ✓ All functional and styled

---

## **PHASE G: MULTIPLE ADMIN - BACKEND** (Days 12-14)

**Objective:** Implement multiple admin system backend

### Database Changes:

- ✓ Users table already exists with roles
- [ ] Verify article ownership field (created_by)
- [ ] Add role_id relationship

### Backend Files to Modify/Create:

**1. backend/app/Models/User.php** (UPDATE)

```php
public function articles() {
    return $this->hasMany(Article::class, 'created_by');
}

public function createdArticles() {
    return $this->hasMany(Article::class, 'created_by');
}

public function isAdmin() {
    return $this->role_id === Role::ADMIN || $this->isSuper();
}

public function isSuper() {
    return $this->role_id === Role::SUPER_ADMIN;
}
```

**2. backend/app/Models/Article.php** (UPDATE)

```php
public function creator() {
    return $this->belongsTo(User::class, 'created_by');
}

public function editor() {
    return $this->belongsTo(User::class, 'updated_by');
}
```

**3. backend/app/Policies/ArticlePolicy.php** (UPDATE)

```php
public function update(User $user, Article $article): bool {
    // Super Admin can update any article
    if ($user->role_id === Role::SUPER_ADMIN) {
        return true;
    }

    // Admin can only update their own articles
    return $user->id === $article->created_by;
}

public function delete(User $user, Article $article): bool {
    if ($user->role_id === Role::SUPER_ADMIN) {
        return true;
    }

    return $user->id === $article->created_by;
}
```

**4. backend/app/Http/Controllers/ArticleController.php** (UPDATE)

```php
public function index(Request $request) {
    $user = $request->user();

    $query = Article::query();

    // If not Super Admin, only show their own articles
    if (!$user->isSuper()) {
        $query->where('created_by', $user->id);
    }

    return ArticleResource::collection(
        $query->paginate(20)
    );
}

public function update(Request $request, Article $article) {
    $this->authorize('update', $article);

    $validated = $request->validate([...]);

    $article->update([
        ...$validated,
        'updated_by' => $request->user()->id
    ]);

    return new ArticleResource($article);
}
```

**5. backend/app/Http/Controllers/UserController.php** (NEW/UPDATE)

```php
public function index(Request $request) {
    // Only Super Admin can list users
    $this->authorize('viewAny', User::class);

    return UserResource::collection(
        User::all()
    );
}

public function store(Request $request) {
    // Only Super Admin can create users
    $this->authorize('create', User::class);

    $validated = $request->validate([
        'name' => 'required|string',
        'email' => 'required|email|unique:users',
        'password' => 'required|min:8',
        'role_id' => 'required|exists:roles,id'
    ]);

    $user = User::create([
        ...$validated,
        'password' => Hash::make($validated['password'])
    ]);

    return new UserResource($user);
}

public function destroy(Request $request, User $user) {
    // Only Super Admin can delete users
    // Cannot delete self
    if ($user->id === $request->user()->id) {
        return response()->json(['error' => 'Cannot delete yourself'], 422);
    }

    $user->delete();

    return response()->json(['message' => 'User deleted']);
}
```

**6. backend/app/Policies/UserPolicy.php** (NEW)

```php
public function viewAny(User $user): bool {
    return $user->role_id === Role::SUPER_ADMIN;
}

public function create(User $user): bool {
    return $user->role_id === Role::SUPER_ADMIN;
}

public function update(User $user, User $target): bool {
    return $user->role_id === Role::SUPER_ADMIN;
}

public function delete(User $user, User $target): bool {
    return $user->role_id === Role::SUPER_ADMIN && $user->id !== $target->id;
}
```

**7. backend/routes/api.php** (UPDATE)

```php
Route::middleware('auth:sanctum')->group(function () {
    // Admin routes
    Route::apiResource('articles', ArticleController::class);

    // Super Admin routes
    Route::middleware('super-admin')->group(function () {
        Route::apiResource('users', UserController::class);
        Route::apiResource('categories', CategoryController::class);
        Route::apiResource('authors', AuthorController::class);
        Route::apiResource('tags', TagController::class);
    });
});
```

### API Endpoints to Create/Modify:

```
GET    /api/users              (Super Admin only)
POST   /api/users              (Super Admin only)
GET    /api/users/{id}         (Super Admin only)
PUT    /api/users/{id}         (Super Admin only)
DELETE /api/users/{id}         (Super Admin only)

GET    /api/articles           (Own articles for Admin, all for Super)
GET    /api/articles/{id}      (Own articles for Admin, all for Super)
POST   /api/articles           (Create, auto-assign created_by)
PUT    /api/articles/{id}      (Only own articles, or Super Admin)
DELETE /api/articles/{id}      (Only own articles, or Super Admin)
```

### Testing Scenarios:

```
Scenario 1: Admin A creates article
  - Admin A -> POST /api/articles -> created_by = Admin A's ID ✓

Scenario 2: Admin A tries to edit Admin B's article
  - Admin A -> PUT /api/articles/B's_article -> 403 Forbidden ✓

Scenario 3: Admin A tries to delete Admin B's article
  - Admin A -> DELETE /api/articles/B's_article -> 403 Forbidden ✓

Scenario 4: Admin A tries to edit their own article
  - Admin A -> PUT /api/articles/A's_article -> 200 OK ✓

Scenario 5: Super Admin edits Admin A's article
  - Super Admin -> PUT /api/articles/A's_article -> 200 OK ✓

Scenario 6: Super Admin lists all articles
  - Super Admin -> GET /api/articles -> returns all articles ✓

Scenario 7: Admin A lists articles
  - Admin A -> GET /api/articles -> returns only A's articles ✓

Scenario 8: Super Admin creates new Admin B
  - Super Admin -> POST /api/users -> creates user with admin role ✓

Scenario 9: Admin A tries to create another admin
  - Admin A -> POST /api/users -> 403 Forbidden ✓

Scenario 10: Super Admin deletes Admin B
  - Super Admin -> DELETE /api/users/B -> deletes admin B ✓
```

### Tasks:

- [ ] Update User model with relationships
- [ ] Update Article model with relationships
- [ ] Update ArticlePolicy (ownership check)
- [ ] Create UserPolicy (Super Admin only)
- [ ] Update ArticleController (ownership filtering)
- [ ] Create UserController (admin management)
- [ ] Add super-admin middleware
- [ ] Update API routes
- [ ] Test all scenarios
- [ ] Verify IDOR protection
- [ ] Test authorization enforcement

### Deliverables:

- ✓ Article ownership enforcement
- ✓ Admin can only edit own articles
- ✓ Super Admin can manage admins
- ✓ No IDOR vulnerabilities
- ✓ Authorization enforced server-side

---

## **PHASE H: MULTIPLE ADMIN - FRONTEND** (Days 15-16)

**Objective:** Create admin user management UI and per-admin dashboard

### Files to Create/Modify:

**1. frontend/app/admin/dashboard/page.tsx** (UPDATE)

```tsx
// Super Admin Dashboard
if (user.role === 'super-admin') {
  return (
    <SuperAdminDashboard user={user}>
      <StatCard label='Total Articles' count={totalArticles} />
      <StatCard label='Total Admins' count={totalAdmins} />
      <StatCard label='Total Users' count={totalUsers} />
      <LatestArticles limit={10} />
      <AdminsList />
    </SuperAdminDashboard>
  )
}

// Admin Dashboard
if (user.role === 'admin') {
  return (
    <AdminDashboard user={user}>
      <StatCard label='My Articles' count={myArticles} />
      <StatCard label='Published' count={published} />
      <StatCard label='Draft' count={drafts} />
      <MyLatestArticles limit={10} />
    </AdminDashboard>
  )
}
```

**2. frontend/app/admin/users/page.tsx** (NEW)

```tsx
// Super Admin only page - Manage admin users

<div className='admin-container'>
  <h1>Admin Accounts</h1>

  <Button onClick={() => setShowCreateModal(true)}>Add New Admin</Button>

  <AdminsTable admins={admins} onEdit={handleEdit} onDelete={handleDelete} />

  {showCreateModal && (
    <AdminCreateModal
      onSubmit={handleCreateAdmin}
      onClose={() => setShowCreateModal(false)}
    />
  )}
</div>
```

**3. frontend/components/admin/AdminsTable.tsx** (NEW)

```tsx
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Articles</th>
      <th>Created</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {admins.map(admin => (
      <tr key={admin.id}>
        <td>{admin.name}</td>
        <td>{admin.email}</td>
        <td>{admin.article_count}</td>
        <td>{formatDate(admin.created_at)}</td>
        <td>
          <Button onClick={() => onEdit(admin)}>Edit</Button>
          <Button onClick={() => onDelete(admin)} variant='danger'>
            Delete
          </Button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
```

**4. frontend/components/admin/AdminCreateModal.tsx** (NEW)

```tsx
<form onSubmit={onSubmit}>
  <input type='text' placeholder='Full Name' name='name' required />

  <input type='email' placeholder='Email Address' name='email' required />

  <input type='password' placeholder='Password' name='password' required />

  <select name='role_id' required>
    <option value=''>Select Role</option>
    <option value={2}>Admin</option>
  </select>

  <button type='submit'>Create Admin</button>
  <button type='button' onClick={onClose}>
    Cancel
  </button>
</form>
```

**5. frontend/app/admin/articles/page.tsx** (UPDATE)

```tsx
// Show only user's own articles if not Super Admin

const articles = await getAdminArticles()
// If user is Admin, API returns only their articles
// If user is Super Admin, API returns all articles

;<ArticlesTable
  articles={articles}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

**6. frontend/lib/admin-api.ts** (NEW/UPDATE)

```typescript
export class AdminApiService {
  // User Management
  async getUsers(): Promise<User[]> {
    return fetch(`${API_URL}/users`).then(r => r.json())
  }

  async createUser(data: CreateUserDto): Promise<User> {
    return fetch(`${API_URL}/users`, {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(r => r.json())
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<User> {
    return fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }).then(r => r.json())
  }

  async deleteUser(id: number): Promise<void> {
    return fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE'
    })
  }

  // Articles (per-admin)
  async getMyArticles(page = 1): Promise<PaginatedArticles> {
    return fetch(`${API_URL}/articles?page=${page}`).then(r => r.json())
  }

  async getAdminArticles(
    adminId: number,
    page = 1
  ): Promise<PaginatedArticles> {
    return fetch(`${API_URL}/users/${adminId}/articles?page=${page}`).then(r =>
      r.json()
    )
  }
}
```

### Sidebar Menu Update:

```
SUPER ADMIN SIDEBAR:
├── Dashboard
├── Articles
├── Admin Accounts (NEW)
├── Categories
├── Authors
├── Tags
├── Media
├── Advertisements
├── Homepage
├── Settings
├── Audit Logs
└── Logout

ADMIN SIDEBAR:
├── Dashboard
├── My Articles (only own)
├── Create Article
├── Media
├── Profile
└── Logout
```

### Tasks:

- [ ] Create Admin user management page
- [ ] Create Admin creation form
- [ ] Create Admins table/list
- [ ] Create Admin edit modal
- [ ] Create Admin delete confirmation
- [ ] Update dashboard for Super Admin vs Admin
- [ ] Update articles page to show only own articles (for Admin)
- [ ] Update sidebar based on role
- [ ] Implement admin list pagination
- [ ] Add authorization checks on frontend (UI level)
- [ ] Show appropriate sidebar items per role

### Deliverables:

- ✓ Admin user management UI
- ✓ Admin creation/edit/delete forms
- ✓ Per-admin dashboard
- ✓ Role-based sidebar
- ✓ Per-admin article filtering

---

## **PHASE I: MOBILE RESPONSIVE DESIGN** (Days 17-18)

**Objective:** Optimize all pages for mobile (320px - 1440px)

### Breakpoints to Test:

- 320px (mobile small)
- 375px (mobile medium)
- 768px (tablet)
- 1024px (tablet large)
- 1280px (desktop)
- 1440px+ (desktop large)

### Mobile-Specific Components:

**Mobile Header** (320-768px):

```
[Hamburger] [Logo] [Search Icon]
```

**Mobile Navigation Menu:**

```
Slide-out menu from left
├── সর্বশেষ
├── বাংলাদেশ
├── অর্থনীতি
├── খেলা
├── বিনোদন
├── ...
└── ✕ Close
```

**Mobile Homepage**:

```
[Header]
[Breaking ticker - Horizontal scroll]
[Featured story - Full width]
[Section: বাংলাদেশ]
  - Story 1
  - Story 2
[Advertisement]
[Section: খেলা]
  - Story 1
  - Story 2
[Footer]
```

**Mobile Category Page**:

```
[Header]
[Featured story - Full width]
[Articles - Single column]
  - Story 1
  - Story 2
  - Story 3
[Pagination]
[Footer]
```

**Mobile Article Page**:

```
[Header]
[Breadcrumb - Truncated]
[Category]
[Headline]
[Author | Date]
[Featured Image]
[Article Body]
[Tags]
[Social Sharing - Icon row]
[Related - Single column]
[Footer]
```

### CSS Media Query Structure:

```css
/* Mobile first approach */
@media (min-width: 768px) {
  /* Tablet styles */
}

@media (min-width: 1024px) {
  /* Desktop styles */
}

@media (min-width: 1440px) {
  /* Large desktop styles */
}
```

### Tasks:

- [ ] Test all pages at 320px
- [ ] Test all pages at 375px
- [ ] Test all pages at 768px
- [ ] Test all pages at 1024px
- [ ] Test all pages at 1280px
- [ ] Create mobile navigation (hamburger menu)
- [ ] Optimize images for mobile
- [ ] Test touch interactions
- [ ] Test form inputs on mobile
- [ ] Verify no horizontal scroll
- [ ] Optimize font sizes for mobile
- [ ] Test navigation at mobile size
- [ ] Test admin panel mobile (if needed)
- [ ] Performance on mobile (no unnecessary renders)

### Deliverables:

- ✓ All pages responsive
- ✓ Mobile-optimized navigation
- ✓ No horizontal scroll
- ✓ Touch-friendly interactions
- ✓ Optimized typography for all sizes

---

## **PHASE J: INTEGRATION & TESTING** (Days 19-20)

**Objective:** Ensure everything works end-to-end

### Testing Checklist:

**Frontend Build:**

- [ ] npm run build succeeds
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] All imports correct
- [ ] All routes work
- [ ] All components render

**Backend:**

- [ ] composer install succeeds
- [ ] php artisan serve runs
- [ ] All API endpoints respond
- [ ] Database migrations work
- [ ] All models load correctly

**Integration Tests:**

- [ ] Login works
- [ ] Logout works
- [ ] Super Admin dashboard loads
- [ ] Admin dashboard loads
- [ ] Article CRUD works
- [ ] Category pages load
- [ ] Search works
- [ ] Archive works
- [ ] Author pages load
- [ ] Tag pages load
- [ ] Info pages load

**Authorization Tests:**

- [ ] Super Admin can create articles
- [ ] Admin can create articles
- [ ] Admin can only edit own articles
- [ ] Admin cannot edit other's articles (test directly)
- [ ] Super Admin can edit any article
- [ ] Super Admin can create admin accounts
- [ ] Admin cannot create admin accounts
- [ ] Super Admin can delete admin accounts
- [ ] IDOR test: try to access article not belonging to user

**Mobile Tests:**

- [ ] Homepage responsive
- [ ] Navigation works on mobile
- [ ] Articles readable on mobile
- [ ] Forms usable on mobile
- [ ] Images load correctly
- [ ] No horizontal scroll

**Performance Tests:**

- [ ] Homepage loads < 3s
- [ ] Article loads < 2s
- [ ] Images lazy load
- [ ] No memory leaks
- [ ] Smooth scrolling

**SEO Tests:**

- [ ] Meta tags present
- [ ] Sitemap works
- [ ] RSS feed works
- [ ] Canonical URLs correct

### Tasks:

- [ ] Run frontend build
- [ ] Run backend serve
- [ ] Test all login scenarios
- [ ] Test all API endpoints
- [ ] Test authorization scenarios
- [ ] Test mobile responsiveness
- [ ] Test performance
- [ ] Test SEO
- [ ] Check console for errors
- [ ] Fix all issues
- [ ] Document any remaining bugs

### Deliverables:

- ✓ Build succeeds
- ✓ No errors/warnings
- ✓ All features tested
- ✓ Authorization verified
- ✓ Mobile responsive verified
- ✓ Performance acceptable

---

## **PHASE K: FINAL BUILD & DEPLOY** (Days 21-23)

**Objective:** Prepare for deployment and make final commits

### Tasks:

- [ ] Create comprehensive git commits
- [ ] Write commit messages
- [ ] Update README
- [ ] Update ROADMAP
- [ ] Document changes
- [ ] Create deployment checklist
- [ ] Test production build
- [ ] Verify environment variables
- [ ] Create deployment guide
- [ ] Push to GitHub

### Git Commits:

```
commit 1: Design System
- Add CSS variables
- Add typography system
- Add color palette

commit 2: Homepage Redesign
- Newspaper-style layout
- Daily Bangladesh reference
- Hero section
- Breaking news ticker

commit 3: Category/Article Pages
- Category page redesign
- Article detail redesign
- Typography optimization
- Related articles

commit 4: Additional Pages
- Latest page
- Search page
- Archive page
- Author pages

commit 5: Navigation & Footer
- Header redesign
- Navigation with dropdowns
- Footer redesign

commit 6: Special Pages
- Sports page
- Video page
- Photos page
- Trending page
- Breaking news page
- Info pages

commit 7: Multiple Admin Backend
- Article ownership enforcement
- Admin user management
- Authorization policies
- API endpoints

commit 8: Multiple Admin Frontend
- Admin management UI
- Per-admin dashboard
- User list/management
- Role-based sidebar

commit 9: Mobile Responsive
- Mobile layouts
- Hamburger menu
- Responsive components
- Mobile optimization

commit 10: Integration & Testing
- Bug fixes
- Performance optimization
- SEO verification
- Final testing

commit 11: Documentation
- README updates
- Deployment guide
- API documentation
- Architecture decisions
```

### Deliverables:

- ✓ Production-ready code
- ✓ Clean git history
- ✓ Complete documentation
- ✓ Deployment guide
- ✓ Ready for production

---

# 📊 SUMMARY TABLE

| Phase | Days  | Objective                 | Status     |
| ----- | ----- | ------------------------- | ---------- |
| A     | 1-2   | Design System             | ⏳ Pending |
| B     | 3-4   | Homepage Redesign         | ⏳ Pending |
| C     | 5-6   | Category/Article Redesign | ⏳ Pending |
| D     | 7-8   | Additional Pages          | ⏳ Pending |
| E     | 9     | Navigation/Footer         | ⏳ Pending |
| F     | 10-11 | Special Pages             | ⏳ Pending |
| G     | 12-14 | Multiple Admin Backend    | ⏳ Pending |
| H     | 15-16 | Multiple Admin Frontend   | ⏳ Pending |
| I     | 17-18 | Mobile Responsive         | ⏳ Pending |
| J     | 19-20 | Integration & Testing     | ⏳ Pending |
| K     | 21-23 | Build & Deploy            | ⏳ Pending |

---

# ✅ READY TO START

Awaiting your approval to start **Phase A: Design System Setup**.

When ready, reply with: **"START PHASE A"**
PHASE A - PART 1: ✅ COMPLETE & VERIFIED
✅ Design system setup
✅ CSS variables working
✅ Bengali fonts integrated
✅ Backend API working
✅ Database seeded
✅ No errors
✅ Frontend connecting to backend
