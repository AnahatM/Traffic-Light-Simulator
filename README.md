# Traffic Light Display Simulator

A modern, interactive traffic light simulator built with React. Easily adjust light durations, enable/disable lights, switch orientation, and more—all in a beautiful UI.

Used for a robotics project with color detection to simulate an intersection light.

Source code also includes a simple plain HTML CSS JS version.

## Features

- **Fully interactive traffic light**: Red, yellow, and green lights cycle automatically.
- **Customizable durations**: Set the time for each light.
- **Enable/disable lights**: Show or hide any color.
- **Hide disabled lights**: Optionally remove disabled lights from the display.
- **Orientation**: Switch between vertical and horizontal layouts.
- **Responsive design**: Works on desktop and mobile.
- **Settings panel**: Collapsible, with reset and apply buttons.

## Usage

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

- `src/App.tsx` — Main app logic and state
- `src/components/TrafficLight.tsx` — Traffic light display
- `src/components/Light.tsx` — Individual light component
- `src/components/SettingsPanel.tsx` — Settings UI
- `src/App.css` — Styles

## Customization

- Edit `defaultSettings` in `App.tsx` to change initial values.

## License

MIT
