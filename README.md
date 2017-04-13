### HTML5-Non-Linear-Player

A random/non-linear browser based video player built in HTML5
by Ben Moren for MCAD Media2 Classes

#### Usage:
Load up as many MP4 clips into the 'data' folder as you would like and change the 'num' in the dat.gui settings to reflect the amount of video clips present.

Files must be named with an `integer + '.mp4'` for example: `1.mp4`, `2.mp4`, `3.mp4`, etc. Files must start at `1.mp4` and can go as high as you like for example '9234294.mp4'

#### modes
+ linear: Plays through the clips in order
+ random: uses Javascript's Math.Random() function to choose a random clip
+ non-repeating-rand: this mode will never play the same clip back to back, this eliminates visible random runs.


