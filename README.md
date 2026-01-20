<!-- @format -->

# Beebeeh Web Platform

A modern, responsive technician dashboard web application built with Next.js 16, TypeScript, and Tailwind CSS. This platform enables technicians to efficiently manage job assignments, track service requests, view notifications, and maintain detailed job records.

## 🚀 Features

### Dashboard & Navigation

- **Collapsible Sidebar Navigation** - Intuitive sidebar with Home, Today's Jobs, All Jobs, Notifications, and Settings
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Active Route Highlighting** - Clear visual indication of current page

### Job Management

- **All Jobs Overview** - Comprehensive table view of all job assignments with pagination
- **Today's Jobs** - Quick access to current day's scheduled tasks
- **Job Details Pages** - In-depth view of individual jobs with:
  - Header summary with job ID, type, and scheduling information
  - Client information with contact details and location
  - Product details including model, serial number, and service history
  - Frequently used parts tracking
  - Customizable checklists
  - Image upload functionality
  - Customer signature capture
  - Action buttons (Cancel Job, Start Job)

### Advanced Features

- **Dynamic Routing** - Navigate seamlessly between job listings and detailed views
- **Status Management** - Visual status indicators (Pending, In Progress, Complete)
- **Search & Filter** - Quick search and filtering capabilities in the navbar
- **Notifications System** - Real-time notifications with type-based icons and colors
- **Profile Management** - User profile editing and password reset modals

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** Shadcn UI (Radix UI)
- **Icons:** Lucide React, React Icons
- **Font:** Zilla Slab (Google Fonts)

## 📦 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Rahul-Mallik-CSE/beebeeh-web-platform.git
cd beebeeh-web-platform
```

2. **Install dependencies:**

```bash
npm install
```

3. **Run the development server:**

```bash
npm run dev
```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
beebeeh-web-platform/
├── src/
│   ├── app/
│   │   ├── globals.css              # Global styles
│   │   ├── layout.tsx               # Root layout with sidebar
│   │   ├── page.tsx                 # Dashboard home page
│   │   ├── all-jobs/
│   │   │   ├── page.tsx             # All jobs listing
│   │   │   └── [job-id]/            # Dynamic job details route
│   │   ├── today's-jobs/
│   │   │   └── page.tsx             # Today's jobs listing
│   │   ├── notifications/
│   │   │   └── page.tsx             # Notifications page
│   │   └── settings/
│   │       └── page.tsx             # Settings & profile page
│   ├── components/
│   │   ├── CommonComponents/
│   │   │   ├── DashboardSidebar.tsx # Main navigation sidebar
│   │   │   ├── NavBar.tsx           # Top navbar with search
│   │   │   ├── CustomTable.tsx      # Reusable table component
│   │   │   └── LogoutModal.tsx      # Logout confirmation
│   │   ├── JobDetailsComponents/
│   │   │   ├── HeaderSummaryCard.tsx
│   │   │   ├── ClientInfoSection.tsx
│   │   │   ├── ProductDetailsSection.tsx
│   │   │   ├── FrequentlyUsedParts.tsx
│   │   │   ├── ChecklistSection.tsx
│   │   │   ├── ImageUploadSection.tsx
│   │   │   └── CustomerSignatureSection.tsx
│   │   └── ui/                      # Shadcn UI components
│   ├── hooks/
│   │   └── use-mobile.ts            # Mobile detection hook
│   └── lib/
│       └── utils.ts                 # Utility functions
├── public/                          # Static assets
├── next.config.ts                   # Next.js configuration
├── tailwind.config.ts              # Tailwind configuration
└── tsconfig.json                    # TypeScript configuration
```

## 🎨 Key Components

### CustomTable

Reusable table component with:

- Generic type support for flexible data structures
- Integrated Shadcn pagination
- Status badge rendering with color coding
- Action buttons (view, edit, delete)
- Responsive design

### DashboardSidebar

Navigation component featuring:

- Array-mapped navigation items
- Active route detection
- Collapsible functionality
- Logout modal integration

### JobDetailsPage

Comprehensive job view with:

- 2/3 + 1/3 responsive grid layout
- Multiple information sections
- Action buttons for job management
- Dynamic data rendering based on job ID

## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

## 📱 Responsive Design

The platform is fully responsive with breakpoints optimized for:

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## 🎯 Design System

### Typography

- **Primary Font:** Zilla Slab (400, 500, 700 weights)
- **Headings:** text-lg to text-2xl, font-semibold
- **Labels:** text-base, font-medium, text-gray-800
- **Values:** text-sm, text-gray-500

### Color Palette

- **Primary Action:** Red-800
- **Secondary Action:** Orange-50/Orange-600
- **Status Colors:**
  - Pending: Yellow-50/Yellow-600
  - In Progress: Blue-50/Blue-600
  - Complete: Green-50/Green-600

### Layout Patterns

- Horizontal flex layouts for information display
- Border separators (border-b border-gray-100)
- Consistent spacing (py-2, p-4, p-6)
- Rounded corners (rounded-2xl)

## 🔐 Authentication

Currently implements:

- Logout modal with confirmation
- Profile management interface
- Password reset functionality

_(Note: Backend authentication integration pending)_

## 📊 Data Management

Sample data structure includes:

- **Jobs:** ID, type, status, client info, scheduling, product details
- **Notifications:** Type-based categorization with dynamic icons
- **Table Columns:** Configurable column definitions with custom rendering

## 🚧 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time data synchronization
- [ ] Advanced filtering and sorting
- [ ] Report generation
- [ ] Mobile app version
- [ ] Multi-language support
- [ ] Dark mode theme

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👥 Authors

- **Rahul Mallik** - [GitHub](https://github.com/Rahul-Mallik-CSE)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Shadcn UI](https://ui.shadcn.com/) - UI component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide Icons](https://lucide.dev/) - Icon library

---

**Built with ❤️ for efficient technician job management**
