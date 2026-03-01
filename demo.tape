# VHS Tape — go-touch-grass demo recording
# Install VHS: https://github.com/charmbracelet/vhs
# Usage: vhs demo.tape
# Output: demo.gif (referenced in README)

Output demo.gif

Require node

Set Shell "bash"
Set FontSize 16
Set Width 900
Set Height 600
Set Theme "Catppuccin Mocha"
Set Padding 20
Set Framerate 30
Set TypingSpeed 60ms
Set CursorBlink false

# --- Scene 1: The setup ---
Sleep 500ms
Type "# It's 2am. You've been coding for 14 hours."
Enter
Sleep 1500ms
Type "# Your commit streak is legendary. Your posture is not."
Enter
Sleep 2000ms
Type "# Time for an intervention."
Enter
Sleep 1500ms

# --- Scene 2: Run it ---
Type "npx go-touch-grass"
Sleep 500ms
Enter
Sleep 8000ms

# --- Scene 3: The aftermath ---
Sleep 2000ms
Type "# ...maybe I should go outside"
Enter
Sleep 3000ms
