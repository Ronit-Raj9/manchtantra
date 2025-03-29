# Manchtantra - Dramatics Club Website

A modern, cinematic website for the Manchtantra dramatics club built with React and Tailwind CSS.

## Features

- Responsive design that works on all devices
- Modern, cinematic UI with smooth animations
- Interactive sections for events, gallery, and contact
- Performance optimized with lazy loading and smooth scrolling
- Beautiful dark theme with gold accents

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/manchtantra.git
cd manchtantra
```

2. Install dependencies:
```bash
npm install
```

## Development

To start the development server:

```bash
npm start
```

The site will be available at `http://localhost:3000`

## Building for Production

To create a production build:

```bash
npm run build
```

The build files will be available in the `build` directory.

## Project Structure

```
src/
  ├── components/         # React components
  │   ├── Navbar.tsx
  │   ├── EventsSection.tsx
  │   ├── GallerySection.tsx
  │   ├── ContactSection.tsx
  │   └── Footer.tsx
  ├── App.tsx            # Main application component
  ├── index.tsx          # Application entry point
  └── index.css          # Global styles and Tailwind imports
```

## Required Media Files

Place the following media files in the `public` directory:

- `hero-background.mp4` - Hero section background video
- `event1.jpg` to `event4.jpg` - Event images
- `gallery1.jpg` to `gallery6.jpg` - Gallery images

## Customization

### Colors

The main colors can be customized in `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: '#FFD700', // Gold color
      secondary: '#1A1A1A', // Dark background
    }
  }
}
```

### Fonts

The site uses the following Google Fonts:
- Playfair Display (serif)
- Poppins (sans-serif)

These can be customized in `index.css` and `tailwind.config.js`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [GSAP](https://greensock.com/gsap/)
- [Hero Icons](https://heroicons.com/)
- [React Icons](https://react-icons.github.io/react-icons/) 