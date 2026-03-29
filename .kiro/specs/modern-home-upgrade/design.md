# Design Document: Modern Home Upgrade

## Overview

Thiết kế nâng cấp trang chủ nhà hàng ModernEpicureanHome với hệ thống navigation nâng cao, hiển thị danh mục món ăn và khả năng lọc/điều hướng món ăn, đồng thời duy trì phong cách bento grid layout cao cấp hiện tại.

### Design Goals

- **Enhanced Navigation**: Tích hợp smooth scrolling navigation với active section highlighting
- **Category Display**: Hiển thị danh mục món ăn một cách trực quan và hấp dẫn
- **Dish Filtering**: Cung cấp khả năng lọc và điều hướng món ăn theo danh mục
- **Layout Preservation**: Duy trì bento grid layout và aesthetic hiện tại
- **Performance**: Đảm bảo trải nghiệm mượt mà và responsive

## Architecture

### Component Structure

```
ModernEpicureanHome
├── Header (enhanced with navigation)
├── NavigationSystem (new)
├── HeroEditorial
├── BentoGrid (enhanced with category display)
├── FeaturedDishes (enhanced with filtering)
├── ReservationBlock
├── Testimonial
└── EpicureanFooter
```

### State Management

Sử dụng React hooks và Redux store hiện tại:
- **Local State**: Navigation active section, filter states, scroll position
- **Redux Store**: Category data, product data (đã có sẵn)
- **Context**: Scroll context cho navigation system

## Components and Interfaces

### 1. NavigationSystem Component

**Purpose**: Cung cấp navigation links với smooth scrolling và active section highlighting

**Props Interface**:
```typescript
interface NavigationSystemProps {
  sections: Array<{
    id: string;
    label: string;
    offset?: number;
  }>;
  className?: string;
}
```

**Key Features**:
- Smooth scrolling đến sections
- Active section highlighting dựa trên scroll position
- Responsive design (desktop/mobile)
- Integration với Header component

### 2. Enhanced BentoGrid Component

**Current State**: Hiển thị signature dish và danh mục món ăn
**Enhancement**: Cải thiện category display với visual representations

**Props Interface**:
```typescript
interface BentoGridProps {
  onCategorySelect?: (categoryId: string) => void;
  selectedCategory?: string;
}
```

**Key Features**:
- Maintain existing bento grid layout
- Enhanced category cards với images và descriptions
- Category selection callback
- Responsive grid system

### 3. Enhanced FeaturedDishes Component

**Current State**: Hiển thị featured dishes với pagination
**Enhancement**: Thêm filtering theo category

**Props Interface**:
```typescript
interface FeaturedDishesProps {
  selectedCategory?: string;
  onFilterChange?: (category: string | null) => void;
}
```

**Key Features**:
- Category-based filtering
- Maintain existing pagination
- Smooth transitions khi filter
- Integration với BentoGrid category selection

### 4. ScrollContext

**Purpose**: Quản lý scroll state cho navigation system

```typescript
interface ScrollContextType {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  registerSection: (sectionId: string, element: HTMLElement) => void;
}
```

## Data Models

### Section Model
```typescript
interface Section {
  id: string;
  label: string;
  element?: HTMLElement;
  offset?: number;
}
```

### Enhanced Category Model
```typescript
interface CategoryDisplay extends Category {
  displayImage?: string;
  shortDescription?: string;
  dishCount?: number;
}
```

### Filter State Model
```typescript
interface FilterState {
  selectedCategory: string | null;
  searchTerm?: string;
  sortBy?: 'name' | 'price' | 'popularity';
}
```
## Implementation Strategy

### Phase 1: Navigation System
1. Tạo ScrollContext và ScrollProvider
2. Implement NavigationSystem component
3. Enhance Header với navigation integration
4. Add section registration system

### Phase 2: Category Enhancement
1. Enhance BentoGrid với improved category display
2. Add category selection functionality
3. Implement category-to-dishes connection

### Phase 3: Dish Filtering
1. Enhance FeaturedDishes với filtering capability
2. Add filter controls và UI
3. Implement smooth transitions
4. Connect với category selection

### Phase 4: Integration & Polish
1. Connect all components
2. Add animations và transitions
3. Performance optimization
4. Responsive testing

### Technical Considerations

**Scroll Performance**:
- Sử dụng `IntersectionObserver` cho active section detection
- Throttle scroll events
- Optimize re-renders với `useMemo` và `useCallback`

**State Synchronization**:
- Category selection trong BentoGrid trigger filter trong FeaturedDishes
- Navigation state sync với scroll position
- URL state management cho deep linking (optional)

**Animation Strategy**:
- Sử dụng Framer Motion (đã có sẵn) cho smooth transitions
- CSS transforms cho performance
- Staggered animations cho category cards

## Integration Points

### With Existing Components

**Header Component**:
- Add navigation menu integration
- Maintain existing responsive behavior
- Preserve user menu và authentication features

**BentoGrid Component**:
- Enhance category display section
- Add click handlers cho category selection
- Maintain signature dish display

**FeaturedDishes Component**:
- Add filtering logic
- Maintain pagination system
- Preserve existing product card design

### With Redux Store

**Category Data**:
```javascript
// Existing: state.product.allCategory
// Usage: Navigation, BentoGrid, FeaturedDishes filtering
```

**Product Data**:
```javascript
// Existing: Fetched in FeaturedDishes
// Enhancement: Add category-based filtering
```

### With Routing

**Current Routes**: Maintain existing routing structure
**Enhancement**: Optional query parameters cho filter state
```
/?category=appetizers&section=menu
```

## Responsive Design Strategy

### Breakpoints
- **Mobile** (< 640px): Single column, simplified navigation
- **Tablet** (640px - 1024px): Adapted grid, collapsible navigation
- **Desktop** (> 1024px): Full feature set, sticky navigation

### Navigation Adaptations
- **Desktop**: Horizontal navigation bar
- **Tablet**: Collapsible navigation menu
- **Mobile**: Bottom navigation hoặc hamburger menu integration

### Grid Adaptations
- Maintain existing responsive grid system
- Ensure category cards scale appropriately
- Preserve bento grid ratios across devices

## Performance Considerations

### Optimization Strategies

**Component Level**:
- Memoize expensive calculations
- Lazy load images trong category cards
- Virtual scrolling cho large product lists (future enhancement)

**State Management**:
- Minimize unnecessary re-renders
- Batch state updates
- Debounce filter operations

**Asset Loading**:
- Progressive image loading
- Preload critical category images
- Optimize image sizes cho different viewports

### Metrics to Monitor
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Time to Interactive (TTI)

## Accessibility Considerations

### Navigation
- Keyboard navigation support
- ARIA labels cho navigation items
- Focus management khi scrolling to sections

### Filtering
- Screen reader announcements cho filter changes
- Keyboard accessible filter controls
- Clear filter state communication

### Visual Design
- Maintain color contrast ratios
- Ensure touch targets meet minimum size requirements
- Provide visual focus indicators