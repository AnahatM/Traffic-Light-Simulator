# Traffic Light Display Simulator

A modern, interactive traffic light simulator built with React. Easily adjust light durations, enable/disable lights, switch orientation, and more—all in a beautiful UI.
This web app can also function on mobile device screens, useful for having a portable and small traffic-light color display solution.

[![Deployed App](https://img.shields.io/badge/Deployed_App-Try_it_now-darkgreen)](https://traffic-light-simulator-six.vercel.app/)
[![Anahat's Website](https://img.shields.io/badge/Developer_Website-AnahatMudgal.com-blue)](https://AnahatMudgal.com)

**Used for a robotics project with color detection to simulate an intersection light.**

| ![Traffic Light Display Simulator Screenshot](public/Traffic-Light-Display-Screenshot.png) | ![Traffic Light Display Circular Layout Screenshot](public/Traffic-Light-Circular-Screenshot.png) |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |

## Features

_Source code also includes a simple plain HTML, CSS, and JS version with limited functionality._

- **Fully interactive traffic light**: Red, yellow, and green lights cycle automatically.
- **Customizable durations**: Set the time for each light.
- **Enable/disable lights**: Show or hide any color.
- **Hide disabled lights**: Optionally remove disabled lights from the display.
- **Orientation**: Switch between vertical and horizontal layouts.
- **Display layout**: Choose between rectangular and circular traffic light arrangements.
- **Randomized timing**: Enable random durations for each light cycle, with adjustable min/max values.
- **Fullscreen mode**: Option to show only the currently active light, filling the screen for maximum visibility.
- **Responsive design**: Works on desktop and mobile.panel.
- **Additional customization**: Toggle light shading, enable/disable clicking lights, and more advanced settings.
- **Reorder colors**: Drag and drop or use arrows to reorder the sequence of lights.
- **Add/delete custom colors**: Add new custom lights with any color, and remove them as needed.
- **Loop modes**: Choose between Cycle (repeat), Bounce (back & forth), or Random (random order, no repeats until all shown).

## Usage

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```

## Technologies Used

![React](https://img.shields.io/badge/-React-05122A?style=flat-square&logo=React&color=2a2e34)
![TypeScript](https://img.shields.io/badge/-TypeScript-05122A?style=flat-square&logo=TypeScript&color=2a2e34)
![HTML5](https://img.shields.io/badge/-HTML5-05122A?style=flat-square&logo=HTML5&color=2a2e34)
![CSS3](https://img.shields.io/badge/-CSS3-05122A?style=flat-square&logo=CSS3&color=2a2e34)
![Vite](https://img.shields.io/badge/-Vite-05122A?style=flat-square&logo=Vite&color=2a2e34)

## Project Structure

- `src/App.tsx` — Main app logic and default settings
- `src/components/TrafficLight.tsx` — Traffic light display
- `src/components/Light.tsx` — Individual light component
- `src/components/SettingsPanel.tsx` — Settings UI (now split into subcomponents)

## Customization

- Edit `defaultSettings` in `App.tsx` to change initial values.
