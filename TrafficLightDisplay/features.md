# Traffic Light Simulator - Feature Updates

## New Features Added:

### 1. Improved Checkbox Layout

- All checkboxes are now arranged in a 2x2 grid for better organization
- Enable checkboxes now appear horizontally next to input boxes for each light

### 2. Randomized Timing

- New "Randomize times" checkbox added to settings panel
- When enabled, shows additional min/max time inputs
- Each light cycle will have a random duration between min and max values
- Provides unpredictable timing for more realistic simulations

### 3. Fullscreen Mode

- New "Fullscreen active light" checkbox added
- When enabled, only the currently active light is displayed
- The active light takes up the entire screen area
- Provides better visibility of active light

### 4. Footer Links

- Added links to GitHub repository and developer website
- Appears at the bottom of the settings panel

### Implementation Details:

- All new features use React hooks for state management
- Components are modular and reusable
- Styling uses CSS variables for consistent theming
- Responsive design works on all screen sizes

## Usage:

1. Click the gear icon to open the settings panel
2. Adjust standard settings (light duration, enable/disable lights)
3. Try the new randomize times and fullscreen options
4. Click Apply to save changes or Reset to return to defaults

## Technical Notes:

- CSS uses flexbox for layout
- React functional components with hooks for state management
- TypeScript for type safety
- Optimized rendering to prevent unnecessary updates
